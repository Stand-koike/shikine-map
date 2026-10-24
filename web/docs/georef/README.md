# 地理参照（QGIS Georeferencer）

## `park.png.points`

QGIS Georeferencer の GCP（第 VIII 系 → アフィン）。**4point.csv の地上座標と一致**しますが、Web の Mapbox イラストは **画像ファイルの四隅ピクセル (0,0)(W,0)(W,H)(0,H)** に緯度経度を置く必要があります。

GCP が画像の角以外のピクセルにある場合、`4point.csv` をそのまま `MAP_IMAGE.coordinates` に入れると **点は正しいのに絵だけずれる**（数十〜数百 m）。

さらに `.points` の `sourceX/sourceY` は **ファイルの (0,0) と一致しない**（`sourceY` が負など）ので、GCP の source 範囲を画像外枠に線形マッピングしてから四隅を計算する（`compute_image_corners.py`）。

**本番は GDAL ワープ**（QGIS と同じ変換）を使います。`park.png.points` を変えたら:

```bash
# gdal-bin, pip install numpy pyproj
python3 web/scripts/build_georef_map.py
```

→ `map-georef.webp` と `georef.corners.js` が更新され、Mapbox は直交四隅に貼るだけなので **point.csv の座標と一致**します。

（旧方式: 未ワープ `map.webp` に四隅だけ指定 → Mapbox の双線形補間と QGIS アフィンが一致せず、点と絵がずれる）

## 関連

- 公園角の地上座標（GCP 値）: [sheets/4point.csv](../sheets/4point.csv)
- 参照点: [sheets/point_029d.csv](../sheets/point_029d.csv)
