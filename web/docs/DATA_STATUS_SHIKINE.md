# 敷根フェスマップ — いま揃っている情報（位置だけ後入れ用）

**ピン lat/lng・イラスト四隅は 2026-10-24 に QGIS `park_4326.tif` / `point.csv` で確定**（→ [MAP_GEOTIFF_SHIKINE.md](MAP_GEOTIFF_SHIKINE.md)、シード [sheets/point_official_2026-10-24.csv](sheets/point_official_2026-10-24.csv)）。  
**Google スプレッドシート**は `food_vendors_seed.csv` / `fixed_master_ALL_seed.csv` を貼り直す必要あり（リポジトリだけではシートは自動更新されない）。

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

---

## ピン一覧（lat/lng はシード CSV に反映済み・シート要同期）

| store_id | 表示名 | レイヤー | category | 画像 | あとで入れる |
|----------|--------|----------|----------|------|----------------|
| `food_makimaki` | 伊豆下田食堂まきまき | 店舗 | フードエリア | vendors/makimaki | シード済み |
| `food_12kitchen` | 12 KITCHEN SHIMODA | 店舗 | フードエリア | 12kitchen-shimoda | **lat/lng** |
| `food_takahashi_toriniku` | 高橋鳥肉店 | 店舗 | フードエリア | takahashi-toriniku | **lat/lng** |
| `food_shimano` | 味な菓子処 しまの | 店舗 | フードエリア | shimano-kashi | **lat/lng** |
| `stage_outdoor` | 敷根公園野外ステージ | 固定 | stage | ヨガ＋音楽TT 2枚 | **lat/lng** |
| `kids_wakuwaku` | わくわく広場 | 固定 | kids_play | フライヤー＋スポンサー | **lat/lng** |
| `ws_kids_core` | キッズコアトレーニング | 固定 | ws_indoor | フライヤー。申込 `https://logoform.jp/f/srRs9` | **lat/lng** |
| `ws_indoor_2` | 屋内ワークショップ（2） | 固定 | ws_indoor | なし（テキスト後入れ） | **lat/lng** + 名称・説明 |
| `pool_shikine` | 敷根プール（無料開放） | 固定 | pool | フライヤー | **lat/lng** |
| `office_nature_walk` | 自然観察体験会（敷根公園事務所） | 固定 | park_office | フライヤー。集合＝事務所前 | **lat/lng** |
| `toilet_1` | トイレ1 | 固定 | toilet | マップアイコンのみ | **lat/lng**（呼び方は任意） |
| `toilet_2` | トイレ2 | 固定 | toilet | マップアイコンのみ | **lat/lng** |
| `toilet_3` | トイレ3 | 固定 | toilet | マップアイコンのみ | **lat/lng** |

**合計 13 ピン**（飲食4 + 固定9）。lat/lng が入るまでマップには出ません。

---

## タイムテーブル（11/3）

`store_id` はカンマ区切り可。リストタップ → 対象ピンを強調（複数ならまとめて）。フード行は 4 店。

| 時間 | 内容 | store_id |
|------|------|----------|
| 09:30–10:30 | 自然観察体験会（事務所前集合） | `office_nature_walk` |
| 10:00–16:00 | 敷根プール 無料開放 | `pool_shikine` |
| 10:00–11:00 | 青空ヨガ（中谷コーチ） | `stage_outdoor` |
| 10:00–16:00 | わくわく広場 | `kids_wakuwaku` |
| 11:00–12:00 | みんなでサッカー！！ | `kids_ground` |
| 10:00–16:00 | フードエリア | 飲食 4 店（まとめて強調。各店ピンは個別にも可） |
| 12:15–13:00 | キッズコアトレーニング | `ws_kids_core` |
| 13:00〜 | 第1部 OTOGIYA | `stage_outdoor` |
| 14:00〜 | 第2部（ジュニアブラス / Hybrid wolf / 豆州白浜太鼓） | `stage_outdoor` |

第2部 3 団体の**個別開始時刻はフライヤーに無し**。

---

## 運営確認済み（回答 1〜11）

1. 実数に合わせる → **13 ピン**（プール・事務所を含む。WS2・トイレも行あり）
2. トイレ 3。モーダルなし、マップアイコンのみ。名称は仮の トイレ1〜3
3. WS 2 件目はテキスト後入れ。マップアイコンは `ws_indoor.png` を共用
4. 探すラベル案で OK。複数カテゴリ同時 ON
5. フード TT 行 = タイムテーブルの「フードエリア」行。タップで 4 店強調。各店ピンも個別に強調可
6. 第2部は現状のまま（個別時刻なし）
7. イラストは `web/map.webp`。`geo_park.pgw` から四隅を `MAP_IMAGE.coordinates` に反映（CRS は第 VIII 系と仮定。絵の傾きは画像内。回転項は 0）
8. 敷根専用ブックを作成済み（上の URL）
9. LINE の最新投稿をマップ／モーダルに出す（フロントは ON。GAS は未接続）
10. ピン PNG は別途支給なし → `web/assets/fixed-pins/` にカテゴリ色分けアイコンを配置
11. 3つ目ボタンは **公園**（仮のまま）

---

## ボトムナビ

| ボタン | 動き |
|--------|------|
| **探す** | カテゴリで **ピンを消さない**。対象を大きく／非対象を小さく薄く |
| **タイムテーブル** | 下からシート。**半分（マップと同居）** と **全面**。行タップで対応ピンへ（複数 ID はまとめて強調） |
| **公園** | 日時・入場無料・問い合わせ電話 |

レイヤー ON/OFF（ピン非表示）はフェスでは使わない想定です。
