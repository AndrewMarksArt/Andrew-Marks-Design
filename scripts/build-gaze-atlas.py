"""Build the hero gaze atlas as a direct 9x9 gaze GRID (v8).

The sheet IS the map: cell (row, col) holds the pose shown when the cursor
sits at screen position (col/8, row/8) — center cell = neutral center pose,
top-left cell = looking up-left, bottom-right = looking down-right. The
frontend (src/components/site/HeroGaze.tsx) converts the cursor straight to
a sheet position with light smoothing — no graph, no pathfinding, no travel
model. This is the placeholder site's proven direct-lookup mechanism,
extended to two dimensions.

Pose pool: every clean (blink-free) frame of the five direction clips in
design/assets/robot video/directions/ (extracted + measured by
scripts/measure-gaze-video.py into per-clip scratch dirs). All clips were
generated from one shared reference still, so they share the character and
the center pose. Frames are torso-stabilized to a global reference; each
frame's eye-gaze is piecewise-normalized around the center pose (the
measured gaze range is asymmetric), and each grid cell takes the pool frame
whose gaze is nearest that cell's cursor position. Where the clips have no
coverage (the star of sweeps doesn't reach every off-axis angle), the
nearest spoke pose repeats — accepted by design.

Output: public/hero/robot-atlas-v8.webp (versioned filename — a deployed
atlas must never be overwritten in place, browser caches serve stale
cells), src/components/site/heroGazeMap.json {cols, rows, rest, cells},
and design/assets/robot video/directions/atlas-contact.png (the labeled
sheet for review — position = direction).

Usage:  python scripts/build-gaze-atlas.py <scratch-directions-dir>
"""

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

COLS = ROWS = 9
CELL, INSET = 512, 8
H = W = 960
OUT_ATLAS = os.path.join("public", "hero", "robot-atlas-v8.webp")
OUT_MAP = os.path.join("src", "components", "site", "heroGazeMap.json")
REVIEW_DIR = os.path.join("design", "assets", "robot video", "directions")

# clean (blink-free, measurable-gaze) frame ranges per clip
CLIPS = {
    "lr":   [(0, 61)],
    "ud":   [(8, 38)],
    "tlbr": [(0, 25), (31, 39), (45, 76)],
    "ur":   [(8, 13), (17, 33), (37, 46), (51, 68)],
    "dl":   [(0, 15), (20, 36), (40, 56), (61, 83)],
}
CENTER = ("dl", 0)  # the reference pose the ur/dl clips start from


def main(scratch):
    metrics = {s: json.load(open(os.path.join(scratch, s, "metrics.json")))
               for s in CLIPS}

    # global torso reference across all clips (shared character)
    all_t = [t for m in metrics.values() for t in m["torso"] if t]
    ref_cx = float(np.median([t[0] for t in all_t]))
    ref_w = float(np.median([t[1] for t in all_t]))
    print(f"global torso ref: cx {ref_cx:.1f}, width {ref_w:.1f}")

    def warp_params(slug, fi):
        cx, w = metrics[slug]["torso"][fi]
        sc = ref_w / w
        return sc, ref_cx - sc * cx, H - sc * H

    # pool: (slug, frame) -> warped gaze
    pool = []
    for slug, ranges in CLIPS.items():
        for a, b in ranges:
            for fi in range(a, b + 1):
                g = metrics[slug]["gaze"][fi]
                if not g:
                    continue
                sc, tx, ty = warp_params(slug, fi)
                pool.append((slug, fi, sc * g[0] + tx, sc * g[1] + ty))
    print(f"pose pool: {len(pool)} clean frames")

    # piecewise normalization anchored at the center pose
    cs, cf = CENTER
    sc, tx, ty = warp_params(cs, cf)
    g0 = metrics[cs]["gaze"][cf]
    cx0, cy0 = sc * g0[0] + tx, sc * g0[1] + ty
    xs = [p[2] for p in pool]
    ys = [p[3] for p in pool]
    xmin, xmax, ymin, ymax = min(xs), max(xs), min(ys), max(ys)
    print(f"gaze bbox X {xmin:.0f}..{xmax:.0f} (center {cx0:.0f}), "
          f"Y {ymin:.0f}..{ymax:.0f} (center {cy0:.0f})")

    def norm(v, lo, mid, hi):
        return 0.5 * (v - lo) / (mid - lo) if v <= mid else \
            0.5 + 0.5 * (v - mid) / (hi - mid)

    npool = [(slug, fi,
              norm(x, xmin, cx0, xmax), norm(y, ymin, cy0, ymax))
             for slug, fi, x, y in pool]

    # cell (r, c) <- pool frame nearest to cursor (c/8, r/8);
    # the center cell is pinned to the canonical reference pose
    cells = []
    for r in range(ROWS):
        for c in range(COLS):
            if (r, c) == (ROWS // 2, COLS // 2):
                cells.append(CENTER)
                continue
            sx, sy = c / (COLS - 1), r / (ROWS - 1)
            best = min(npool,
                       key=lambda p: (p[2] - sx) ** 2 + (p[3] - sy) ** 2)
            cells.append((best[0], best[1]))
    uniq = len(set(cells))
    print(f"grid assigned: {uniq} unique poses across {COLS * ROWS} cells")

    def load_stab(slug, fi):
        f = cv2.imread(os.path.join(scratch, slug, f"f{fi:03d}.png"),
                       cv2.IMREAD_UNCHANGED)
        sc, tx, ty = warp_params(slug, fi)
        M = np.float32([[sc, 0, tx], [0, sc, ty]])
        return cv2.warpAffine(f, M, (W, H), flags=cv2.INTER_LINEAR,
                              borderMode=cv2.BORDER_CONSTANT,
                              borderValue=(0, 0, 0, 0))

    stab_cache = {}

    def stab(nf):
        if nf not in stab_cache:
            stab_cache[nf] = load_stab(*nf)
        return stab_cache[nf]

    # atlas with 8px edge-extruded cells (fractional-pixel background
    # scaling bleeds into the SAME frame, never a neighbor)
    content = CELL - 2 * INSET
    atlas = np.zeros((CELL * ROWS, CELL * COLS, 4), np.uint8)
    for i, nf in enumerate(cells):
        r, c = i // COLS, i % COLS
        img = cv2.resize(stab(nf), (content, content),
                         interpolation=cv2.INTER_AREA)
        cell = np.zeros((CELL, CELL, 4), np.uint8)
        cell[INSET:INSET + content, INSET:INSET + content] = img
        cell[:INSET, INSET:INSET + content] = img[0:1, :]
        cell[INSET + content:, INSET:INSET + content] = img[-1:, :]
        cell[:, :INSET] = cell[:, INSET:INSET + 1]
        cell[:, INSET + content:] = cell[:, INSET + content - 1:INSET + content]
        atlas[r * CELL:(r + 1) * CELL, c * CELL:(c + 1) * CELL] = cell

    out = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    out.save(OUT_ATLAS, "WEBP", quality=80, method=6)
    print(f"atlas {out.size} -> {OUT_ATLAS} "
          f"({os.path.getsize(OUT_ATLAS) // 1024} KB)")

    rest = (ROWS // 2) * COLS + COLS // 2
    json.dump(
        {"cols": COLS, "rows": ROWS, "rest": rest,
         "cells": [[s, f] for s, f in cells]},
        open(OUT_MAP, "w"), separators=(",", ":"),
    )
    print(f"map -> {OUT_MAP} (rest cell {rest})")

    # labeled review sheet: the atlas IS the gaze map (position = direction)
    csz = 200
    sheet = np.full((ROWS * csz, COLS * csz, 3), 255, np.uint8)
    for i, nf in enumerate(cells):
        st = stab(nf)
        a = st[:, :, 3:4].astype(np.float32) / 255
        rgb = (st[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)
        img = cv2.resize(rgb, (csz, csz), interpolation=cv2.INTER_AREA)
        cv2.putText(img, f"{i} {nf[0]}f{nf[1]}", (5, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (20, 20, 20), 1)
        cv2.rectangle(img, (0, 0), (csz - 1, csz - 1), (210, 210, 210), 1)
        r, c = i // COLS, i % COLS
        sheet[r * csz:(r + 1) * csz, c * csz:(c + 1) * csz] = img
    cv2.imwrite(os.path.join(REVIEW_DIR, "atlas-contact.png"), sheet)
    print("review sheet -> atlas-contact.png")


if __name__ == "__main__":
    main(sys.argv[1])
