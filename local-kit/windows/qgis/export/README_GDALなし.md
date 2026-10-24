# GDAL が無い場合

1. QGIS で `park_4326.tif` を開き、**レイヤプロパティ → 情報** で範囲（経度・緯度）をメモ。
2. 四隅（北西・北東・南東・南西）の `[経度, 緯度]` を `web\config.local.js` に手書き（`Import-GeoTiff.ps1` が作る形式と同じ）。
3. イラストは QGIS から **PNG** で書き出し、`web\map-qgis.webp` または `map.webp` に置く。

OSGeo4W を入れると `Import-GeoTiff.ps1` 一発で済みます。
