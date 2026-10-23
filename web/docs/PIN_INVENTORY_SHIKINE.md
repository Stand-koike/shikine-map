# 敷根フェスマップ — ピン種別・データ項目（総合運動公園）

イラスト地図の対象エリア: **総合運動公園**（座標・地図画像は別途決定。本ドキュメントでは緯度経度は**未記入**）。

実装の土台は既存の外浦マップと同じです。

| レイヤー | データ源 | マップ上の見え方 |
|----------|----------|------------------|
| **店舗ピン** | スプレッドシート先頭シート（店舗マスタ） | 丸ピン（絵文字 or 画像）。クラスタリング対象 |
| **設備・スポット** | 同一ブック内の **固定マスタ** シート | `FIXED_PIN_ICONS` で PNG 常時表示。クラスタ外・レイヤー「設備・スポット」 |

タップ時の詳細は **共通モーダル**（画像スライダー: 列 F / G / H、説明: 列 I、補足: 列 O）。飲食のみ **LINE かわら版**（`posts` シート → 店舗 `store_id` 紐付け）。

---

## ピン一覧（件数）

| # | 種別 | 件数 | レイヤー | マップアイコン | タップ時に見せたい内容 |
|---|------|------|----------|----------------|------------------------|
| T | トイレ | **3** | 固定マスタ | トイレ PNG（常時） | （要確認: 説明のみ / 画像なしでよいか） |
| F | 飲食 | **4** | 店舗マスタ | 従来どおり（絵文字 or 店舗画像 URL） | 店舗情報 + **LINE 更新**（かわら版） |
| S | 敷根公園野外ステージ | **1** | 固定マスタ | ステージ用 PNG（**未決**） | 青空ヨガ + 音楽 TT 画像スライダー — [OUTDOOR_STAGE_SHIKINE.md](OUTDOOR_STAGE_SHIKINE.md) |
| K | わくわく広場（キッズ） | **1** | 固定マスタ | 専用ピン PNG（**未決**） | フライヤー画像 + **Supported by 下田Baby&Kids** — [KIDS_SPACE_SHIKINE.md](KIDS_SPACE_SHIKINE.md) |
| W | 屋内ワークショップ | **2** | 固定マスタ | WS 用 PNG（要デザイン） | **紹介画像** + **desc** + **`link_url` 申込リンク** — 1件目 [WORKSHOPS_SHIKINE.md](WORKSHOPS_SHIKINE.md) |
| P | 敷根プール（無料開放） | **1** | 固定マスタ | プール用 PNG（**未決**） | フライヤー画像 — [POOL_SHIKINE.md](POOL_SHIKINE.md) |
| O | 屋内事務所（自然観察） | **1** | 固定マスタ | 事務所用 PNG（**未決**） | フライヤー + **集合：敷根公園事務所** — [OFFICE_SHIKINE.md](OFFICE_SHIKINE.md) |

**合計: 店舗 4 + 固定 9 = 13 ピン**（トイレ3・ステージ1・キッズ1・WS2・プール1・事務所1）

---

## 固定マスタ用 `category` とアイコン（未決定部分は空欄）

`category` 列（店舗マスタと同じ列 J）の値が `config.js` の `FIXED_PIN_ICONS[category]` に対応します。  
**PNG ファイル名・デザインは運営が決定してから** `web/assets/fixed-pins/` に配置し、`config.js` に追記します。

| category（案・要確認） | 件数 | アイコン PNG（ファイル名） | 状態 |
|------------------------|------|---------------------------|------|
| `toilet` | 3 | `toilet.png`（リポジトリに同梱） | ファイルあり |
| `stage` | 1 | （未決） | 要デザイン |
| `kids_play` | 1 | （未決） | 要デザイン |
| `ws_indoor` | 2 | （未決） | 要デザイン |

> `category` の文字列は **スプレッドシートと `FIXED_PIN_ICONS` で完全一致**が必要です。別名にしたい場合は両方を同時に変更してください。

---

## 列マッピング（`web/config.js` の `COLS`）

gviz の `row.c[列番号]` です。**A 列 = 0** ではなく、本プロジェクトは **A 列を空けて B 列から name** のレイアウト（`NAME: 1` = B 列）。

| 列番号 | 列 | フィールド | トイレ | 飲食 | ステージ | キッズ | WS |
|--------|-----|------------|--------|------|----------|--------|-----|
| 1 | B | name | 表示名 | 店名 | ステージ名 | エリア名 | WS 名 |
| 2–3 | C–D | lat / lng | **要入力** | **要入力** | **要入力** | **要入力** | **要入力** |
| 4 | E | emoji | 任意 | 任意 | 任意 | 任意 | 任意 |
| 5–7 | F–H | image_url_1〜3 | 通常不要 | 店舗写真等 | **プログラム画像** | **紹介画像** | **紹介画像** |
| 8 | I | desc | 任意 | メニュー等 | 任意 | 任意 | **説明文（必須想定）** |
| 9 | J | category | `toilet` | 飲食カテゴリ名 | `stage` | `kids_play` | `ws_indoor` |
| 10 | K | hidden | `TRUE` で非表示 | 同左 | 同左 | 同左 | 同左 |
| 11 | L | store_id | 任意（推奨: 一意 ID） | **LINE 用必須** | 任意 | 任意 | 任意 |

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

`category` はシードで `フードエリア`（フライヤー見出しに合わせた）。変更可。

---

## 固定マスタ（トイレ×3 + ステージ×1 + キッズ×1 + WS×2）— 入力テンプレート

シート名: **未決**（決まったら `config.js` の `FIXED_MASTER_SHEET` に文字列を設定）。

| ID | 種別 | name | lat | lng | category | store_id（推奨） | F: 画像 | I: desc |
|----|------|------|-----|-----|----------|------------------|---------|---------|
| T1 | トイレ | | | | toilet | | | |
| T2 | トイレ | | | | toilet | | | |
| T3 | トイレ | | | | toilet | | | |
| S1 | ステージ | | | | stage | | プログラム画像 URL | |
| K1 | キッズ | | | | kids_play | | 紹介画像 URL | |
| W1 | WS 屋内 | | | | ws_indoor | | 紹介画像 URL | 説明文 |
| W2 | WS 屋内 | | | | ws_indoor | | 紹介画像 URL | 説明文 |

ヘッダー行の例は [sheets/固定マスタ_ヘッダー.csv](sheets/固定マスタ_ヘッダー.csv) をコピー用に用意しています。

---

## LINE かわら版（飲食 4 店のみ・準備）

現状 `config.js`: `ENABLE_LIVE_POSTS: false`（**意図的に未接続**）。

有効化する前に必要なもの:

1. 外浦と同型の `posts` シート（列定義は `index.html` 内 `POSTS_COL` または sotoura の `line-contract.js`）
2. 各飲食行の `store_id` と `posts.store_id` の一致
3. GAS Webhook / LINE チャネル（外浦の `LINE_INTEGRATION.md` 相当の手順を敷根用に流用するか要決定）
4. `ENABLE_LIVE_POSTS: true` と `LIVE_POST_POLL_INTERVAL` の設定

詳細チェックリスト: [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md)

---

## `config.js` で決める項目（すべて未決のまま運用可）

| キー | いま | 決まったら |
|------|------|------------|
| `FIXED_MASTER_SHEET` | `null` | 固定マスタのシート名 |
| `FIXED_PIN_ICONS` | 未設定 | category → PNG ファイル名 |
| `FIXED_PIN_SIZE` | デフォルト 30px | 必要なら数値 |
| `ENABLE_LIVE_POSTS` | `false` | 飲食 LINE 運用開始時に `true` |
| `MAP_IMAGE` | プレースホルダー | 総合運動公園イラスト + 四隅座標 |

---

## 確認したいこと

### 飲食 4 店 — 回答済み

- 店名「味な菓子処 しまの」: フライヤーどおり
- 座標: 後日入稿
- `store_id`: `food_makimaki` / `food_12kitchen` / `food_takahashi_toriniku` / `food_shimano`
- フライヤー下部の変更注記: アプリ非表示

### 未回答

1. **屋内 WS 2 箇所目**のフライヤー・時間・申込 URL（1 箇所目: キッズコアトレーニング — 済）
2. **トイレ 3 箇所**の呼び方は？ モーダルに説明は必要ですか？
3. **ステージ**のピン表示名。第2部 3 団体の開始時刻は？
4. **キッズエリア**のピン画像・紹介画像の用意
5. **スプレッドシート**は敷根専用ブックか、外浦と同一ブックか
6. **LINE / GAS**は外浦コピーか新規か
7. **総合運動公園**イラストと四隅座標の入手
8. レイヤー「設備・スポット」をオフ不可にする要否

---

## 関連ファイル

- [SHEET_SETUP_SHIKINE.md](SHEET_SETUP_SHIKINE.md) — シート作成手順（本ピン設計に合わせて更新）
- [sheets/店舗マスタ_ヘッダー.csv](sheets/店舗マスタ_ヘッダー.csv)
- [sheets/固定マスタ_ヘッダー.csv](sheets/固定マスタ_ヘッダー.csv)
- [../assets/fixed-pins/README.md](../assets/fixed-pins/README.md) — 配置する PNG 一覧
