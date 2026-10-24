#!/usr/bin/env python3
"""GDAL で QGIS .points と同じ地理参照を map に適用し、Mapbox 用の直交画像と四隅を出力。"""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from pyproj import Transformer

ROOT = Path(__file__).resolve().parents[1]
POINTS = ROOT / "docs/georef/park.png.points"
SRC = ROOT / "map.webp"
OUT_IMG = ROOT / "map-georef.webp"
OUT_JS = ROOT / "georef.corners.js"
IMG_W, IMG_H = 1024, 724


def load_gcps(path: Path) -> list[tuple[float, float, float, float]]:
    rows: list[tuple[float, float, float, float]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or line.startswith("mapX"):
            continue
        parts = line.split(",")
        if len(parts) < 4:
            continue
        rows.append(tuple(map(float, parts[:4])))
    if len(rows) < 3:
        raise ValueError(f"GCP が不足: {path}")
    return rows


def main() -> None:
    gcps = load_gcps(POINTS)
    with tempfile.TemporaryDirectory() as tmp:
        tmp_gcp = Path(tmp) / "gcp.tif"
        tmp_warp = Path(tmp) / "warp.tif"

        gcp_args: list[str] = []
        for mx, my, sx, sy in gcps:
            gcp_args.extend(["-gcp", str(sx), str(sy), str(mx), str(my), "0"])
        subprocess.check_call(
            ["gdal_translate", "-of", "GTiff", "-a_srs", "EPSG:6676", *gcp_args, str(SRC), str(tmp_gcp)]
        )

        A = np.array([[sx, sy, 1] for _mx, _my, sx, sy in gcps])
        coef_x = np.linalg.lstsq(A, [g[0] for g in gcps], rcond=None)[0]
        coef_y = np.linalg.lstsq(A, [g[1] for g in gcps], rcond=None)[0]
        t = Transformer.from_crs(6676, 4326, always_xy=True)
        sx_min, sx_max = min(g[2] for g in gcps), max(g[2] for g in gcps)
        sy_top, sy_bot = min(g[3] for g in gcps), max(g[3] for g in gcps)

        def file_to_source(col: float, row: float) -> tuple[float, float]:
            sx = sx_min + (col / IMG_W) * (sx_max - sx_min)
            sy = sy_top + (row / IMG_H) * (sy_bot - sy_top)
            return sx, sy

        lngs: list[float] = []
        lats: list[float] = []
        for col, row in ((0, 0), (IMG_W, 0), (IMG_W, IMG_H), (0, IMG_H)):
            sx, sy = file_to_source(col, row)
            mx = coef_x[0] * sx + coef_x[1] * sy + coef_x[2]
            my = coef_y[0] * sx + coef_y[1] * sy + coef_y[2]
            lng, lat = t.transform(mx, my)
            lngs.append(lng)
            lats.append(lat)

        pad_lng = (max(lngs) - min(lngs)) * 0.02
        pad_lat = (max(lats) - min(lats)) * 0.02
        te = [
            min(lngs) - pad_lng,
            min(lats) - pad_lat,
            max(lngs) + pad_lng,
            max(lats) + pad_lat,
        ]

        subprocess.check_call(
            [
                "gdalwarp",
                "-t_srs",
                "EPSG:4326",
                "-r",
                "bilinear",
                "-dstalpha",
                "-te",
                *[str(v) for v in te],
                str(tmp_gcp),
                str(tmp_warp),
            ]
        )

        info = json.loads(subprocess.check_output(["gdalinfo", "-json", str(tmp_warp)], text=True))
        cc = info["cornerCoordinates"]
        coords = [
            list(cc["upperLeft"]),
            list(cc["upperRight"]),
            list(cc["lowerRight"]),
            list(cc["lowerLeft"]),
        ]

        subprocess.check_call(
            ["gdal_translate", "-of", "WEBP", "-co", "QUALITY=90", str(tmp_warp), str(OUT_IMG)]
        )

    cache = "20261024-gdal-warp"
    OUT_JS.write_text(
        "window.__SHIKINE_MAP_GEOREF__ = {\n"
        f"    imageUrl: 'map-georef.webp',\n"
        f"    cacheVersion: {json.dumps(cache)},\n"
        f"    coordinates: {json.dumps(coords)}\n"
        "};\n",
        encoding="utf-8",
    )
    print(json.dumps({"image": str(OUT_IMG), "coordinates": coords}, indent=2))


if __name__ == "__main__":
    main()
