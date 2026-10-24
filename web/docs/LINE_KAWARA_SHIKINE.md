# 敷根フェス — 飲食店の LINE 最新情報

フロントは **接続待ちではなく読む側 ON**（`ENABLE_LIVE_POSTS: true`）。  
GAS / LINE チャネルが無い間は `posts` に見える行が無いので、マップ上は何も出ません（例行は `isVisible=FALSE`）。

飲食 4 店の最新情報は、店舗マスタの固定座標 + `posts` シートの投稿です（外浦と同型）。画面上の呼び名は「かわら版」ではなく **最新情報** です。

---

## すでにあるもの

- 専用ブックの `posts` タブ
- 4 店の `store_id`（`food_makimaki` / `food_12kitchen` / `food_takahashi_toriniku` / `food_shimano`）
- `config.js` の `ENABLE_LIVE_POSTS` と 30 秒ポーリング

## まだ必要なもの

- LINE 公式アカウント / Messaging API
- GAS（外浦の `gas-line-webhook` をコピーするか新規）
- 店舗担当 LINE ユーザーと `store_id` の紐付け（`user_map` など）
- ブックを「リンクを知っている全員・閲覧者」

---

## posts シート（列順・0 始まり）

| 列 | フィールド | 飲食での用途 |
|----|------------|--------------|
| 0–3 | postId, userId, role, sourceType | GAS が埋める。`sourceType` は通常 `fixed` |
| 4–5 | title, text | 本文 |
| 6 | imageUrl | 写真付き投稿 |
| 7–8 | lat, lng | 座標フォールバック（通常は store_id 優先） |
| 9 | storeId | **店舗マスタの store_id と一致必須** |
| 10–11 | createdAt, isVisible | 表示制御。`FALSE` は非表示 |

---

## 動作確認（投稿 1 件を isVisible 以外で入れたあと）

1. 対象店の `store_id` に投稿を 1 件入れる
2. マップで該当ピンに新着バッジ
3. 詳細モーダル → **最新情報を見る**

ピン座標は店舗マスタの lat/lng のまま（LINE で座標は変えない想定）。

---

## まだやらないこと

- GAS / LINE トークンのリポジトリへのコミット
