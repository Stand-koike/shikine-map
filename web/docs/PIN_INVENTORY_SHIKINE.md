# 敷根フェスマップ — ピン種別・データ項目（総合運動公園）

イラスト地図の対象エリア: **総合運動公園**（四隅は `geo_park.pgw` から `MAP_IMAGE.coordinates` に反映。ピンの lat/lng は本ドキュメントでは**未記入**）。詳細: [MAP_GEOTIFF_SHIKINE.md](MAP_GEOTIFF_SHIKINE.md)。

実装の土台は既存の外浦マップと同じです。

| レイヤー | データ源 | マップ上の見え方 |
|----------|----------|------------------|
| **店舗ピン** | スプレッドシート先頭シート（店舗マスタ） | 丸ピン（絵文字 or 画像）。クラスタリング対象 |
| **設備・スポット** | 同一ブック内の **固定マスタ** シート | `FIXED_PIN_ICONS` で PNG 常時表示。クラスタ外・レイヤー「設備・スポット」 |

タップ時の詳細は **共通モーダル**（画像スライダー: 列 F / G / H、説明: 列 I、補足: 列 O）。飲食は **LINE 最新情報**（`posts` シート → 店舗 `store_id` 紐付け）。トイレはモーダルなし。

---

## ピン一覧（件数）

| # | 種別 | 件数 | レイヤー | マップアイコン | タップ時 |
|---|------|------|----------|----------------|----------|
| T | トイレ | **3** | 固定マスタ | `toilet.png` | アイコンのみ（モーダルなし） |
| F | 飲食 | **4** | 店舗マスタ | 店舗画像 URL | 店舗情報 + **LINE 最新情報** |
| S | 敷根公園野外ステージ | **1** | 固定マスタ | `stage.png` | 青空ヨガ + 音楽 TT 画像 — [OUTDOOR_STAGE_SHIKINE.md](OUTDOOR_STAGE_SHIKINE.md) |
| K | わくわく広場（キッズ） | **1** | 固定マスタ | `kids_play.png` | フライヤー + Supported by — [KIDS_SPACE_SHIKINE.md](KIDS_SPACE_SHIKINE.md) |
| W | 屋内ワークショップ | **2** | 固定マスタ | `ws_indoor.png` | 1件目: 画像 + desc + 申込。2件目: テキスト後入れ |
| P | 敷根プール（無料開放） | **1** | 固定マスタ | `pool.png` | フライヤー — [POOL_SHIKINE.md](POOL_SHIKINE.md) |
| O | 屋内事務所（自然観察） | **1** | 固定マスタ | `park_office.png` | フライヤー + **集合：敷根公園事務所** — [OFFICE_SHIKINE.md](OFFICE_SHIKINE.md) |

**合計: 店舗 4 + 固定 9 = 13 ピン**

---

## 固定マスタ用 `category` とアイコン

`category` 列（店舗マスタと同じ列 J）の値が `config.js` の `FIXED_PIN_ICONS[category]` に対応します。

| category | 件数 | アイコン PNG | 状態 |
|----------|------|----------------|------|
| `toilet` | 3 | `toilet.png` | 配置済み。モーダルなし |
| `stage` | 1 | `stage.png` | 配置済み |
| `kids_play` | 1 | `kids_play.png` | 配置済み |
| `ws_indoor` | 2 | `ws_indoor.png` | 配置済み |
| `pool` | 1 | `pool.png` | 配置済み |
| `park_office` | 1 | `park_office.png` | 配置済み |

> `category` の文字列は **スプレッドシートと `FIXED_PIN_ICONS` で完全一致**が必要です。

---

## 列マッピング（`web/config.js` の `COLS`）

gviz の `row.c[列番号]` です。**A 列 = 0** ではなく、本プロジェクトは **A 列を空けて B 列から name** のレイアウト（`NAME: 1` = B 列）。

| 列番号 | 列 | フィールド | トイレ | 飲食 | ステージ | キッズ | WS |
|--------|-----|------------|--------|------|----------|--------|-----|
| 1 | B | name | 表示名（仮: トイレ1〜3） | 店名 | ステージ名 | エリア名 | WS 名 |
| 2–3 | C–D | lat / lng | **要入力** | **要入力** | **要入力** | **要入力** | **要入力** |
| 4 | E | emoji | 任意 | 任意 | 任意 | 任意 | 任意 |
| 5–7 | F–H | image_url_1〜3 | 使わない | 店舗写真等 | **プログラム画像** | **紹介画像** | **紹介画像** |
| 8 | I | desc | 使わない | メニュー等 | 任意 | 任意 | **説明文** |
| 9 | J | category | `toilet` | `フードエリア` | `stage` | `kids_play` | `ws_indoor` |
| 10 | K | hidden | `TRUE` で非表示 | 同左 | 同左 | 同左 | 同左 |
| 11 | L | store_id | `toilet_1` 等 | **LINE 用必須** | 任意 | 任意 | 任意 |

飲食の **マーカー画像**は列 F（`imageUrl`）に HTTPS URL があれば絵文字より画像優先です。

---

## 店舗マスタ（飲食 ×4）

**店名・メニュー・画像**はフライヤーから取り込み済み → [FOOD_VENDORS_SHIKINE.md](FOOD_VENDORS_SHIKINE.md)  
シート貼り付け用: [sheets/food_vendors_seed.csv](sheets/food_vendors_seed.csv)（**lat/lng は後日**。`store_id` 設定済み）

| store_id | name | image_url (F) |
|----------|------|---------------|
| `food_makimaki` | 伊豆下田食堂まきまき | `assets/vendors/makimaki.webp` |
| `food_12kitchen` | 12 KITCHEN SHIMODA | `assets/vendors/12kitchen-shimoda.webp` |
| `food_takahashi_toriniku` | 高橋鳥肉店 | `assets/vendors/takahashi-toriniku.webp` |
| `food_shimano` | 味な菓子処 しまの | `assets/vendors/shimano-kashi.webp` |

`category` はシードで `フードエリア`。

---

## 固定マスタ

シート名: **`固定マスタ`**（`config.js` の `FIXED_MASTER_SHEET`）。一括シード: [sheets/fixed_master_ALL_seed.csv](sheets/fixed_master_ALL_seed.csv)

| store_id | 種別 | name | category |
|----------|------|------|----------|
| toilet_1〜3 | トイレ | トイレ1〜3（仮） | toilet |
| stage_outdoor | ステージ | 敷根公園野外ステージ | stage |
| kids_wakuwaku | キッズ | わくわく広場 | kids_play |
| ws_kids_core | WS | キッズコアトレーニング | ws_indoor |
| ws_indoor_2 | WS | 屋内ワークショップ（2）（テキスト後入れ） | ws_indoor |
| pool_shikine | プール | 敷根プール（無料開放） | pool |
| office_nature_walk | 事務所 | 自然観察体験会（敷根公園事務所） | park_office |

ヘッダー行の例は [sheets/固定マスタ_ヘッダー.csv](sheets/固定マスタ_ヘッダー.csv)。

---

## LINE 最新情報（飲食 4 店）

現状 `config.js`: `ENABLE_LIVE_POSTS: true`（フロントは読む。GAS / LINE チャネルは未接続）。

有効投稿が出る前に必要なもの:

1. `posts` シート（ブックに作成済み。例行は `isVisible=FALSE`）
2. 各飲食行の `store_id` と `posts.storeId` の一致
3. GAS Webhook / LINE チャネル（外浦コピーか新規）
4. ブックを「リンクを知っている全員・閲覧者」

詳細: [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md)

---

## `config.js`

| キー | いま |
|------|------|
| `FIXED_MASTER_SHEET` | `固定マスタ` |
| `FIXED_PIN_ICONS` | toilet / stage / kids_play / ws_indoor / pool / park_office |
| `FIXED_PIN_SIZE` | 36 |
| `FIXED_PIN_NO_MODAL` | `['toilet']` |
| `ENABLE_LIVE_POSTS` | `true` |
| `MAP_IMAGE` | `geo_park.pgw` から四隅を反映。ピン lat/lng は未記入 |

専用ブック ID と座標待ち一覧: [DATA_STATUS_SHIKINE.md](DATA_STATUS_SHIKINE.md)

---

## 関連ファイル

- [SHEET_SETUP_SHIKINE.md](SHEET_SETUP_SHIKINE.md)
- [../assets/fixed-pins/README.md](../assets/fixed-pins/README.md)
