# WordPress かわら版 連携

LINE で投稿されたかわら版を、WordPress ページに表示するための手順です。

---

## 概要

| 項目 | 内容 |
|------|------|
| 表示データ | かわら版（投稿タイトル・本文・画像・店舗名） |
| 取得方法 | GAS Web アプリ（読み取り専用） |
| ウィジェット | `wordpress-kawara-widget.js` |

---

## 埋め込み手順

### 1. GAS Web アプリ URL を用意

運営担当から GAS のデプロイ URL（`/exec` で終わるもの）を受け取ります。

### 2. WordPress に貼り付け

カスタム HTML ブロックに以下を貼り付け、`gasUrl` を実際の URL に置き換えます。

```html
<div id="sotoura-kawara-root"></div>
<script>
  window.SOTOURA_KAWARA_CONFIG = {
    gasUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    storeId: '',
    maxItems: 12,
    pollIntervalMs: 60000
  };
</script>
<script src="https://stand-koike.github.io/sotoura-map/wordpress-kawara-widget.js"></script>
```

### 3. 設定項目

| キー | 説明 |
|------|------|
| `gasUrl` | GAS Web アプリ URL（必須） |
| `storeId` | 特定店舗のみ表示する場合に店舗名を指定。空欄で全件 |
| `maxItems` | 最大表示件数（既定 12） |
| `pollIntervalMs` | 自動更新間隔（ミリ秒。既定 60000） |

---

## 注意事項

- GAS URL は公開して問題ありません（読み取り専用です）
- LINE トークンやスプレッドシート ID は WordPress に書かないでください
- 投稿の追加・削除は LINE 経由のみ行えます

---

## トラブルシュート

| 症状 | 確認すること |
|------|-------------|
| 「GAS URL を設定してください」 | `gasUrl` が空、またはプレースホルダのまま |
| 「取得に失敗しました」 | GAS が「全員」アクセスでデプロイされているか |
| 投稿が表示されない | かわら版に投稿があるか。非表示フラグが付いていないか |

詳細な技術仕様は運営担当にお問い合わせください。
