# 敷根公園フェスマップ — スプレッドシートの準備

**ピン種別・件数の設計**は [PIN_INVENTORY_SHIKINE.md](PIN_INVENTORY_SHIKINE.md) を先に読んでください（総合運動公園・飲食4＋固定7）。

同一スプレッドシート内に次のシートを想定します（**シート名は運営が決定**したら `config.js` に反映）。

| シート | 用途 | config |
|--------|------|--------|
| 店舗マスタ（先頭シート可） | 飲食 4 店 | gviz デフォルト（先頭シート） |
| 固定マスタ | トイレ・ステージ・キッズ・WS | `FIXED_MASTER_SHEET` |
| `posts` | LINE かわら版（飲食） | LINE 有効化後。 [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md) |

---

## 1. 新規スプレッドシートを作る

1. Google スプレッドシートで新規作成。
2. **店舗マスタ**を 1 枚目にし、2 枚目に **固定マスタ**（名前は未決の間は仮で可）。
3. **共有**: 「リンクを知っている全員」**閲覧者**。

ヘッダー行はコピー用 CSV:

- [sheets/店舗マスタ_ヘッダー.csv](sheets/店舗マスタ_ヘッダー.csv)
- [sheets/固定マスタ_ヘッダー.csv](sheets/固定マスタ_ヘッダー.csv)

---

## 2. 列レイアウト（`web/config.js` の `COLS`）

**B 列 = name**（A 列 `_reserved` は空で可）。列番号は gviz の `row.c[n]` に対応。

| 列 | ヘッダー例 | 用途 |
|----|------------|------|
| A | _reserved | 空で可 |
| B | name | 表示名 |
| C–D | lat, lng | 緯度・経度（WGS84） |
| E | emoji | ピン絵文字（任意） |
| F–H | image_url … | モーダル画像 1〜3（HTTPS）。マーカーは F を優先 |
| I | desc | 説明（WS はここに長文） |
| J | category | フィルタ用 / 固定ピンは `FIXED_PIN_ICONS` のキー |
| K | hidden | **`FALSE` の行は非表示**（外浦同型。`TRUE` または空は表示） |
| L | store_id | 一意 ID（飲食は LINE 必須） |
| M 以降 | status, news, … | 任意 |

座標は **総合運動公園イラスト**の `MAP_IMAGE.coordinates` が決まってから配置するのが確実です（未決の間は行を空にしておく）。

---

## 3. スプレッドシート ID の登録

URL `https://docs.google.com/spreadsheets/d/【ここがID】/edit` の ID を控えます。

- **ローカル**: `web/secrets.local.js` の `SHEET_ID`
- **本番**: GitHub Actions secret `GOOGLE_SHEET_ID`

固定マスタのシート名が決まったら `config.js` の `FIXED_MASTER_SHEET` に設定（未決の間は `null` のまま）。

---

## 4. LINE・posts（飲食のみ・任意タイミング）

`posts` と GAS は **LINE 運用開始時**に追加。現状は `ENABLE_LIVE_POSTS: false`。

手順: [LINE_KAWARA_SHIKINE.md](LINE_KAWARA_SHIKINE.md)

---

## 5. 使わないもの（敷根フェス）

- `event_schedule`（イベント自動表示を使う場合のみ外浦設定を参照）
- `固定マスタ` を使わない運用にはしない（トイレ・ステージ等は固定マスタ想定）
