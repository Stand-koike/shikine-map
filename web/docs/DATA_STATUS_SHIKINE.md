# 敷根フェスマップ — いま揃っている情報

**ピン lat/lng・イラスト四隅は 2026-10-24 に QGIS `park_4326.tif` / `point.csv` で確定**（→ [MAP_GEOTIFF_SHIKINE.md](MAP_GEOTIFF_SHIKINE.md)、シード [sheets/point_official_2026-10-24.csv](sheets/point_official_2026-10-24.csv)）。  
**Google スプレッドシート**はリポジトリの CSV を貼り直す運用。本番ブックは運営側で同期済み（サッカー・図書館・事務所 WS・公園ボタン用データ含む）。

専用ブック（作成済み）:

- URL: https://docs.google.com/spreadsheets/d/1dmcJ12JuBWJPLxe43Ut4jVOaFpCqqpAgCRGvnwtxmRk/edit
- ID: `1dmcJ12JuBWJPLxe43Ut4jVOaFpCqqpAgCRGvnwtxmRk`
- タブ: `店舗マスタ` / `固定マスタ` / `event_schedule` / `posts` / `読み方`

**マップが読むために:** スプレッドシートを「リンクを知っている全員」**閲覧者**にする。  
ローカルは `web/secrets.local.js` の `SHEET_ID`、本番は GitHub Secret `GOOGLE_SHEET_ID` にこの ID を入れる。

リポジトリ側の貼り付け用コピー:

| 用途 | ファイル |
|------|----------|
| 飲食 4 店 | [sheets/food_vendors_seed.csv](sheets/food_vendors_seed.csv) |
| 固定ピン一括 | [sheets/fixed_master_ALL_seed.csv](sheets/fixed_master_ALL_seed.csv) |
| タイムテーブル | [sheets/event_schedule_2026-11-03_seed.csv](sheets/event_schedule_2026-11-03_seed.csv) |

`config.js`: `FIXED_MASTER_SHEET` = `固定マスタ`、`EVENTS_SHEET` = `event_schedule`、`ENABLE_LIVE_POSTS` = `true`。  
**公園ボタン**は `config.js` の `PARK_INFO`（キャッチ・会場・荒天時・主催表記・問い合わせ）。

---

## ピン一覧（シード CSV に lat/lng 反映済み）

| store_id | 表示名 | レイヤー | category | 備考 |
|----------|--------|----------|----------|------|
| `food_makimaki` | 伊豆下田食堂まきまき | 店舗 | フードエリア | シード済み |
| `food_12kitchen` | 12 KITCHEN SHIMODA | 店舗 | フードエリア | シード済み |
| `food_takahashi_toriniku` | 高橋鳥肉店 | 店舗 | フードエリア | シード済み |
| `food_shimano` | 味な菓子処 しまの | 店舗 | フードエリア | シード済み |
| `stage_outdoor` | 敷根公園野外ステージ | 固定 | stage | ヨガ＋音楽 TT |
| `kids_wakuwaku` | わくわく広場 | 固定 | kids_play | フライヤー＋スポンサー |
| `kids_ground` | みんなでサッカー！！ | 固定 | kids_play | 健康広場・11:00–12:00 |
| `ws_kids_core` | キッズコアトレーニング | 固定 | ws_indoor | 申込 URL あり |
| `ws_indoor_2` | 屋内ワークショップ（事務所内） | 固定 | ws_indoor | はにわ＋上原美術館 WS |
| `pool_shikine` | 敷根プール（無料開放） | 固定 | pool | |
| `office_nature_walk` | 自然観察体験会（敷根公園事務所） | 固定 | park_office | 集合＝事務所前 |
| `library_mobile` | 移動図書館 | 固定 | library | 飲食エリア |
| `toilet_1`〜`toilet_3` | トイレ1〜3 | 固定 | toilet | モーダルなし |

**合計 15 ピン**（飲食4 + 固定11）。

---

## タイムテーブル（11/3）

| 時間 | 内容 | store_id |
|------|------|----------|
| 09:30–10:30 | 自然観察体験会（事務所前集合） | `office_nature_walk` |
| 10:00–16:00 | 敷根プール 無料開放 | `pool_shikine` |
| 10:00–11:00 | 青空ヨガ（中谷コーチ・初心者歓迎） | `stage_outdoor` |
| 10:00–16:00 | わくわく広場 | `kids_wakuwaku` |
| 11:00–12:00 | みんなでサッカー！！ | `kids_ground` |
| 10:00–16:00 | 移動図書館 | `library_mobile` |
| 10:00–16:00 | 屋内ワークショップ（事務所内） | `ws_indoor_2` |
| 10:00–16:00 | フードエリア | 飲食 4 店 |
| 12:15–13:00 | キッズコアトレーニング | `ws_kids_core` |
| 13:00〜 | 第1部 OTOGIYA | `stage_outdoor` |
| 14:00〜 | 第2部（ジュニアブラス / Hybrid wolf / 豆州白浜太鼓） | `stage_outdoor` |

第2部 3 団体の**個別開始時刻はフライヤーに無し**。  
シート未投入時のサッカー補完: `config.js` の `EVENT_SCHEDULE_FALLBACK`。

---

## ボトムナビ

| ボタン | 動き |
|--------|------|
| **探す** | カテゴリで **ピンを消さない**。対象を大きく／非対象を小さく薄く |
| **タイムテーブル** | 下からシート。**半分** と **全面**。行タップで対応ピンへ |
| **公園** | フェス概要（`PARK_INFO`：日時・会場・入場無料・荒天時・主催・問い合わせ） |

レイヤー ON/OFF（ピン非表示）はフェスでは使わない想定です。
