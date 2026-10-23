# 敷根公園フェス — フードエリア出店者（フライヤー読取）

出典: 運営提供フライヤー「敷根公園フェス フードエリア」（`web/assets/vendors/flyer-food-area-2026.jpg`）。

**運営確認済み（2026-10）**

| 項目 | 内容 |
|------|------|
| 店名「味な菓子処 しまの」 | フライヤー表記のまま |
| 座標 lat/lng | **後日入稿**（シードは空欄） |
| フライヤー下部の変更注記 | **アプリには表示しない** |
| LINE `store_id` | 下表（`posts.store_id` と一致させる） |

---

## イベント（フライヤー記載）

| 項目 | 内容 |
|------|------|
| 名称 | 敷根公園フェス フードエリア |
| 日時 | 2026年11月3日（火・祝）10:00〜16:00 |
| 入場 | 無料 |
| 問い合わせ | 下田市敷根公園屋内温水プール TEL 0558-23-6333 |

---

## 出店 4 店

| store_id | name | メニュー（要約） | 画像 |
|----------|------|------------------|------|
| `food_makimaki` | 伊豆下田食堂まきまき | 肉巻きおにぎり、焼きそば、たこ焼き、フライドチキン…ほか | `assets/vendors/makimaki.webp` |
| `food_12kitchen` | 12 KITCHEN SHIMODA | ホットドッグ、ステーキサンド、ポテト、タピオカドリンク…ほか | `assets/vendors/12kitchen-shimoda.webp` |
| `food_takahashi_toriniku` | 高橋鳥肉店 | 焼きとり、もも串、かわ串、つくね、チキンテール…ほか | `assets/vendors/takahashi-toriniku.webp` |
| `food_shimano` | 味な菓子処 しまの | 下田さく咲く、みたらしだんご、まいたけおこわ | `assets/vendors/shimano-kashi.webp` |

`store_id` は `food_` プレフィックスで固定施設 ID と衝突しないようにしています。

---

## スプレッドシートへの入稿

1. [sheets/店舗マスタ_ヘッダー.csv](sheets/店舗マスタ_ヘッダー.csv) を 1 行目に貼る
2. [sheets/food_vendors_seed.csv](sheets/food_vendors_seed.csv) を 2〜5 行に貼る
3. 列 F は `assets/vendors/….webp`（GitHub Pages 同梱）

ディープリンク例: `?spot=food_makimaki`

---

## LINE かわら版

[LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md) — 有効化後、上記 `store_id` を `posts` シートに使用。
