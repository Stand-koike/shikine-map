# 敷根公園フェス — タイムテーブル（event_schedule シート）

ボトムバーの **タイムテーブル** ボタンと、屋外ステージピンタップ時の画像で共通のデータ源です。

- **一覧 UI:** `ScheduleModule` が同一スプレッドシートの `event_schedule` シートを gviz 読み込み
- **ステージピン:** 固定マスタ 1 行の `image_url` にタイムテーブル画像（モーダル表示）

シート名は `config.js` の `EVENTS_SHEET`（既定: `event_schedule`）。Secrets の `EVENTS_SHEET` でも上書き可。

---

## 列定義（A 列 `_reserved`、B 列からデータ）

| 列 | ヘッダー | 内容 |
|----|----------|------|
| B | start_time | 開始 `HH:MM`（未記載可・第2部以降の出演順のみなど） |
| C | end_time | 終了 `HH:MM`（任意） |
| D | title | 部・プログラム名（例: 第1部 参加型ステージ） |
| E | performer | 出演者・団体名 |
| F | description | 補足（キャッチコピー等） |
| G | venue | 会場（例: SHIKINE MUSIC STAGE、敷根公園・フードエリア） |
| H | event_date | `YYYY-MM-DD`（2026-11-03） |
| I | sort_order | 同日の並び順（数値小さいほど上） |
| J | hidden | `FALSE` で非表示（店舗マスタ同型） |
| K | image_url | 任意（`assets/...` または HTTPS） |
| L | store_id | 対応ピン。カンマ区切りで複数可。リストタップで強調（フードエリアは飲食4店） |

ヘッダー CSV: [sheets/event_schedule_ヘッダー.csv](sheets/event_schedule_ヘッダー.csv)  
**2026/11/3 分の初期データ:** [sheets/event_schedule_2026-11-03_seed.csv](sheets/event_schedule_2026-11-03_seed.csv)

---

## 屋外ステージピン（固定マスタ）

詳細: [OUTDOOR_STAGE_SHIKINE.md](OUTDOOR_STAGE_SHIKINE.md)

| 項目 | 値 |
|------|-----|
| name | 敷根公園野外ステージ |
| `store_id` | `stage_outdoor` |
| 画像 1 | `assets/stage/aozora-yoga.webp`（青空ヨガ） |
| 画像 2 | `assets/stage/shikine-music-stage-timetable.webp`（音楽ステージ） |

シード: [sheets/fixed_master_outdoor_stage_seed.csv](sheets/fixed_master_outdoor_stage_seed.csv)

---

## データ出典

| 行 | 出典 |
|----|------|
| フードエリア 10:00–16:00 | フードエリアフライヤー |
| 青空ヨガ 10:00–11:00 | 青空ヨガフライヤー |
| 音楽ステージ各出演 | SHIKINE MUSIC STAGE タイムテーブル画像 |

自然観察体験会 9:30–10:30（敷根公園事務所前集合）、敷根プール 10:00–16:00、わくわく広場 10:00–16:00、WS（キッズコア 12:15–13:00）はシードに反映済み。  
フードエリア行の `store_id` は飲食 4 店（タップでまとめて強調）。2 件目 WS とトイレはタイムテーブル未掲載（ピン行のみ）。
