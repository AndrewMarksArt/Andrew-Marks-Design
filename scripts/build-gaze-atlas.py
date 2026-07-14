"""Build the hero gaze atlas from a robot scanning video.

Pipeline (run whenever the source video is re-generated):
  1. Extract every frame from the video.
  2. Key out the white background via border flood-fill (only background
     CONNECTED to the frame edge is removed, so interior white highlights
     survive; stray dust islands in the white are dropped by size).
  2b. Stabilize the body: measure the torso band's centroid + width per
     frame and warp (translate + scale, anchored bottom-center) to the
     median — kills the body jumps between grid cells.
  3. Auto-map each frame's gaze by the eye-glow centroid (the eyes glow
     orange — HSV threshold, two largest components) and measure the glow
     height as a squint/wide metric.
  4. Fill a COLS x GAZE_ROWS grid with the nearest frame per cell in
     normalized gaze space, plus an expression row: 3 squints (lowest glow)
     and 3 wides (highest glow), spread across X.
  5. Compose the atlas with 8px edge-extruded cell padding (bleed from
     fractional-pixel background scaling samples the frame's own replicated
     edges instead of the neighboring cell) and write a webp with alpha.

Usage:  python scripts/build-gaze-atlas.py "design/assets/robot video/Robot Scanning Motion.mp4"
Output: public/hero/robot-atlas-v2.webp (consumed by src/components/site/HeroGaze.tsx)
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

COLS, GAZE_ROWS = 9, 4
CELL = 512
INSET = 8  # edge-extrusion padding per cell side
OUT = os.path.join("public", "hero", "robot-atlas-v2.webp")


def key_frame(bgr):
    h, w = bgr.shape[:2]
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    white = (gray > 216).astype(np.uint8)
    flood = white.copy()
    ffm = np.zeros((h + 2, w + 2), np.uint8)
    seeds = (
        [(x, 0) for x in range(0, w, 8)]
        + [(x, h - 1) for x in range(0, w, 8)]
        + [(0, y) for y in range(0, h, 8)]
        + [(w - 1, y) for y in range(0, h, 8)]
    )
    for sx, sy in seeds:
        if flood[sy, sx] == 1:
            cv2.floodFill(flood, ffm, (sx, sy), 2)
    fg = ((flood != 2)).astype(np.uint8) * 255
    n, labels, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
    if n > 1:
        big = max(range(1, n), key=lambda i: stats[i][4])
        keep = np.zeros_like(fg)
        for i in range(1, n):
            if i == big or stats[i][4] > 0.01 * h * w:
                keep[labels == i] = 255
        fg = keep
    return cv2.GaussianBlur(fg, (3, 3), 0)


def gaze_of(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (5, 80, 140), (45, 255, 255))
    n, _, stats, cents = cv2.connectedComponentsWithStats(mask, 8)
    comps = sorted(
        [(stats[j], cents[j]) for j in range(1, n) if stats[j][4] > 300],
        key=lambda c: -c[0][4],
    )[:2]
    if len(comps) < 2:
        return None
    cx = (comps[0][1][0] + comps[1][1][0]) / 2
    cy = (comps[0][1][1] + comps[1][1][1]) / 2
    hgt = (comps[0][0][3] + comps[1][0][3]) / 2
    return float(cx), float(cy), float(hgt)


def main(video):
    cap = cv2.VideoCapture(video)
    frames = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        frames.append(f)
    cap.release()
    print(f"extracted {len(frames)} frames")

    rgba = []
    for f in frames:
        rgba.append(np.dstack([f, key_frame(f)]))

    # --- stabilize the body: torso-band centroid + width -> warp to median
    H, W = rgba[0].shape[:2]
    band_y0 = int(H * 0.854)
    torso = []
    for f in rgba:
        ys_, xs_ = np.nonzero(f[band_y0:, :, 3] > 128)
        torso.append(
            (float(xs_.mean()), float(np.percentile(xs_, 95) - np.percentile(xs_, 5)))
        )
    ref_cx = float(np.median([t[0] for t in torso]))
    ref_w = float(np.median([t[1] for t in torso]))
    stab = []
    for f, (cx, w) in zip(rgba, torso):
        sc = ref_w / w
        # scale + translate, anchored bottom-center so the bust stays flush
        M = np.float32([[sc, 0, ref_cx - sc * cx], [0, sc, H - sc * H]])
        stab.append(
            cv2.warpAffine(
                f, M, (W, H), flags=cv2.INTER_LINEAR,
                borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0),
            )
        )
    rgba = stab
    print(f"stabilized to torso cx {ref_cx:.1f}, width {ref_w:.1f}")

    # --- gaze-map the STABILIZED frames
    mapped = []
    for i, f in enumerate(rgba):
        g = gaze_of(f[:, :, :3])
        if g:
            mapped.append((i, *g))
    print(f"gaze-mapped {len(mapped)}/{len(frames)}")

    idxs = [m[0] for m in mapped]
    xs = np.array([m[1] for m in mapped])
    ys = np.array([m[2] for m in mapped])
    hs = np.array([m[3] for m in mapped])
    nx = (xs - xs.min()) / (xs.max() - xs.min())
    ny = (ys - ys.min()) / (ys.max() - ys.min())

    grid = []
    for row in range(GAZE_ROWS):
        for col in range(COLS):
            tx, ty = col / (COLS - 1), row / (GAZE_ROWS - 1)
            grid.append(idxs[int(np.argmin((nx - tx) ** 2 + (ny - ty) ** 2))])

    order_h = np.argsort(hs)
    squints = sorted([idxs[i] for i in order_h[:3]])
    wide_pool = sorted(
        [(idxs[i], xs[i]) for i in order_h[-max(3, len(order_h) // 4):]],
        key=lambda t: t[1],
    )
    wides = [wide_pool[0][0], wide_pool[len(wide_pool) // 2][0], wide_pool[-1][0]]
    expr = squints + wides + [grid[COLS + COLS // 2]] * (COLS - 6)
    print("grid:", grid)
    print("expressions:", expr)

    atlas = np.zeros((CELL * (GAZE_ROWS + 1), CELL * COLS, 4), np.uint8)
    content_px = CELL - 2 * INSET

    def put(fi, r, c):
        content = cv2.resize(
            rgba[fi], (content_px, content_px), interpolation=cv2.INTER_AREA
        )
        cell = np.zeros((CELL, CELL, 4), np.uint8)
        cell[INSET : INSET + content_px, INSET : INSET + content_px] = content
        # edge extrusion: replicate content borders outward so fractional-pixel
        # background scaling bleeds into the SAME frame, never the neighbor
        cell[:INSET, INSET : INSET + content_px] = content[0:1, :]
        cell[INSET + content_px :, INSET : INSET + content_px] = content[-1:, :]
        cell[:, :INSET] = cell[:, INSET : INSET + 1]
        cell[:, INSET + content_px :] = cell[:, INSET + content_px - 1 : INSET + content_px]
        atlas[r * CELL : (r + 1) * CELL, c * CELL : (c + 1) * CELL] = cell

    for row in range(GAZE_ROWS):
        for col in range(COLS):
            put(grid[row * COLS + col], row, col)
    for col, fi in enumerate(expr):
        put(fi, GAZE_ROWS, col)

    img = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    img.save(OUT, "WEBP", quality=80, method=6)
    print(f"atlas {img.size} -> {OUT} ({os.path.getsize(OUT)//1024} KB)")


if __name__ == "__main__":
    main(sys.argv[1])
