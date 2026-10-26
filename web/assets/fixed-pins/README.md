# 固定施設ピン画像（敷根フェス・総合運動公園）

固定マスタの `category` と `config.js` の `FIXED_PIN_ICONS` で紐付けます。  
描画ロジックは `web/fixed-pins.js`（ベース PNG + `FIXED_PIN_OVERLAY_BY_STORE_ID` の SVG 重ね）。

| ファイル | category | 件数 |
|----------|----------|------|
| `toilet.png` | `toilet` | 3 |
| `stage.png` | `stage` | 1 |
| `kids_play.png` | `kids_play` | 1 |
| `ws_indoor.png` | `ws_indoor` | 2（キッズコア + 2件目） |
| `pool.png` | `pool` | 1 |
| `park_office.png` | `park_office` | 1 |

事務所周辺の体験系 4 件は `FIXED_PIN_CATEGORY_BY_STORE_ID` で既存 PNG（`kids_play` / `stage` / `pool` / `ws_indoor`）を割り当て、中央は `FIXED_PIN_OVERLAY_BY_STORE_ID` の SVG。

トイレはマップアイコンのみ（モーダルなし）。`parking.png` 等の外浦用ファイルは未使用です。

画像がない category は絵文字フォールバックになります（本番では PNG 配置を推奨）。
