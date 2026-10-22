# モバイルから進められる公開チェックリスト

PC がなくても、**GitHub アプリ／Safari の GitHub** と **Google スプレッドシートアプリ** で大部分まで進められます。  
地図イラストの差し替えや QGIS は PC 向きですが、**シート作成・Secrets・Pages 有効化**はモバイルで可能です。

---

## 1. GitHub Pages を有効化（1 回だけ）

1. リポジトリ `Stand-koike/shikine-map` を開く
2. **Settings** → **Pages**
3. **Build and deployment** → Source: **GitHub Actions**
4. `main` にマージされると [Deploy GitHub Pages](https://github.com/Stand-koike/shikine-map/actions/workflows/pages.yml) が走ります（Secrets 未設定でもビルドは動きますが、マップはトークン／シート未設定で制限あり）

公開 URL（予定）: `https://stand-koike.github.io/shikine-map/`

---

## 2. Repository secrets（GitHub アプリでも可）

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Name | 内容 |
|------|------|
| `MAPBOX_PUBLIC_TOKEN` | Mapbox の公開トークン（[Mapbox アカウント](https://account.mapbox.com/)） |
| `GOOGLE_SHEET_ID` | 店舗シートの ID（下記） |

任意: `POSTS_SHEET` / `EVENTS_SHEET`（敷根では LINE ライブ未使用なら不要）

Secret を追加・変更したら、**Actions** タブで **Deploy GitHub Pages** → **Run workflow** で再デプロイ。

---

## 3. Mapbox トークンの URL 制限

Mapbox のトークン設定で **URL restrictions** に追加:

```
https://stand-koike.github.io/shikine-map/*
```

ローカル確認用に `http://localhost:*` を足す場合は PC 作業時で OK。

---

## 4. Google スプレッドシート（アプリで可）

手順: [SHEET_SETUP_SHIKINE.md](SHEET_SETUP_SHIKINE.md)

1. 新規スプレッドシート → ヘッダー・テスト 1 行
2. 共有: **リンクを知っている全員・閲覧者**
3. URL から ID をコピー → GitHub Secret `GOOGLE_SHEET_ID` に貼る
4. Actions を再実行

---

## 5. PR のマージ（モバイル）

- ドキュメント・設定の PR は GitHub アプリから **Review → Merge** で OK
- マージ後、Pages ワークフローが自動実行されます

---

## PC があった方がよいもの

| 項目 | 理由 |
|------|------|
| `web/map.webp` の差し替え | ファイルサイズ・WebP 変換 |
| `config.js` の `MAP_IMAGE.coordinates` | QGIS 等で四隅座標 |
| ピン位置の微調整 | `config.local.js` + ローカル `serve` |

イラストと座標が揃うまで、**プレースホルダー地図＋仮座標**で UI 確認は可能です。

---

## 困ったとき

- Actions が赤い → ログの `build` ジョブを開く（Secret 名の typo が多い）
- マップが真っ白 → `MAPBOX_PUBLIC_TOKEN` と URL 制限
- ピンが出ない → シート共有・`GOOGLE_SHEET_ID`・列順（[SHEET_SETUP](SHEET_SETUP_SHIKINE.md)）
