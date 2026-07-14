"""Build the hero gaze atlas from the robot scanning video (pose-graph, v5).

The video is a 2D gaze TOUR (center -> left -> up-left -> across the top ->
center [blink] -> up-right -> back-left slightly down [blink] -> bottom-right
[squint]), so the frontend (src/components/site/HeroGaze.tsx) tracks the
cursor in BOTH axes: it targets the node whose measured gaze is nearest the
cursor and travels there along a graph of verified-smooth transitions.

Graph construction:
  - Nodes: every 2nd video frame (61 of 121), timeline order, in an 8x8
    atlas. Chain edges (i, i+1) are 2 video frames apart — smooth.
  - Shortcut edges: hand-verified pairs where the tour crosses itself at
    near-identical poses (96px grayscale RMS diff ~13-27 vs adjacent-pair
    median 12.3 / p90 28; every pair also passed side-by-side visual
    inspection). They cut worst-case travel from ~500ms to ~250ms and — the
    critical one, f2<->f72 — merge the video's two duplicate center poses so
    cursor jitter at screen center can't trigger 32-hop timeline tours.
  - Dijkstra (chain weight 1, shortcut weight 2) -> 61x61 next-hop matrix.

Targeting metadata (from the v5 design review):
  - targetable: nodes the runtime argmin may SELECT. Excludes blink frames
    (f58-62, f88), squint/blur swing frames (f106-112), motion-blurred
    transitional frames (f10, f30, f54), and the duplicate first center
    cluster (f0-4; f64-74 is the canonical center — it owns the shortcut
    hub). Excluded nodes remain in the graph as pass-through animation
    (that's what makes blinks appear naturally in transit) but the robot
    never PARKS on one. NOTE: glow height alone can't drive this — looking
    down naturally shortens the glow (f90-120 all measure h 76-96), so the
    lists are explicit, not thresholded.
  - rest: f68 (center-level, eyes open) — initial paint, reduced-motion
    static frame, scrolled-away pose, and the padding cells' content.
  - squint: f108 (narrowest glow) — reachable only via the proximity
    override, never via argmin.

Shared pipeline stages (unchanged): white-key via border flood-fill (only
edge-connected background dies; interior highlights survive), torso
stabilization (translate+scale anchored bottom-center to the median torso
band), 8px edge-extruded atlas cells (fractional-pixel background scaling
bleeds into the SAME frame, never a neighbor).

Output: public/hero/robot-atlas-v5.webp (NEW name — the old v3 name is
cache-poisoned in deployed browsers) plus src/components/site/
heroGazeMap.json {nodes, targetable, next, rest, squint, n}.

NOTE: frame numbers here were measured against THIS video (design/assets/
robot video/Robot Scanning Motion.mp4). If the video is regenerated,
re-measure the segments (print each frame's eye-glow centroid) before
trusting SHORTCUTS / EXCLUDE_TARGET / REST_FRAME / SQUINT_FRAME.

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
OUT_ATLAS = os.path.join("public", "hero", "robot-atlas-v5.webp")
OUT_MAP = os.path.join("src", "components", "site", "heroGazeMap.json")

# Shortcut edges as (video frame, video frame) — all visually verified.
SHORTCUTS = [
    (2, 72),    # center start <-> center mid (near-identical) — MANDATORY
    (0, 76),    # center start <-> right-swing start
    (68, 90),   # center mid <-> back-left start (reads as a blink)
    (80, 88),   # right-swing peak <-> return start (reads as a blink)
    (94, 106),  # back-left hold <-> bottom-right swing start
    (16, 24),   # left hold <-> up-left rise
    (42, 50),   # within the top hold
]
CHAIN_W, SHORTCUT_W = 1, 2

# Frames the argmin must never SELECT (still traversed): blinks, squints,
# motion-blurred swings, and the duplicate first center cluster.
EXCLUDE_TARGET = {0, 2, 4, 10, 30, 54, 58, 60, 62, 88, 106, 108, 110, 112}
REST_FRAME = 68
SQUINT_FRAME = 108


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
    )


def dijkstra_next_hop(n_nodes, edges):
    """Per-source Dijkstra over the tiny graph -> next-hop matrix."""
    import heapq

    adj = {i: [] for i in range(n_nodes)}
    for a, b, w in edges:
        adj[a].append((b, w))
        adj[b].append((a, w))
    nxt = [[0] * n_nodes for _ in range(n_nodes)]
    for src in range(n_nodes):
        dist = [float("inf")] * n_nodes
        prev = [-1] * n_nodes
        dist[src] = 0
        pq = [(0, src)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
            for v, w in adj[u]:
                if d + w < dist[v]:
                    dist[v] = d + w
                    prev[v] = u
                    heapq.heappush(pq, (d + w, v))
        # walk each destination back to src; first hop out of src -> dest
        for dst in range(n_nodes):
            if dst == src:
                nxt[src][dst] = src  # diagonal MUST be identity
                continue
            node = dst
            while prev[node] != src:
                node = prev[node]
            nxt[src][dst] = node
    return nxt, adj


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

    node_frames = list(range(0, len(raw), SUBSAMPLE))
    n_nodes = len(node_frames)
    if n_nodes > COLS * ROWS:
        raise SystemExit(f"{n_nodes} nodes won't fit {COLS}x{ROWS}")
    frame_to_node = {f: i for i, f in enumerate(node_frames)}

    # gaze per node (carry-forward only fills blink gaps for traversal math;
    # those nodes are excluded from targeting anyway)
    gz = []
    for fi in node_frames:
        g = gaze_of(stab[fi])
        gz.append(g if g else gz[-1])
    xs = np.array([g[0] for g in gz])
    ys = np.array([g[1] for g in gz])
    nx = (xs - xs.min()) / (xs.max() - xs.min())
    ny = (ys - ys.min()) / (ys.max() - ys.min())

    # graph -> next-hop
    edges = [(i, i + 1, CHAIN_W) for i in range(n_nodes - 1)]
    for fa, fb in SHORTCUTS:
        if fa not in frame_to_node or fb not in frame_to_node:
            raise SystemExit(f"shortcut frame f{fa}/f{fb} not in node set")
        edges.append((frame_to_node[fa], frame_to_node[fb], SHORTCUT_W))
    nxt, adj = dijkstra_next_hop(n_nodes, edges)

    # sanity: diagonal identity + every hop is a real graph neighbor
    neighbor_sets = {i: {v for v, _ in adj[i]} for i in range(n_nodes)}
    for i in range(n_nodes):
        assert nxt[i][i] == i
        for j in range(n_nodes):
            if i != j:
                assert nxt[i][j] in neighbor_sets[i], (i, j, nxt[i][j])
    assert (frame_to_node[2], frame_to_node[72], SHORTCUT_W) in [
        (a, b, w) for a, b, w in edges
    ], "center shortcut missing — anti-oscillation mechanism, not optional"

    targetable = [
        i for i, fi in enumerate(node_frames) if fi not in EXCLUDE_TARGET
    ]
    rest = frame_to_node[REST_FRAME]
    squint = frame_to_node[SQUINT_FRAME]
    assert rest in targetable

    # atlas: nodes in timeline order; padding cells hold the REST frame so
    # any index bug degrades invisibly instead of flashing the corner glare
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

    for i, fi in enumerate(node_frames):
        put(fi, i)
    for i in range(n_nodes, COLS * ROWS):
        put(REST_FRAME, i)

    out = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    out.save(OUT_ATLAS, "WEBP", quality=80, method=6)
    print(f"atlas {out.size} -> {OUT_ATLAS} ({os.path.getsize(OUT_ATLAS)//1024} KB)")

    data = {
        "n": n_nodes,
        "nodes": [[round(float(a), 4), round(float(b), 4)] for a, b in zip(nx, ny)],
        "targetable": targetable,
        "next": nxt,
        "rest": rest,
        "squint": squint,
    }
    json.dump(data, open(OUT_MAP, "w"), separators=(",", ":"))
    print(
        f"map -> {OUT_MAP} ({os.path.getsize(OUT_MAP)} B; {n_nodes} nodes, "
        f"{len(targetable)} targetable, rest={rest}, squint={squint})"
    )


if __name__ == "__main__":
    main(sys.argv[1])
