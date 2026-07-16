"""HD pass over the shipped live2 gaze strip (Andrew's rule: take the
working sheet, go frame by frame, upscale each position, recreate the
sheet — frames, order, and motion untouched).

Per cell (81 cells, 512px, from public/hero/robot-atlas-live2.webp):
  composite on white -> Real-ESRGAN realesr-animevideov3 4x (2048) ->
  re-key transparency at 4x (white flood-fill, edges cut cleanest) ->
  premultiplied INTER_AREA downscale to 1024 -> reassemble.

Output: public/hero/robot-atlas-live2-hd.webp (9216x9216, 1024px cells —
new versioned filename, a deployed atlas is never overwritten in place),
plus review exports in design/assets/robot video/:
live2-hd-contact.png (the 9x9 sheet for Andrew's approval) and
live2-hd-before-after.png (rest cell at display size).

Expectation setting: live2's frames were 256px originals ESRGAN'd once
already (July 14), so this pass cleans and sharpens (the "inked" finish)
rather than recovering detail — paired with the DPR-aware canvas buffer
in HeroGaze it is what "a bit clearer" can honestly mean. Size/perf
consciously deferred by Andrew ("look best, worry about size and
performance later") — the ~340MB decoded sheet may re-surface the
mid-film upload hitch from the 2026-07 perf audit; the gating fixes for
that live in git stash@{0} when wanted.

Requires tools/realesrgan-ncnn-vulkan.exe (official v0.2.5.0 portable).
Usage:  python scripts/upscale-live2-atlas.py   (run from the repo root)
"""

import os
import shutil
import subprocess
import sys
from importlib import util

import cv2
import numpy as np
from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHEET_IN = os.path.join(REPO, "public", "hero", "robot-atlas-live2.webp")
SHEET_OUT = os.path.join(REPO, "public", "hero", "robot-atlas-live2-hd.webp")
REVIEW_DIR = os.path.join(REPO, "design", "assets", "robot video")
WORK = os.path.join(REPO, ".atlas-hd-work")
GRID, CELL_IN, CELL_OUT, SCALE = 9, 512, 1024, 4
MODEL = "realesr-animevideov3"
TOOL = os.path.join(REPO, "tools", "realesrgan-ncnn-vulkan.exe")

spec = util.spec_from_file_location(
    "mgv", os.path.join(REPO, "scripts", "measure-gaze-video.py"))
mgv = util.module_from_spec(spec)
spec.loader.exec_module(mgv)


def main():
    if not os.path.exists(TOOL):
        sys.exit(f"missing {TOOL}")
    sheet = cv2.imread(SHEET_IN, cv2.IMREAD_UNCHANGED)
    assert sheet is not None and sheet.shape[0] == GRID * CELL_IN, SHEET_IN

    in_dir, up_dir = os.path.join(WORK, "in"), os.path.join(WORK, "up")
    shutil.rmtree(WORK, ignore_errors=True)
    os.makedirs(in_dir)
    os.makedirs(up_dir)

    for i in range(GRID * GRID):
        r, c = i // GRID, i % GRID
        cell = sheet[r * CELL_IN:(r + 1) * CELL_IN, c * CELL_IN:(c + 1) * CELL_IN]
        a = cell[:, :, 3:4].astype(np.float32) / 255
        rgb = (cell[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)
        cv2.imwrite(os.path.join(in_dir, f"c{i:02d}.png"), rgb)

    print(f"running {MODEL} x{SCALE} on 81 cells...")
    subprocess.run([TOOL, "-i", in_dir, "-o", up_dir, "-n", MODEL, "-s", str(SCALE)],
                   check=True)

    def restyle(i):
        up = cv2.imread(os.path.join(up_dir, f"c{i:02d}.png"))
        assert up is not None and up.shape[0] == CELL_IN * SCALE, f"cell {i}"
        alpha = mgv.key_frame(up)
        af = alpha.astype(np.float32) / 255
        pm = up.astype(np.float32) * af[..., None]
        pm_s = cv2.resize(pm, (CELL_OUT, CELL_OUT), interpolation=cv2.INTER_AREA)
        a_s = cv2.resize(af, (CELL_OUT, CELL_OUT), interpolation=cv2.INTER_AREA)
        rgb = np.clip(pm_s / np.maximum(a_s[..., None], 1e-4), 0, 255)
        return np.dstack([rgb.astype(np.uint8), (a_s * 255).astype(np.uint8)])

    new = np.zeros((CELL_OUT * GRID, CELL_OUT * GRID, 4), np.uint8)
    for i in range(GRID * GRID):
        r, c = i // GRID, i % GRID
        new[r * CELL_OUT:(r + 1) * CELL_OUT, c * CELL_OUT:(c + 1) * CELL_OUT] = restyle(i)
        if i % 20 == 19:
            print(f"  restyled {i + 1}/81")

    Image.fromarray(cv2.cvtColor(new, cv2.COLOR_BGRA2RGBA)).save(
        SHEET_OUT, "WEBP", quality=80, method=6)
    print(f"-> {SHEET_OUT} ({os.path.getsize(SHEET_OUT) // 1024} KB)")

    def on_white(rgba):
        a = rgba[:, :, 3:4].astype(np.float32) / 255
        return (rgba[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)

    csz = 160
    contact = np.full((GRID * csz, GRID * csz, 3), 255, np.uint8)
    for i in range(GRID * GRID):
        r, c = i // GRID, i % GRID
        cell = new[r * CELL_OUT:(r + 1) * CELL_OUT, c * CELL_OUT:(c + 1) * CELL_OUT]
        t = cv2.resize(on_white(cell), (csz, csz), interpolation=cv2.INTER_AREA)
        cv2.putText(t, str(i), (4, 16), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (30, 30, 30), 1)
        contact[r * csz:(r + 1) * csz, c * csz:(c + 1) * csz] = t
    cv2.imwrite(os.path.join(REVIEW_DIR, "live2-hd-contact.png"), contact)

    mid = 40
    r, c = mid // GRID, mid % GRID
    before = on_white(sheet[r * CELL_IN:(r + 1) * CELL_IN, c * CELL_IN:(c + 1) * CELL_IN])
    after = on_white(new[r * CELL_OUT:(r + 1) * CELL_OUT, c * CELL_OUT:(c + 1) * CELL_OUT])
    cmp2 = np.hstack([cv2.resize(before, (660, 660), interpolation=cv2.INTER_CUBIC),
                      np.full((660, 8, 3), 200, np.uint8),
                      cv2.resize(after, (660, 660), interpolation=cv2.INTER_AREA)])
    cv2.imwrite(os.path.join(REVIEW_DIR, "live2-hd-before-after.png"), cmp2)
    print("review: live2-hd-contact.png + live2-hd-before-after.png")
    shutil.rmtree(WORK, ignore_errors=True)


if __name__ == "__main__":
    main()
