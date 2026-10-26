# 敷根公園フェスマップ — ファイル構成

このフォルダが GitHub Pages の公開対象です。

| ファイル | 説明 |
|----------|------|
| `index.html` | マップアプリ本体 |
| `fixed-pins.js` | 固定施設ピン（store_id 補完・画像 URL・マーカー DOM） |
| `config.js` | 地図・表示の設定 |
| `line-contract.js` | データ形式の定義 |
| `map.webp` | イラスト地図画像 |
| `secrets.example.js` | 設定サンプル（実際の値は Git に含めない） |
| `wordpress-kawara-widget.js` | WordPress 埋め込み用ウィジェット |
| `assets/fixed-pins/` | 固定施設ピンのアイコン画像 |

---

## 新エリアを追加する

別の地域で同じマップ機能を公開する手順は [docs/AREA_MIGRATION_GUIDE.md](docs/AREA_MIGRATION_GUIDE.md) を参照してください。

## スプレッドシート

出店データの列定義と作成手順は [docs/SHEET_SETUP_SHIKINE.md](docs/SHEET_SETUP_SHIKINE.md) を参照してください。
