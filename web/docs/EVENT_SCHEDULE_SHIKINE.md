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

ヘッダー CSV: [sheets/event_schedule_ヘッダー.csv](sheets/event_schedule_ヘッダー.csv)  
**2026/11/3 分の初期データ:** [sheets/event_schedule_2026-11-03_seed.csv](sheets/event_schedule_2026-11-03_seed.csv)

---

## 屋外ステージピン（固定マスタ）

| 項目 | 値（座標は未設定） |
|------|-------------------|
| name | SHIKINE MUSIC STAGE（フライヤー表記） |
| category | `stage`（`FIXED_PIN_ICONS.stage` は PNG 決定後） |
| image_url | `assets/stage/shikine-music-stage-timetable.webp` |
| desc | 2026.11.3 TUE — 敷根公園フェス 2026 |

1 行シード: [sheets/fixed_master_music_stage_seed.csv](sheets/fixed_master_music_stage_seed.csv)

---

## データ出典

| 行 | 出典 |
|----|------|
| フードエリア 10:00–16:00 | フードエリアフライヤー |
| 音楽ステージ各出演 | SHIKINE MUSIC STAGE タイムテーブル画像 |

WS・キッズ・トイレなどの時間は **未掲載のためシート未入稿**。決まり次第 `event_schedule` に行追加してください。
