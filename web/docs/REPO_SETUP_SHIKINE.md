# shikine-map リポジトリの作成手順

> **2026-10 更新:** リポジトリ `Stand-koike/shikine-map` は作成済みです。  
> 以降は [MOBILE_LAUNCH_CHECKLIST.md](MOBILE_LAUNCH_CHECKLIST.md)（Pages・Secrets）と [SHEET_SETUP_SHIKINE.md](SHEET_SETUP_SHIKINE.md) を進めてください。

以下は、当時ブランチから新規リポジトリへ push した手順の**記録**です。

---

## 方法 A: 空リポジトリに push（推奨）

1. GitHub で **New repository**
   - Name: `shikine-map`
   - Public
   - README / .gitignore は **追加しない**（空で作成）
2. ローカル（または Cloud Agent 済みブランチ）から:

```bash
git clone https://github.com/Stand-koike/sotoura-map.git
cd sotoura-map
git fetch origin cursor/shikine-map-init-a646
git checkout cursor/shikine-map-init-a646

git remote add shikine https://github.com/Stand-koike/shikine-map.git
git push -u shikine HEAD:main
```

3. **Settings → Pages → Build and deployment: GitHub Actions**
4. **Settings → Secrets → Actions** に追加:
   - `MAPBOX_PUBLIC_TOKEN`
   - `GOOGLE_SHEET_ID`（専用ブック `1dmcJ12JuBWJPLxe43Ut4jVOaFpCqqpAgCRGvnwtxmRk`。共有は「リンクを知っている全員・閲覧者」）
5. Mapbox トークンに URL 制限:  
   `https://stand-koike.github.io/shikine-map/*`

---

## 方法 B: GitHub の「Import repository」

1. `sotoura-map` を Import 先として `shikine-map` という名前でインポート
2. インポート後、上記ブランチを `main` にマージまたは `main` をブランチ内容で置き換え

---

## このリポジトリ（sotoura-map）との関係

- **外浦マップ** = `sotoura-map` の `main`
- **敷根公園フェス** = 別リポ `shikine-map`（機能は同じフロント、設定のみフェス用）

機能改善はどちらか一方で直し、必要ならもう一方に cherry-pick する運用が分かりやすいです。
