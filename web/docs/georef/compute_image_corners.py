#!/usr/bin/env python3
"""park.png.points から map.webp 外枠四隅の WGS84 を計算（Mapbox image source 用）。"""
from __future__ import annotations

import json
import re
from pathlib import Path

import numpy as np

try:
    from pyproj import Transformer
except ImportError:
    raise SystemExit("pip install pyproj")

ROOT = Path(__file__).resolve().parents[2]
POINTS = Path(__file__).resolve().parent / "park.png.points"
IMG_W, IMG_H = 1024, 724


def load_gcps(path: Path) -> list[tuple[float, float, float, float]]:
    rows: list[tuple[float, float, float, float]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or line.startswith("mapX"):
            continue
        parts = line.split(",")
        if len(parts) < 4:
            continue
        mx, my, sx, sy = map(float, parts[:4])
        rows.append((mx, my, sx, sy))
    if len(rows) < 3:
        raise ValueError(f"need GCP rows in {path}")
    return rows


def main() -> None:
    gcps = load_gcps(POINTS)
    crs_line = next(
        (ln for ln in POINTS.read_text(encoding="utf-8").splitlines() if ln.startswith("#CRS:")),
        "",
    )
    epsg_ids = [int(x) for x in re.findall(r'ID\["EPSG",(\d+)\]\]', crs_line)]
    epsg = 6676
    for code in reversed(epsg_ids):
        if 6670 <= code <= 6687 or code in (30161, 30168, 2451):
            epsg = code
            break

    A = np.array([[sx, sy, 1] for _mx, _my, sx, sy in gcps])
    coef_x = np.linalg.lstsq(A, [g[0] for g in gcps], rcond=None)[0]
    coef_y = np.linalg.lstsq(A, [g[1] for g in gcps], rcond=None)[0]

    def pix_to_plane(sx: float, sy: float) -> tuple[float, float]:
        return (
            coef_x[0] * sx + coef_x[1] * sy + coef_x[2],
            coef_y[0] * sx + coef_y[1] * sy + coef_y[2],
        )

    t = Transformer.from_crs(epsg, 4326, always_xy=True)
    # Georeferencer の sourceX/sourceY は画像ファイル座標と一致しない（sourceY が負など）。
    # GCP の source 範囲を画像外枠 (0,0)〜(W,H) に線形マッピングしてからアフィンへ渡す。
    src_x = [g[2] for g in gcps]
    src_y = [g[3] for g in gcps]
    sx_min, sx_max = min(src_x), max(src_x)
    sy_top, sy_bot = min(src_y), max(src_y)

    def file_to_source(col: float, row: float) -> tuple[float, float]:
        sx = sx_min + (col / IMG_W) * (sx_max - sx_min)
        sy = sy_top + (row / IMG_H) * (sy_bot - sy_top)
        return sx, sy

    names = ["NW", "NE", "SE", "SW"]
    file_pixels = [(0, 0), (IMG_W, 0), (IMG_W, IMG_H), (0, IMG_H)]
    out = []
    for name, (col, row) in zip(names, file_pixels):
        sx, sy = file_to_source(col, row)
        mx, my = pix_to_plane(sx, sy)
        lng, lat = t.transform(mx, my)
        out.append({"corner": name, "lng": lng, "lat": lat, "pixel": [col, row]})
    print(json.dumps({"imageSize": [IMG_W, IMG_H], "corners": out}, indent=2))


if __name__ == "__main__":
    main()
