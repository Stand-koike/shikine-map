# 敷根フェス — 飲食店 LINE かわら版（実装準備のみ）

**現状: 未接続**（`config.js` の `ENABLE_LIVE_POSTS: false`）。  
飲食 4 店の「LINE で更新」は、店舗マスタの固定座標 + `posts` シートの投稿で実現します（外浦マップと同型）。

---

## 前提（決定待ち）

- 敷根用スプレッドシート ID（店舗マスタ + `posts` 等）
- LINE 公式アカウント / Messaging API チャネル
- GAS デプロイ（外浦の `gas-line-webhook` をコピーするか新規か）
- 各飲食店の `store_id` と店舗担当 LINE ユーザーの紐付け（`user_map` シート）

---

## フロントで有効化する手順（データ・GAS 準備後）

1. `web/line-contract.js` を外浦版の契約定義に差し替え（現状はスタブ）。参照:  
   `https://github.com/Stand-koike/sotoura-map/blob/main/web/line-contract.js`
2. `config.js` で次を設定:
   - `ENABLE_LIVE_POSTS: true`
   - `LIVE_POST_POLL_INTERVAL: 30000`（例・間隔は要望があれば変更）
   - `POSTS_SHEET: 'posts'`（シート名が違う場合は secrets / config で上書き）
3. 店舗マスタ 4 行に **`store_id` を必ず入力**（`posts` の紐付けキー）
4. GitHub Secret `GOOGLE_SHEET_ID` が posts を含むブックを指していることを確認

---

## posts シート（列順・0 始まり）

| 列 | フィールド | 飲食での用途 |
|----|------------|--------------|
| 0–3 | postId, userId, role, sourceType | GAS が埋める。`sourceType` は通常 `fixed` |
| 4–5 | title, text | かわら版テキスト |
| 6 | imageUrl | 写真付き投稿 |
| 7–8 | lat, lng | 座標フォールバック（通常は store_id 優先） |
| 9 | storeId | **店舗マスタの store_id と一致必須** |
| 10–11 | createdAt, isVisible | 表示制御 |

---

## 動作確認（有効化後）

1. 対象店の `store_id` に投稿を 1 件入れる
2. マップで該当ピンに **新着バッジ**が付く
3. 詳細モーダル → **かわら版を見る**

ピン座標は店舗マスタの lat/lng のまま（LINE で座標は変えない想定）。座標も変える運用なら posts の lat/lng を使うフォールバックあり。

### 敷根フード 4 店の store_id（運営確認済み）

| store_id | 店名 |
|----------|------|
| `food_makimaki` | 伊豆下田食堂まきまき |
| `food_12kitchen` | 12 KITCHEN SHIMODA |
| `food_takahashi_toriniku` | 高橋鳥肉店 |
| `food_shimano` | 味な菓子処 しまの |

---

## まだやらないこと（明示）

- GAS / LINE トークンのリポジトリへのコミット
- `ENABLE_LIVE_POSTS: true` の先行切り替え（運営合意前）

店舗・ID の一覧は [PIN_INVENTORY_SHIKINE.md](PIN_INVENTORY_SHIKINE.md) に追記します。
