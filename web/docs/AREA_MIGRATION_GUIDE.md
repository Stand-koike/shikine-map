# 新エリアマップの立ち上げ手順

既存のデジタルマップ（外浦マップ / `sotoura-map`）と**同じ機能**で別エリアを公開するためのチェックリストです。  
アプリ本体は `web/index.html` 1 本に集約されており、エリア差分は主に **`web/config.js`・地図画像・Google スプレッドシート・GitHub Secrets** で切り替えます。

---

## 全体の流れ（推奨順）

| 段階 | やること | 成果物 |
|------|----------|--------|
| 1 | リポジトリを用意 | 新しい GitHub リポ（または運用ポリシーに沿ったブランチ） |
| 2 | データ基盤 | 店舗用スプレッドシート（列レイアウトは外浦と同型） |
| 3 | 地図素材 | イラスト＋位置合わせ（`MAP_IMAGE` 用の座標） |
| 4 | 設定 | `config.js`・`map.webp`・任意で `line-contract.js` |
| 5 | 公開 | GitHub Pages + Repository secrets + Mapbox URL 制限 |
| 6 | 任意 | LINE かわら版（GAS・シート `posts` 等） |

**リポジトリは早めに用意するのがおすすめです。**  
GitHub Pages の URL（`https://<user>.github.io/<repo>/`）が決まると、Mapbox のトークン URL 制限や GA4 の登録を並行して進められます。

---

## 1. リポジトリの用意

### 方式 A: リポジトリを分ける（推奨・外浦と同じ運用）

1. GitHub で **このリポジトリをテンプレートとして複製**するか、`Stand-koike/sotoura-map` を **Duplicate / Use this template** で新規作成する。  
   名前例: `shimoda-map` / `ooarai-map` など（公開 URL のパスになる）。
2. ローカルでクローンし、`main` をデプロイ対象にする（`.github/workflows/pages.yml` はそのまま使える）。
3. 不要なエリア固有の文言・画像だけ差し替える（コードは極力そのまま）。

### 方式 B: 同一リポジトリのブランチでエリアを分ける

- `main` = エリア A、`area/xxx` = エリア B のように **ブランチごとに `config.js` と `map.webp` を差し替え**、Pages のデプロイブランチを切り替える。  
- 運用・レビューが複雑になりやすいため、**別エリアを本番運用するなら方式 A** を推奨。

### このリポジトリを複製した直後にやること

```bash
git clone https://github.com/<org>/<new-repo>.git
cd <new-repo>
cp web/config.example.js web/config.js   # 未コピーなら。既に config.js がある場合は編集のみ
cp web/secrets.example.js web/secrets.local.js  # ローカル確認用（Git に含めない）
```

---

## 2. Google スプレッドシート

1. 外浦用シートを **コピー**するか、同じ列定義で新規作成する。  
   列の意味は `web/config.js` の `COLS` コメントおよび `web/line-contract.js` を参照。
2. 最低限必要なシート例:
   - **店舗データ**（メインの 1 シート。gviz で読み込み）
   - **`固定マスタ`**（トイレ・駐車場など。`FIXED_MASTER_SHEET`）
   - LINE かわら版を使う場合: `posts` / `user_map` / `bot_sessions` 等（`line-contract.js` の `SHEETS`）
3. シートを **「リンクを知っている全員が閲覧可」** にし、スプレッドシート ID を控える。
4. サービスアカウント方式ではなく、現行フロントは **公開 gviz** 前提です。列に秘密情報を入れないこと。

---

## 3. イラスト地図と位置合わせ

1. エリアのイラストを用意し、本番用は **`web/map.webp`**（または `config.js` の `MAP_IMAGE.url` で指定したファイル）に配置。  
   - 大きな PNG はリポジトリ直下の `web/*.png` は `.gitignore` 対象のため、**WebP 化して `web/` に置く**運用が安全。
2. QGIS 等で **4 隅の WGS84 座標**（NW / NE / SE / SW の順、`[lng, lat]`）を求め、`MAP_IMAGE.coordinates` に設定。  
   - 外浦の実値は `web/config.js` の `MAP_IMAGE` ブロックが参考になる。
3. 表示の微調整:
   - `center` / `initCenter` / `initZoom` / `minZoom` / `maxBounds` / `bearing` / `pitch`
   - スマホ用: `initZoomMobile` / `initCenterMobile` / `minZoomMobile` など
4. 地図を差し替えたら **`cacheVersion` を日付入りで更新**（ブラウザキャッシュ回避）。

ローカルでピン位置を合わせる場合は `web/config.local.js`（Git 除外）で `latOffset` / `lngOffset` を試せます。

---

## 4. `config.js` の編集

`web/config.example.js` をベースに、最低限次を変更します。

| キー | 内容 |
|------|------|
| `APP_TITLE` | ブラウザタイトル・UI 名 |
| `GA_MEASUREMENT_ID` | エリア専用 GA4（空でも可） |
| `MAP_IMAGE.*` | 画像 URL・座標・ズーム・境界 |
| `FIXED_MASTER_SHEET` / `FIXED_PIN_ICONS` | 固定施設（不要ならシート空でも可） |
| `TRANSLATIONS` | 文言の差し替え |
| `CLUSTER` | クラスタの有無・半径（エリア密度に合わせて調整） |

トークンとシート ID は **コミットしない**。本番は Secrets、ローカルは `secrets.local.js`。

```html
<!-- index.html 読み込み順（変更不要） -->
secrets.local.js → line-contract.js → config.js → config.local.js（任意）
```

LINE 連携のシート名や列を変える場合は **`web/line-contract.js`** もエリア用に編集し、GAS 側と揃えます（`LINE_INTEGRATION.md` は非公開ドキュメントがある場合はそちらを参照）。

---

## 5. GitHub Pages と Secrets

1. リポジトリ **Settings → Pages → Build and deployment: GitHub Actions**（workflow 済み）。
2. **Settings → Secrets and variables → Actions** に登録:

| Secret 名 | 内容 |
|-----------|------|
| `MAPBOX_PUBLIC_TOKEN` | Mapbox 公開トークン `pk.*` |
| `GOOGLE_SHEET_ID` | スプレッドシート ID |
| `POSTS_SHEET` | 任意（既定 `posts`） |
| `EVENTS_SHEET` | 任意（祭スケジュールを使う場合） |

3. `main` に push すると `.github/workflows/pages.yml` が `web/secrets.local.js` を生成してデプロイする。

---

## 6. Mapbox・セキュリティ

- [Mapbox](https://account.mapbox.com/) でトークンに **URL 制限**（本番 Pages URL・ステージング URL）を付ける。  
  詳細はリポジトリ直下 [SECURITY.md](../../SECURITY.md)。

---

## 7. 動作確認

1. ローカル: `web/` を静的サーバで開く（例: `npx --yes serve web`）。  
   `secrets.local.js` にトークンと `SHEET_ID` を設定。
2. ピンがイラストと一致するか、フィルタ・言語切替・固定マスタレイヤーを確認。
3. LINE かわら版を使う場合は投稿フローと WordPress 埋め込み（[WORDPRESS_INTEGRATION.md](./WORDPRESS_INTEGRATION.md)）を別途確認。

---

## よくある判断

| 質問 | 答え |
|------|------|
| コードをフォークごと複製すべき？ | **設定と素材の差し替えで足りる**ことが多い。機能追加は共通リポに戻してから各エリアへ取り込むと保守が楽。 |
| `index.html` を触る必要は？ | 通常は **不要**（`config.js` とデータで完結）。 |
| 下田と外浦の関係は？ | 歴史的に別リポ／別ブランチ運用。新エリアも **1 エリア 1 リポ** が分かりやすい。 |

---

## 次に共有すると進めやすい情報

新エリア用リポジトリ名（またはブランチ名）、エリアの表示名、スプレッドシートの有無、イラスト地図の準備状況（座標の有無）を教えてもらえれば、`config.js` の初期値までこちらでコミット可能です。
