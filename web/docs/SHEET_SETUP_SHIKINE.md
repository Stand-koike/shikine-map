# 敷根公園フェスマップ — スプレッドシートの準備

フェス用の **店舗・ブース一覧** を 1 シートで管理します。列レイアウトは外浦マップと同じです（`web/config.js` の `COLS`）。

---

## 1. 新規スプレッドシートを作る

1. Google スプレッドシートで新規作成。
2. 1 枚目のシート名は **`Sheet1`** のままでも可（gviz は **gid=0 の先頭シート** を読みます）。運用で名前を変える場合は、公開 URL の `gid` を確認してください。
3. **共有**: 「リンクを知っている全員」**閲覧者**。

---

## 2. 1 行目（ヘッダー）

次の列を **A 列から** 入れます（英語名はツール用。日本語ラベルでも可ですが、列の**順序**が重要です）。

| 列 | ヘッダー例 | 用途 |
|----|------------|------|
| A | _reserved | 空で可 |
| B | name | ブース名 |
| C | lat | 緯度（WGS84） |
| D | lng | 経度 |
| E | emoji | ピン絵文字（任意） |
| F–H | image_url … | 画像 URL（任意・枚数はデータに合わせて可変） |
| I | desc | 説明 |
| J | category | カテゴリ（フィルタ用） |
| K | hidden | `TRUE` で非表示 |
| L | store_id | 一意 ID（ディープリンク `?spot=` 用） |
| M | reserved | 空で可 |
| N | status | 営業状況テキスト（任意） |
| O–P | news, url | 補足・リンク（任意） |
| Q | coupon | クーポン URL（任意） |
| R–U | address, phone, tags, hours | 任意 |
| V 以降 | name_en, desc_en, … | 英語（任意） |

最小のテスト行（2 行目）例:

| name | lat | lng | emoji | category | store_id |
|------|-----|-----|-------|----------|----------|
| テストブース | 34.6820 | 138.9308 | 🎪 | グルメ | booth_test |

`hidden` 列に `TRUE` を入れた行は表示されません。

---

## 3. スプレッドシート ID の登録

URL `https://docs.google.com/spreadsheets/d/【ここがID】/edit` の ID を控えます。

- **ローカル**: `web/secrets.local.js` の `SHEET_ID`
- **本番**: GitHub リポジトリの Actions secret `GOOGLE_SHEET_ID`

---

## 4. 使わないシート

次は **作成不要** です。

- `posts`（LINE かわら版）
- `固定マスタ`（トイレ・駐車場レイヤー）
- `event_schedule`

`config.js` で `ENABLE_LIVE_POSTS: false` / `FIXED_MASTER_SHEET: null` になっています。

---

## 5. 座標の付け方

イラスト地図ができるまで、緯度経度は [Google Maps](https://maps.google.com/) などで敷根公園内の位置をクリックして取得できます。イラストと位置がずれたら、地図の `MAP_IMAGE.coordinates` 調整後にピンを再配置してください。
