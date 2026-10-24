# 敷根フェス — 屋内ワークショップ

屋内 WS ピンは **固定マスタ**（`category: ws_indoor`）。タップで **紹介画像** + **説明（desc）** + **申込リンク（link_url）**。

---

## 1. キッズコアトレーニング（1 箇所目・データあり）

| 項目 | 内容 |
|------|------|
| 名称 | キッズコアトレーニング |
| 日時 | 2026年11月3日（火）12:15〜13:00 |
| 場所 | トレーニングルーム（屋内） |
| 対象 | 小学生 |
| 申込 | QR から先着 10 名（参加費無料） |
| 問い合わせ | 敷根公園屋内温水プール TEL 0558-23-6333 |
| 紹介画像 | `assets/workshops/kids-core-training.webp` |
| `store_id` | `ws_kids_core` |
| **`link_url`（列 P）** | `https://logoform.jp/f/srRs9`（運営提供） |

マップ詳細モーダルに **「参加申込はこちら」** が表示され、タップで上記フォームを開きます。

固定マスタ 1 行シード: [sheets/fixed_master_ws_kids_core_seed.csv](sheets/fixed_master_ws_kids_core_seed.csv)

---

## 2. 屋内ワークショップ（2 箇所目）

固定マスタにプレースホルダー行あり（`store_id`: `ws_indoor_2`、名称「屋内ワークショップ（2）」、desc は後入れ）。マップアイコンは 1 件目と同じ `ws_indoor.png`。フライヤーが来たら name / desc / 画像 / 申込 URL を上書きし、必要なら `event_schedule` に行追加。

---

## タイムテーブル

[event_schedule_2026-11-03_seed.csv](sheets/event_schedule_2026-11-03_seed.csv) に 12:15–13:00 の行を追加済み。  
ボトムバー「タイムテーブル」で一覧表示（[EVENT_SCHEDULE_SHIKINE.md](EVENT_SCHEDULE_SHIKINE.md)）。
