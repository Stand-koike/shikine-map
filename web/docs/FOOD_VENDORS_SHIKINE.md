# 敷根公園フェス — フードエリア出店者（フライヤー読取）

出典: 運営提供フライヤー「敷根公園フェス フードエリア」（`web/assets/vendors/flyer-food-area-2026.jpg`）。  
**座標（lat/lng）・store_id（LINE 用）はフライヤーに無いため未記入。** 地図配置後にシートへ追加してください。

---

## イベント（フライヤー記載）

| 項目 | 内容 |
|------|------|
| 名称 | 敷根公園フェス フードエリア |
| 日時 | 2026年11月3日（火・祝）10:00〜16:00 |
| 入場 | 無料 |
| 問い合わせ | 下田市敷根公園屋内温水プール TEL 0558-23-6333 |
| 注記 | 出店者情報は予告なく変更になる場合があります |

---

## 出店 4 店（読取テキスト）

### 1. 伊豆下田食堂まきまき

- **メニュー（フライヤー記載）:** 肉巻きおにぎり、焼きそば、たこ焼き、フライドチキン…ほか
- **マップ用画像:** `assets/vendors/makimaki.webp`（フライヤー左ロゴを切り出し）

### 2. 12 KITCHEN SHIMODA

- **メニュー:** ホットドッグ、ステーキサンド、ポテト、タピオカドリンク…ほか
- **マップ用画像:** `assets/vendors/12kitchen-shimoda.webp`

### 3. 高橋鳥肉店

- **メニュー:** 焼きとり、もも串、かわ串、つくね、チキンテール…ほか
- **マップ用画像:** `assets/vendors/takahashi-toriniku.webp`

### 4. 味な菓子処 しまの

- **メニュー:** 下田さく咲く、みたらしだんご、まいたけおこわ
- **マップ用画像:** `assets/vendors/shimano-kashi.webp`  
  （フライヤー表記は「味な菓子処」「しまの」の 2 行。正式な店名表記に修正があればシートの `name` を差し替え）

---

## スプレッドシートへの入稿

1. [sheets/店舗マスタ_ヘッダー.csv](sheets/店舗マスタ_ヘッダー.csv) を 1 行目に貼る
2. [sheets/food_vendors_seed.csv](sheets/food_vendors_seed.csv) の 2〜5 行を貼る（**lat/lng は空**）
3. 列 F（`image_url`）に `assets/vendors/….webp` を入れている → GitHub Pages 同梱画像をそのまま表示（`index.html` の `resolveSheetMediaUrl`）

本番 URL 例（デプロイ後）:  
`https://stand-koike.github.io/shikine-map/assets/vendors/makimaki.webp`  
シートには **相対パス `assets/...` 推奨**（環境をまたいで同じ行が使える）。

---

## store_id（LINE かわら版）

4 店とも **store_id は未設定**。LINE 運用開始時に店ごとに一意 ID を決め、[PIN_INVENTORY_SHIKINE.md](PIN_INVENTORY_SHIKINE.md) と `posts.store_id` を揃えてください。

---

## 画像ファイル一覧

| ファイル | 用途 |
|----------|------|
| `flyer-food-area-2026.jpg` | 元フライヤー（参照用） |
| `*.webp` / `*.jpg` | 各店ロゴ（マーカー・モーダル） |

切り出し位置の再現手順は `web/assets/vendors/README.md`（必要なら Agent が追記）。
