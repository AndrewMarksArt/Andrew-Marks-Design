"""Build the hero gaze atlas from a robot scanning video (timeline model).

The frontend (src/components/site/HeroGaze.tsx) scrubs the video's own
timeline toward whichever frame best matches the cursor, so the atlas keeps
frames in TEMPORAL order — every rendered transition is between adjacent
video frames and motion stays coherent by construction.

Pipeline (run whenever the source video is re-generated):
  1. Extract every frame; key out the white background via border
     flood-fill (only background CONNECTED to the frame edge is removed, so
     interior white highlights survive; dust islands are dropped by size).
  2. Stabilize the body: warp each frame (translate + scale, anchored
     bottom-center) so the torso matches the median — no body jumps.
  3. Subsample the timeline (every 2nd frame) and measure each kept frame's
     gaze by eye-glow centroid (HSV threshold on the orange glow) plus glow
     height (squint/wide metric).
  4. Compose an 8x8 atlas in timeline order with 8px edge-extruded cell
     padding (fractional-pixel background scaling bleeds into the SAME
     frame, never a neighbor).
  5. Write the atlas webp + heroGazeMap.json ([x, y, glowH] normalized, per
     timeline index) consumed by HeroGaze for target selection.

Usage:  python scripts/build-gaze-atlas.py "design/assets/robot video/Robot Scanning Motion.mp4"
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

COLS = ROWS = 8
CELL, INSET = 512, 8
SUBSAMPLE = 2
OUT_ATLAS = os.path.join("public", "hero", "robot-atlas-v3.webp")
OUT_MAP = os.path.join("src", "components", "site", "heroGazeMap.json")


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
    fg = (flood != 2).astype(np.uint8) * 255
    n, labels, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
    if n > 1:
        big = max(range(1, n), key=lambda i: stats[i][4])
        keep = np.zeros_like(fg)
        for i in range(1, n):
            if i == big or stats[i][4] > 0.01 * h * w:
                keep[labels == i] = 255
        fg = keep
    return cv2.GaussianBlur(fg, (3, 3), 0)


def gaze_of(bgra):
    hsv = cv2.cvtColor(bgra[:, :, :3], cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (5, 80, 140), (45, 255, 255))
    mask = cv2.bitwise_and(mask, bgra[:, :, 3])
    n, _, stats, cents = cv2.connectedComponentsWithStats(mask, 8)
    comps = sorted(
        [(stats[j], cents[j]) for j in range(1, n) if stats[j][4] > 300],
        key=lambda c: -c[0][4],
    )[:2]
    if len(comps) < 2:
        return None
    return (
        float((comps[0][1][0] + comps[1][1][0]) / 2),
        float((comps[0][1][1] + comps[1][1][1]) / 2),
        float((comps[0][0][3] + comps[1][0][3]) / 2),
    )


def main(video):
    cap = cv2.VideoCapture(video)
    raw = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        raw.append(f)
    cap.release()
    print(f"extracted {len(raw)} frames")

    rgba = [np.dstack([f, key_frame(f)]) for f in raw]

    # stabilize on the torso band
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
        M = np.float32([[sc, 0, ref_cx - sc * cx], [0, sc, H - sc * H]])
        stab.append(
            cv2.warpAffine(
                f, M, (W, H), flags=cv2.INTER_LINEAR,
                borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0),
            )
        )
    print(f"stabilized to torso cx {ref_cx:.1f}, width {ref_w:.1f}")

    frames = stab[::SUBSAMPLE]
    if len(frames) > COLS * ROWS:
        raise SystemExit(
            f"{len(frames)} frames won't fit {COLS}x{ROWS}; raise SUBSAMPLE"
        )

    gmap = []
    for f in frames:
        g = gaze_of(f)
        gmap.append(g if g else gmap[-1])
    xs = np.array([g[0] for g in gmap])
    ys = np.array([g[1] for g in gmap])
    hs = np.array([g[2] for g in gmap])
    nx = (xs - xs.min()) / (xs.max() - xs.min())
    ny = (ys - ys.min()) / (ys.max() - ys.min())
    nh = (hs - hs.min()) / (hs.max() - hs.min())

    content = CELL - 2 * INSET
    atlas = np.zeros((CELL * ROWS, CELL * COLS, 4), np.uint8)

    def put(fi, cell_i):
        r, c = cell_i // COLS, cell_i % COLS
        img = cv2.resize(frames[fi], (content, content), interpolation=cv2.INTER_AREA)
        cell = np.zeros((CELL, CELL, 4), np.uint8)
        cell[INSET : INSET + content, INSET : INSET + content] = img
        cell[:INSET, INSET : INSET + content] = img[0:1, :]
        cell[INSET + content :, INSET : INSET + content] = img[-1:, :]
        cell[:, :INSET] = cell[:, INSET : INSET + 1]
        cell[:, INSET + content :] = cell[:, INSET + content - 1 : INSET + content]
        atlas[r * CELL : (r + 1) * CELL, c * CELL : (c + 1) * CELL] = cell

    for i in range(len(frames)):
        put(i, i)
    for i in range(len(frames), COLS * ROWS):
        put(len(frames) - 1, i)

    out = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    out.save(OUT_ATLAS, "WEBP", quality=80, method=6)
    print(f"atlas {out.size} -> {OUT_ATLAS} ({os.path.getsize(OUT_ATLAS)//1024} KB)")

    data = [
        [round(float(a), 4), round(float(b), 4), round(float(c), 4)]
        for a, b, c in zip(nx, ny, nh)
    ]
    json.dump(data, open(OUT_MAP, "w"))
    print(
        f"map -> {OUT_MAP} ({len(data)} frames; "
        f"squintiest {int(np.argmin(nh))}, widest {int(np.argmax(nh))})"
    )


if __name__ == "__main__":
    main(sys.argv[1])
