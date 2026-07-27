# AGENTS.md

## Cursor Cloud specific instructions

### 何のアプリか
`web/` 配下は 100% 静的なクライアントサイド Web アプリ（「外浦マップ」）です。Mapbox GL JS（CDN）でイラスト地図（`web/map.webp`）を表示し、店舗・施設・かわら版データを Google スプレッドシートの gviz/tq JSONP から取得します。**ビルド不要・パッケージマネージャなし**（`package.json` / `requirements.txt` 等は存在しない）。Node と Python3 はプリインストール済み。

### 起動方法（開発サーバ）
`file://` では動作しません（兄弟 JS を読み込むため）。必ず `web/` をドキュメントルートに HTTP 配信します。

```bash
cd web && python3 -m http.server 8080
# → http://localhost:8080/
```

`.github/workflows/pages.yml` が本番（GitHub Pages）のデプロイ。`web/` をそのまま公開します。

### シークレット（マップ描画に必須）
マップ本体とデータ取得には以下が必要で、いずれも Git に含めません（`web/secrets.local.js` は `.gitignore` 済み）:

- `MAPBOX_PUBLIC_TOKEN`（`pk.*` の Mapbox 公開トークン）→ `web/secrets.local.js` の `MAPBOX_TOKEN`
- `GOOGLE_SHEET_ID`（公開閲覧可能な Google スプレッドシート ID）→ `SHEET_ID`
- 任意: `POSTS_SHEET`（既定 `posts`）, `EVENTS_SHEET`（既定 `event_schedule`）

これらは **環境変数（Cloud Agent の Secrets）から `web/secrets.local.js` を生成**します。生成ロジックは CI（`pages.yml`）と同一で、`scripts/gen-secrets.js` にもまとめてあります:

```bash
node scripts/gen-secrets.js
```

環境変数が未設定の場合は空トークンの `secrets.local.js` が生成され、アプリは「Mapbox トークン未設定」の案内を表示します（クラッシュはしません）。**トークン未設定だと地図キャンバスは描画されません。** コア機能（地図＋ピン）を確認するには実トークンとシート ID が必須です。

### 想定される 404（正常）
- `config.local.js` … ローカル微調整用の任意ファイル（Git 除外）。未存在で 404 になりますが `onerror` で無視されます。
- `favicon.ico` … 未配置のため 404 になりますが機能には無関係です。

### Lint / Test / Build
専用の lint / test / build ツールは存在しません（静的サイト）。品質確認はブラウザ表示とコンソールログで行います。
