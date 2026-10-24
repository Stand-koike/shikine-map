# 地理参照（QGIS Georeferencer）

## `park.png.points`

QGIS Georeferencer の GCP（第 VIII 系 → アフィン）。**4point.csv の地上座標と一致**しますが、Web の Mapbox イラストは **画像ファイルの四隅ピクセル (0,0)(W,0)(W,H)(0,H)** に緯度経度を置く必要があります。

GCP が画像の角以外のピクセルにある場合、`4point.csv` をそのまま `MAP_IMAGE.coordinates` に入れると **点は正しいのに絵だけずれる**（数十〜数百 m）。

さらに `.points` の `sourceX/sourceY` は **ファイルの (0,0) と一致しない**（`sourceY` が負など）ので、GCP の source 範囲を画像外枠に線形マッピングしてから四隅を計算する（`compute_image_corners.py`）。

`config.js` の四隅は `.points` からアフィンで求めた **画像外枠四隅の WGS84** を使います。再計算:

```bash
python3 web/docs/georef/compute_image_corners.py
```

## 関連

- 公園角の地上座標（GCP 値）: [sheets/4point.csv](../sheets/4point.csv)
- 参照点: [sheets/point_029d.csv](../sheets/point_029d.csv)
