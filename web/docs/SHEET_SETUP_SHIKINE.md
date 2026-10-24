# 敷根公園フェスマップ — スプレッドシートの準備

**ピン種別・件数の設計**は [PIN_INVENTORY_SHIKINE.md](PIN_INVENTORY_SHIKINE.md)（飲食4＋固定9＝13）。

専用ブックは作成済みです。

| | |
|--|--|
| タイトル | 敷根公園フェスマップ 2026 |
| URL | https://docs.google.com/spreadsheets/d/1dmcJ12JuBWJPLxe43Ut4jVOaFpCqqpAgCRGvnwtxmRk/edit |
| ID | `1dmcJ12JuBWJPLxe43Ut4jVOaFpCqqpAgCRGvnwtxmRk` |

マップ（gviz）が読むには **「リンクを知っている全員」閲覧者** にしてください。

| シート | 用途 | config |
|--------|------|--------|
| 店舗マスタ（先頭） | 飲食 4 店 | gviz デフォルト（先頭シート） |
| 固定マスタ | トイレ・ステージ・キッズ・WS・プール・事務所 | `FIXED_MASTER_SHEET` |
| `posts` | LINE 最新情報（飲食） | [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md) |
| `event_schedule` | フェス全体タイムテーブル | [EVENT_SCHEDULE_SHIKINE.md](EVENT_SCHEDULE_SHIKINE.md) |

---

## 1. 共有と ID の登録

1. 上記ブックを開く → **共有** → 「リンクを知っている全員」**閲覧者**。
2. ID を控える（上表）。
3. **ローカル**: `web/secrets.local.js` の `SHEET_ID`
4. **本番**: GitHub Actions secret `GOOGLE_SHEET_ID`

ヘッダー行のコピー用 CSV:

- [sheets/店舗マスタ_ヘッダー.csv](sheets/店舗マスタ_ヘッダー.csv)
- [sheets/固定マスタ_ヘッダー.csv](sheets/固定マスタ_ヘッダー.csv)

データ本体はブックに投入済み。リポジトリ側の控えは [DATA_STATUS_SHIKINE.md](DATA_STATUS_SHIKINE.md)。

---

## 2. 列レイアウト（`web/config.js` の `COLS`）

**B 列 = name**（A 列 `_reserved` は空で可）。列番号は gviz の `row.c[n]` に対応。

| 列 | ヘッダー例 | 用途 |
|----|------------|------|
| A | _reserved | 空で可 |
| B | name | 表示名 |
| C–D | lat, lng | 緯度・経度（WGS84）**あとから入力**（セルは黄） |
| E | emoji | ピン絵文字（任意） |
| F–H | image_url … | モーダル画像 1〜3（HTTPS）。マーカーは F を優先 |
| I | desc | 説明（WS はここに長文） |
| J | category | フィルタ用 / 固定ピンは `FIXED_PIN_ICONS` のキー |
| K | hidden | **`FALSE` の行は非表示**（外浦同型。`TRUE` または空は表示） |
| L | store_id | 一意 ID（飲食は LINE 必須） |
| M 以降 | status, news, … | 任意 |

座標は Google マップ等の WGS84 を C/D 列に入れる。イラストの四隅は [MAP_GEOTIFF_SHIKINE.md](MAP_GEOTIFF_SHIKINE.md)（運営確認値）と `config.js` の `MAP_IMAGE.coordinates`。

---

## 3. LINE・posts（飲食）

`posts` タブは作成済み。フロントは `ENABLE_LIVE_POSTS: true`。  
実際の投稿には GAS と LINE チャネルが必要です。手順: [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md)
