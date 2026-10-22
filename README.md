# 敷根公園フェスマップ

Google スプレッドシートの出店・施設データを、イラスト地図上に表示する Web アプリです（外浦マップと同じフロントエンド）。

**公開 URL（予定）:** `https://stand-koike.github.io/shikine-map/`

---

## 主な機能

- イラスト地図上のピン表示
- カテゴリ・タグでの絞り込み
- 日本語 / 英語の切り替え

LINE かわら版・WordPress 連携は **使いません**（設定で無効化済み）。

---

## まだ用意が必要なもの

| 項目 | 手順 |
|------|------|
| スプレッドシート | [web/docs/SHEET_SETUP_SHIKINE.md](web/docs/SHEET_SETUP_SHIKINE.md) |
| イラスト地図 | `web/map.webp` に差し替え、`config.js` の `MAP_IMAGE.coordinates` を更新 |
| 本番公開 | [モバイル向けチェックリスト](web/docs/MOBILE_LAUNCH_CHECKLIST.md)（Pages・Secrets） |

地図・シートが無い状態では、プレースホルダー地図と仮座標（敷根公園付近）で UI のみ確認できます。

---

## ローカル確認

```bash
cp web/secrets.example.js web/secrets.local.js
# MAPBOX_TOKEN と SHEET_ID を記入（シート未作成の場合は SHEET_ID 未設定のまま UI 確認のみ）
npx --yes serve web
```

---

## 関連ドキュメント

| 資料 | 内容 |
|------|------|
| [web/README.md](web/README.md) | ファイル構成 |
| [web/docs/SHEET_SETUP_SHIKINE.md](web/docs/SHEET_SETUP_SHIKINE.md) | スプレッドシートの作り方 |
| [web/docs/REPO_SETUP_SHIKINE.md](web/docs/REPO_SETUP_SHIKINE.md) | **shikine-map** リポジトリの作成（完了済みの場合は参照用） |
| [web/docs/AREA_MIGRATION_GUIDE.md](web/docs/AREA_MIGRATION_GUIDE.md) | **新エリア**を同機能で立ち上げる手順 |
| [web/docs/FEATURE_BACKLOG.md](web/docs/FEATURE_BACKLOG.md) | **やりたい機能・UI** の整理（チャット追記可） |
| [web/docs/MOBILE_LAUNCH_CHECKLIST.md](web/docs/MOBILE_LAUNCH_CHECKLIST.md) | スマホから進める公開手順 |
| [SECURITY.md](SECURITY.md) | 秘密情報の扱い |

---

## お問い合わせ

不具合や表示の問題は、運営担当までご連絡ください。
