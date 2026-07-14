"""Build the hero gaze atlas from the five direction videos (star graph, v6).

Sources (design/assets/robot video/directions/): five clips generated from
one shared reference still (robot-center-reference.png), so they share the
character and the neutral center pose:

  lr    left -> right level turn        (level row,   gaze X 322..584)
  ud    up -> down sweep (down leg)     (center col,  gaze Y 278..459)
  tlbr  up-left -> down-right diagonal  (gaze 388,305 .. 641,418)
  ur    center -> up-right              (gaze 511,362 .. 629,277)
  dl    center -> down-left             (gaze 511,362 .. 281,454)

Topology: an 8-spoke star. Node 0 is the canonical CENTER (dl f0 — the
reference pose). Each clip contributes a chain of arc-length-sampled nodes
(blink frames excluded — the generator blinked mid-sweep in every clip; see
CLEAN ranges). Chains join the hub at their measured center-crossings.
Travel between spokes passes through center, which reads as the robot
naturally re-orienting its head.

Cursor mapping: node gaze coords are warped to the global stabilization
frame, then piecewise-normalized PER HALF-AXIS around the center pose, so
cursor (0.5, 0.5) lands exactly on the center node even though the measured
gaze range is asymmetric (X 281..641 around 511; Y 277..459 around 363).

Per-video extraction (frames + torso + gaze measurement) is
scripts/measure-gaze-video.py -> scratch dirs; this script consumes those.

Output: public/hero/robot-atlas-v6.webp (versioned name — never overwrite a
deployed atlas; browser caches serve stale cells), heroGazeMap.json
{n, cols, rows, nodes, targetable, next, rest, squint:-1}, plus review
sheets in design/assets/robot video/directions/:
  atlas-v6-contact.png  the atlas cells labeled with node id + clip
  gaze-map-9x9.png      Andrew's spatial map: each cell = the pose the
                        tracker shows when the cursor is at that screen cell

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
OUT_ATLAS = os.path.join("public", "hero", "robot-atlas-v7.webp")
OUT_MAP = os.path.join("src", "components", "site", "heroGazeMap.json")
REVIEW_DIR = os.path.join("design", "assets", "robot video", "directions")

# clip -> (clean monotonic frame ranges [inclusive], node budget, forced
# frames that must become nodes: chain ends + hub-join crossings)
CLIPS = {
    "lr":   {"ranges": [(0, 61)], "n": 20, "forced": [0, 42, 61]},
    "ud":   {"ranges": [(8, 38)], "n": 14, "forced": [8, 21, 38]},
    "tlbr": {"ranges": [(0, 25), (31, 39), (45, 76)], "n": 18,
             "forced": [0, 39, 45, 76]},
    "ur":   {"ranges": [(8, 13), (17, 33), (37, 46), (51, 68)], "n": 13,
             "forced": [8, 68]},
    "dl":   {"ranges": [(10, 15), (20, 36), (40, 56), (61, 83)], "n": 15,
             "forced": [10, 83]},
}
CENTER = ("dl", 0)  # the reference pose the ur/dl clips start from
# hub edges: center <-> each clip's center-adjacent node (weight 2)
HUB_JOINS = [("lr", 42), ("ud", 21), ("tlbr", 39), ("tlbr", 45),
             ("ur", 8), ("dl", 10)]
CHAIN_W, HUB_W = 1, 2


def load_metrics(scratch, slug):
    return json.load(open(os.path.join(scratch, slug, "metrics.json")))


def dijkstra_next_hop(n_nodes, edges):
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
        for dst in range(n_nodes):
            if dst == src:
                nxt[src][dst] = src
                continue
            if prev[dst] == -1:
                raise SystemExit(f"graph disconnected: {src} -/-> {dst}")
            node = dst
            while prev[node] != src:
                node = prev[node]
            nxt[src][dst] = node
    return nxt, adj


def main(scratch):
    metrics = {s: load_metrics(scratch, s) for s in CLIPS}

    # global torso reference across ALL clips (they share the character)
    all_t = [t for m in metrics.values() for t in m["torso"] if t]
    ref_cx = float(np.median([t[0] for t in all_t]))
    ref_w = float(np.median([t[1] for t in all_t]))
    print(f"global torso ref: cx {ref_cx:.1f}, width {ref_w:.1f}")

    def warp_params(slug, fi):
        cx, w = metrics[slug]["torso"][fi]
        sc = ref_w / w
        return sc, ref_cx - sc * cx, H - sc * H

    def warped_gaze(slug, fi):
        g = metrics[slug]["gaze"][fi]
        sc, tx, ty = warp_params(slug, fi)
        return sc * g[0] + tx, sc * g[1] + ty

    def load_stab(slug, fi):
        f = cv2.imread(os.path.join(scratch, slug, f"f{fi:03d}.png"),
                       cv2.IMREAD_UNCHANGED)
        sc, tx, ty = warp_params(slug, fi)
        M = np.float32([[sc, 0, tx], [0, sc, ty]])
        return cv2.warpAffine(f, M, (W, H), flags=cv2.INTER_LINEAR,
                              borderMode=cv2.BORDER_CONSTANT,
                              borderValue=(0, 0, 0, 0))

    # ---- node selection: forced frames + arc-length sampling ----
    nodes = [CENTER]  # node 0 = canonical center
    chains = {}  # slug -> [node ids in chain order]
    for slug, cfg in CLIPS.items():
        frames = [f for a, b in cfg["ranges"] for f in range(a, b + 1)]
        pts = {f: warped_gaze(slug, f) for f in frames}
        arc = 0.0
        arcs = {}
        prev = None
        for f in frames:
            if prev is not None:
                arc += float(np.hypot(pts[f][0] - pts[prev][0],
                                      pts[f][1] - pts[prev][1]))
            arcs[f] = arc
            prev = f
        chosen = set(cfg["forced"])
        step = arc / max(cfg["n"] - 1, 1)
        nxt_arc = step
        for f in frames:
            if len(chosen) >= cfg["n"]:
                break
            if arcs[f] >= nxt_arc and all(abs(f - c) > 1 for c in chosen):
                chosen.add(f)
                nxt_arc = arcs[f] + step
        ordered = sorted(chosen)
        ids = []
        for f in ordered:
            nodes.append((slug, f))
            ids.append(len(nodes) - 1)
        chains[slug] = ids
        print(f"{slug}: {len(ids)} nodes, frames {ordered}")

    n_nodes = len(nodes)
    if n_nodes > COLS * ROWS:
        raise SystemExit(f"{n_nodes} nodes won't fit {COLS}x{ROWS}")
    print(f"total nodes: {n_nodes} (grid capacity {COLS * ROWS})")
    node_id = {nf: i for i, nf in enumerate(nodes)}

    # ---- edges ----
    edges = []
    for slug, ids in chains.items():
        for a, b in zip(ids, ids[1:]):
            edges.append((a, b, CHAIN_W))
    for slug, f in HUB_JOINS:
        if (slug, f) not in node_id:
            raise SystemExit(f"hub frame {slug} f{f} was not selected as a node")
        edges.append((0, node_id[(slug, f)], HUB_W))

    # ---- edge quality: 96px grayscale RMS diff over every edge ----
    small = {}

    def small_of(i):
        if i not in small:
            st = load_stab(*nodes[i])
            a = st[:, :, 3:4].astype(np.float32) / 255
            g = (st[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).mean(axis=2)
            small[i] = cv2.resize(g, (96, 96), interpolation=cv2.INTER_AREA)
        return small[i]

    diffs = []
    for a, b, w in edges:
        d = float(np.sqrt(((small_of(a) - small_of(b)) ** 2).mean()))
        diffs.append((d, a, b, w))
    diffs.sort(reverse=True)
    chain_d = [d for d, a, b, w in diffs if w == CHAIN_W]
    print(f"chain-edge diff: median {np.median(chain_d):.1f}, "
          f"p90 {np.percentile(chain_d, 90):.1f}, max {max(chain_d):.1f}")
    print("hub-edge diffs:")
    for d, a, b, w in diffs:
        if w == HUB_W:
            print(f"  center <-> {nodes[b]}  {d:.1f}")
    print("worst 6 edges overall:")
    for d, a, b, w in diffs[:6]:
        print(f"  {nodes[a]} <-> {nodes[b]}  {d:.1f}")

    # review strip: hub joins + worst chain edges, side by side
    def review_cell(i):
        st = load_stab(*nodes[i])
        a = st[:, :, 3:4].astype(np.float32) / 255
        rgb = (st[:, :, :3].astype(np.float32) * a + 255 * (1 - a)).astype(np.uint8)
        img = cv2.resize(rgb, (260, 260), interpolation=cv2.INTER_AREA)
        cv2.putText(img, f"{nodes[i][0]} f{nodes[i][1]}", (6, 22),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (20, 20, 20), 2)
        return img

    rows_img = []
    for d, a, b, w in [x for x in diffs if x[3] == HUB_W] + diffs[:4]:
        row = np.hstack([review_cell(a), review_cell(b)])
        cv2.putText(row, f"diff {d:.0f}", (6, 250),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (9, 78, 236), 2)
        rows_img.append(row)
    cv2.imwrite(os.path.join(REVIEW_DIR, "edge-joins-review.png"),
                np.vstack(rows_img))

    # ---- next-hop ----
    nxt, adj = dijkstra_next_hop(n_nodes, edges)
    neighbor_sets = {i: {v for v, _ in adj[i]} for i in range(n_nodes)}
    for i in range(n_nodes):
        assert nxt[i][i] == i
        for j in range(n_nodes):
            if i != j:
                assert nxt[i][j] in neighbor_sets[i]

    # ---- piecewise normalization anchored at the center pose ----
    g = np.array([warped_gaze(*nf) for nf in nodes])
    cx0, cy0 = g[0]
    xmin, xmax = g[:, 0].min(), g[:, 0].max()
    ymin, ymax = g[:, 1].min(), g[:, 1].max()

    def norm(v, lo, mid, hi):
        return 0.5 * (v - lo) / (mid - lo) if v <= mid else \
            0.5 + 0.5 * (v - mid) / (hi - mid)

    coords = [[round(norm(x, xmin, cx0, xmax), 4),
               round(norm(y, ymin, cy0, ymax), 4)] for x, y in g]
    print(f"gaze bbox X {xmin:.0f}..{xmax:.0f} (center {cx0:.0f}), "
          f"Y {ymin:.0f}..{ymax:.0f} (center {cy0:.0f})")

    # ---- atlas ----
    content = CELL - 2 * INSET
    atlas = np.zeros((CELL * ROWS, CELL * COLS, 4), np.uint8)

    def put(nf, cell_i):
        r, c = cell_i // COLS, cell_i % COLS
        img = cv2.resize(load_stab(*nf), (content, content),
                         interpolation=cv2.INTER_AREA)
        cell = np.zeros((CELL, CELL, 4), np.uint8)
        cell[INSET:INSET + content, INSET:INSET + content] = img
        cell[:INSET, INSET:INSET + content] = img[0:1, :]
        cell[INSET + content:, INSET:INSET + content] = img[-1:, :]
        cell[:, :INSET] = cell[:, INSET:INSET + 1]
        cell[:, INSET + content:] = cell[:, INSET + content - 1:INSET + content]
        atlas[r * CELL:(r + 1) * CELL, c * CELL:(c + 1) * CELL] = cell

    for i, nf in enumerate(nodes):
        put(nf, i)
    for i in range(n_nodes, COLS * ROWS):
        put(CENTER, i)

    out = Image.fromarray(cv2.cvtColor(atlas, cv2.COLOR_BGRA2RGBA))
    out.save(OUT_ATLAS, "WEBP", quality=80, method=6)
    print(f"atlas {out.size} -> {OUT_ATLAS} "
          f"({os.path.getsize(OUT_ATLAS) // 1024} KB)")

    json.dump(
        {"n": n_nodes, "cols": COLS, "rows": ROWS, "nodes": coords,
         "targetable": list(range(n_nodes)), "next": nxt,
         "rest": 0, "squint": -1},
        open(OUT_MAP, "w"), separators=(",", ":"),
    )
    print(f"map -> {OUT_MAP} ({os.path.getsize(OUT_MAP)} B)")

    # ---- review sheets ----
    # (a) atlas contact sheet with node ids + clip slugs
    csz = 200
    sheet = np.full((ROWS * csz, COLS * csz, 3), 255, np.uint8)
    for i in range(COLS * ROWS):
        nf = nodes[i] if i < n_nodes else CENTER
        st = load_stab(*nf)
        a = st[:, :, 3:4].astype(np.float32) / 255
        bgv = 255 if i < n_nodes else 235
        rgb = (st[:, :, :3].astype(np.float32) * a + bgv * (1 - a)).astype(np.uint8)
        img = cv2.resize(rgb, (csz, csz), interpolation=cv2.INTER_AREA)
        label = f"{i} {nf[0]}f{nf[1]}" if i < n_nodes else "pad"
        cv2.putText(img, label, (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                    (20, 20, 20) if i < n_nodes else (150, 150, 150), 1)
        cv2.rectangle(img, (0, 0), (csz - 1, csz - 1), (210, 210, 210), 1)
        r, c = i // COLS, i % COLS
        sheet[r * csz:(r + 1) * csz, c * csz:(c + 1) * csz] = img
    cv2.imwrite(os.path.join(REVIEW_DIR, "atlas-contact.png"), sheet)

    # (b) Andrew's spatial 9x9 gaze map: cell (r, c) = the pose shown when
    # the cursor sits at that screen cell (nearest node, same cost as runtime)
    sheet2 = np.full((ROWS * csz, COLS * csz, 3), 255, np.uint8)
    for r in range(ROWS):
        for c in range(COLS):
            sx, sy = c / (COLS - 1), r / (ROWS - 1)
            best = min(range(n_nodes),
                       key=lambda i: (coords[i][0] - sx) ** 2
                       + (coords[i][1] - sy) ** 2)
            nf = nodes[best]
            st = load_stab(*nf)
            a = st[:, :, 3:4].astype(np.float32) / 255
            rgb = (st[:, :, :3].astype(np.float32) * a
                   + 255 * (1 - a)).astype(np.uint8)
            img = cv2.resize(rgb, (csz, csz), interpolation=cv2.INTER_AREA)
            cv2.putText(img, f"{nf[0]} f{nf[1]}", (5, 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (20, 20, 20), 1)
            cv2.rectangle(img, (0, 0), (csz - 1, csz - 1), (210, 210, 210), 1)
            sheet2[r * csz:(r + 1) * csz, c * csz:(c + 1) * csz] = img
    cv2.imwrite(os.path.join(REVIEW_DIR, "gaze-map-9x9.png"), sheet2)
    print("review sheets -> design/assets/robot video/directions/")


if __name__ == "__main__":
    main(sys.argv[1])
