"""Extract + measure one gaze video: keyed frames, torso metrics, eye-gaze track.

Per-video stage of the multi-video atlas pipeline (see build-gaze-atlas.py).
Writes to <outdir>: f000..fNNN.png (keyed RGBA, unwarped), metrics.json
{"n", "torso": [[cx, w] ...], "gaze": [[x, y, glowH] | null ...]}, and
strip.png (every 8th frame on white, labeled — for visual review).

Stabilization warping is NOT done here: all videos must share one global
torso reference, so the atlas builder warps at assembly time using these
measurements.

Usage: python scripts/measure-gaze-video.py <video.mp4> <outdir>
"""

import json
import os
import sys

import cv2
import numpy as np


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
    return [
        float((comps[0][1][0] + comps[1][1][0]) / 2),
        float((comps[0][1][1] + comps[1][1][1]) / 2),
        float((comps[0][0][3] + comps[1][0][3]) / 2),
    ]


def main(video, outdir):
    os.makedirs(outdir, exist_ok=True)
    cap = cv2.VideoCapture(video)
    raw = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        raw.append(f)
    cap.release()
    print(f"{os.path.basename(video)}: {len(raw)} frames", flush=True)

    H, W = raw[0].shape[:2]
    band_y0 = int(H * 0.854)
    torso, gaze = [], []
    strip_cells = []
    for i, f in enumerate(raw):
        rgba = np.dstack([f, key_frame(f)])
        cv2.imwrite(os.path.join(outdir, f"f{i:03d}.png"), rgba)
        ys_, xs_ = np.nonzero(rgba[band_y0:, :, 3] > 128)
        if len(xs_) < 100:
            torso.append(None)
        else:
            torso.append(
                [float(xs_.mean()),
                 float(np.percentile(xs_, 95) - np.percentile(xs_, 5))]
            )
        gaze.append(gaze_of(rgba))
        if i % 8 == 0:
            a = rgba[:, :, 3:4].astype(np.float32) / 255
            rgb = (rgba[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)
            cell = cv2.resize(rgb, (220, 220), interpolation=cv2.INTER_AREA)
            cv2.putText(cell, str(i), (6, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (20, 20, 20), 2)
            strip_cells.append(cell)
        if i % 20 == 19:
            print(f"  {i + 1}/{len(raw)}", flush=True)

    json.dump(
        {"n": len(raw), "torso": torso, "gaze": gaze},
        open(os.path.join(outdir, "metrics.json"), "w"),
    )
    per_row = 7
    rows = [
        np.hstack(strip_cells[r : r + per_row] + [np.full((220, 220, 3), 255, np.uint8)] * (per_row - len(strip_cells[r : r + per_row])))
        for r in range(0, len(strip_cells), per_row)
    ]
    cv2.imwrite(os.path.join(outdir, "strip.png"), np.vstack(rows))

    ok_gaze = sum(1 for g in gaze if g)
    print(f"done: {ok_gaze}/{len(raw)} frames with measurable gaze -> {outdir}", flush=True)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
