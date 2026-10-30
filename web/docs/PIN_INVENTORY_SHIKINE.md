# 敷根フェスマップ — ピン種別・データ項目（総合運動公園）

イラスト地図の対象エリア: **総合運動公園**（四隅は QGIS `park_4326.tif` → `MAP_IMAGE.coordinates`）。ピン座標は [sheets/point_official_2026-10-24.csv](sheets/point_official_2026-10-24.csv) および [fixed_master_ALL_seed.csv](sheets/fixed_master_ALL_seed.csv)。

| レイヤー | データ源 | マップ上の見え方 |
|----------|----------|------------------|
| **店舗ピン** | スプレッドシート先頭シート（店舗マスタ） | 丸ピン（絵文字 or 画像） |
| **設備・スポット** | 同一ブック内の **固定マスタ** シート | `FIXED_PIN_ICONS` / `FIXED_PIN_CATEGORY_BY_STORE_ID` + オーバーレイ SVG |

タップ時の詳細は **共通モーダル**（画像スライダー、説明、申込リンク）。飲食は **LINE 最新情報**（`posts` シート）。トイレはモーダルなし。

---

## ピン一覧（件数）

| # | 種別 | 件数 | レイヤー | タップ時 |
|---|------|------|----------|----------|
| T | トイレ | **3** | 固定マスタ | アイコンのみ |
| F | 飲食 | **4** | 店舗マスタ | 店舗情報 + LINE |
| S | 敷根公園野外ステージ | **1** | 固定マスタ | 青空ヨガ + 音楽 TT — [OUTDOOR_STAGE_SHIKINE.md](OUTDOOR_STAGE_SHIKINE.md) |
| K | わくわく広場 | **1** | 固定マスタ | [KIDS_SPACE_SHIKINE.md](KIDS_SPACE_SHIKINE.md) |
| K2 | みんなでサッカー！！ | **1** | 固定マスタ | テキストモーダル（`FIXED_MODAL_BY_STORE_ID`） |
| W | 屋内ワークショップ | **2** | 固定マスタ | キッズコア（申込）／事務所内 WS（2 画像） — [WORKSHOPS_SHIKINE.md](WORKSHOPS_SHIKINE.md) |
| P | 敷根プール | **1** | 固定マスタ | [POOL_SHIKINE.md](POOL_SHIKINE.md) |
| O | 自然観察（事務所） | **1** | 固定マスタ | [OFFICE_SHIKINE.md](OFFICE_SHIKINE.md) |
| L | 移動図書館 | **1** | 固定マスタ | 専用チラシ画像 |

**合計: 店舗 4 + 固定 11 = 15 ピン**

---

## 固定マスタ用 `category` とアイコン

| category | 件数 | ベース PNG / 備考 |
|----------|------|-------------------|
| `toilet` | 3 | `toilet.png` |
| `stage` | 1 | `stage.png` |
| `kids_play` | 2 | `kids_play.png`（わくわく・サッカー。サッカーは ⚽ オーバーレイ） |
| `ws_indoor` | 2 | `ws_indoor.png` + SVG オーバーレイ |
| `pool` | 1 | `pool.png` |
| `park_office` | 1 | `park_office.png` |
| `library` | 1 | `park_office.png` ベース + 本 SVG（`library_mobile`） |

`store_id` ごとの上書き: `config.js` の `FIXED_PIN_CATEGORY_BY_STORE_ID` / `FIXED_PIN_OVERLAY_BY_STORE_ID`。

---

## 固定マスタ `store_id` 一覧

| store_id | name | category |
|----------|------|----------|
| toilet_1〜3 | トイレ1〜3 | toilet |
| stage_outdoor | 敷根公園野外ステージ | stage |
| kids_wakuwaku | わくわく広場 | kids_play |
| kids_ground | みんなでサッカー！！ | kids_play |
| ws_kids_core | キッズコアトレーニング | ws_indoor |
| ws_indoor_2 | 屋内ワークショップ（事務所内） | ws_indoor |
| pool_shikine | 敷根プール（無料開放） | pool |
| office_nature_walk | 自然観察体験会（敷根公園事務所） | park_office |
| library_mobile | 移動図書館 | library |

一括シード: [sheets/fixed_master_ALL_seed.csv](sheets/fixed_master_ALL_seed.csv)

---

## `config.js`（抜粋）

| キー | 内容 |
|------|------|
| `FIXED_MASTER_SHEET` | `固定マスタ` |
| `PARK_INFO` | 公園ボタン（フェス全体案内） |
| `EVENT_SCHEDULE_FALLBACK` | サッカー行のシート未投入時補完 |
| `PLAY_TAB_STORE_IDS` | 遊ぶタブのフライヤー順 |
| `ENABLE_LIVE_POSTS` | `true` |

一覧・同期状態: [DATA_STATUS_SHIKINE.md](DATA_STATUS_SHIKINE.md)
