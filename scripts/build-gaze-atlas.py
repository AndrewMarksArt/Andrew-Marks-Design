"""Build the hero gaze atlas from the robot scanning video (line model, v4).

The frontend (src/components/site/HeroGaze.tsx) maps cursor X DIRECTLY to a
position on one pose-continuous "line" of frames, then scrubs toward it at
most 2 cells per tick. For that to look right the line must satisfy two
properties this script constructs by hand-picked frame ranges:

  1. Adjacent cells are temporally adjacent-or-near in the source video
     (max 3-frame gap), so any +/-2-cell scrub renders as coherent motion.
  2. The line is monotonic in (virtual) gaze X, so cursor position maps to
     gaze direction with no timeline "tours" through unrelated poses.

The source video's scan path is non-monotonic, so the line is assembled from
its two clean monotonic sweeps plus a compressed crossing:

  run B   frames 23-56   gaze X 325 -> 540 (left -> center-right), 34 cells
  bridge  frames 59-104 every 3rd, + 106, 108 — 18 flourish cells whose
          virtual X is squeezed into the ~1% sliver between the runs, so a
          cursor crossing plays a quick pose-coherent head-flick and (almost)
          no cursor position rests on a bridge frame
  run C   frames 109-120 gaze X 545 -> 721 (center-right -> hard right),
          12 cells; picks up exactly where run B's real gaze left off

64 cells total — a full 8x8 atlas. The squint (frame 109, the narrowest
eye-glow) lands at run C's first cell and doubles as the proximity
expression: HeroGaze targets it when the cursor hovers the robot.

Shared pipeline stages (same as ever): white-key via border flood-fill (only
edge-connected background dies; interior highlights survive), torso
stabilization (translate+scale anchored bottom-center to the median torso
band), and 8px edge-extruded atlas cells (fractional-pixel background
scaling bleeds into the SAME frame, never a neighbor).

Output: public/hero/robot-atlas-v3.webp plus
src/components/site/heroGazeMap.json {vx: normalized virtual gaze-X per
cell (strictly increasing), squint: cell index, n}.

NOTE: the frame ranges above were measured against THIS video
(design/assets/robot video/Robot Scanning Motion.mp4). If the video is
re-generated, re-measure the monotonic runs (print each frame's eye-glow
centroid X) before trusting RUN_B/BRIDGE/RUN_C.

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
OUT_ATLAS = os.path.join("public", "hero", "robot-atlas-v3.webp")
OUT_MAP = os.path.join("src", "components", "site", "heroGazeMap.json")

RUN_B = list(range(23, 57))
BRIDGE = list(range(59, 105, 3)) + [106, 108]
RUN_C = list(range(109, 121))
SQUINT_FRAME = 109


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
    return float((comps[0][1][0] + comps[1][1][0]) / 2)


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

    line = RUN_B + BRIDGE + RUN_C
    n_cells = len(line)
    if n_cells > COLS * ROWS:
        raise SystemExit(f"{n_cells} cells won't fit {COLS}x{ROWS}")
    print(
        f"line: {n_cells} cells (B {len(RUN_B)} + bridge {len(BRIDGE)} "
        f"+ C {len(RUN_C)}), max video gap "
        f"{max(line[i + 1] - line[i] for i in range(n_cells - 1))}"
    )

    xs = []
    for fi in line:
        g = gaze_of(stab[fi])
        xs.append(g if g is not None else xs[-1])

    # virtual X: runs keep real gaze X; bridge interpolates across the sliver
    # between them, then strict monotonicity is enforced
    vx = xs.copy()
    b_end = len(RUN_B)
    c_start = b_end + len(BRIDGE)
    for k in range(len(BRIDGE)):
        vx[b_end + k] = xs[b_end - 1] + (xs[c_start] - xs[b_end - 1]) * (k + 1) / (
            len(BRIDGE) + 1
        )
    for i in range(1, n_cells):
        if vx[i] <= vx[i - 1]:
            vx[i] = vx[i - 1] + 0.01
    vmin, vmax = vx[0], vx[-1]
    nvx = [round((v - vmin) / (vmax - vmin), 4) for v in vx]

    content = CELL - 2 * INSET
    atlas = np.zeros((CELL * ROWS, CELL * COLS, 4), np.uint8)

    def put(fi, cell_i):
        r, c = cell_i // COLS, cell_i % COLS
        img = cv2.resize(stab[fi], (content, content), interpolation=cv2.INTER_AREA)
        cell = np.zeros((CELL, CELL, 4), np.uint8)
        cell[INSET : INSET + content, INSET : INSET + content] = img
        cell[:INSET, INSET : INSET + content] = img[0:1, :]
        cell[INSET + content :, INSET : INSET + content] = img[-1:, :]
        cell[:, :INSET] = cell[:, INSET : INSET + 1]
        cell[:, INSET + content :] = cell[:, INSET + content - 1 : INSET + content]
        atlas[r * CELL : (r + 1) * CELL, c * CELL : (c + 1) * CELL] = cell

    for i, fi in enumerate(line):
        put(fi, i)
    for i in range(n_cells, COLS * ROWS):
        put(line[-1], i)

    out = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    out.save(OUT_ATLAS, "WEBP", quality=80, method=6)
    print(f"atlas {out.size} -> {OUT_ATLAS} ({os.path.getsize(OUT_ATLAS)//1024} KB)")

    json.dump(
        {"vx": nvx, "squint": line.index(SQUINT_FRAME), "n": n_cells},
        open(OUT_MAP, "w"),
    )
    print(f"map -> {OUT_MAP} ({n_cells} cells, squint at {line.index(SQUINT_FRAME)})")


if __name__ == "__main__":
    main(sys.argv[1])
