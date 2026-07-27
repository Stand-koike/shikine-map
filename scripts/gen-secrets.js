#!/usr/bin/env node
/**
 * ローカル開発用に web/secrets.local.js を生成する。
 * .github/workflows/pages.yml の生成ロジックと同一。値は環境変数から取得し、
 * 未設定なら空文字（index.html は空トークンを検知して案内メッセージを表示する）。
 *
 * このファイルはソースに秘密情報を含めない。値はすべて環境変数から注入する。
 *   MAPBOX_PUBLIC_TOKEN, GOOGLE_SHEET_ID（必須） / POSTS_SHEET, EVENTS_SHEET（任意）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const MAPBOX_TOKEN = process.env.MAPBOX_PUBLIC_TOKEN || '';
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const POSTS_SHEET = (process.env.POSTS_SHEET || '').trim() || 'posts';
const EVENTS_SHEET = (process.env.EVENTS_SHEET || '').trim() || 'event_schedule';

const body =
  'window.__SHIMODA_MAP_SECRETS__ = {\n' +
  `    MAPBOX_TOKEN: ${JSON.stringify(MAPBOX_TOKEN)},\n` +
  `    SHEET_ID: ${JSON.stringify(SHEET_ID)},\n` +
  `    POSTS_SHEET: ${JSON.stringify(POSTS_SHEET)},\n` +
  `    EVENTS_SHEET: ${JSON.stringify(EVENTS_SHEET)}\n` +
  '};\n';

const outDir = path.join(__dirname, '..', 'web');
if (!fs.existsSync(outDir)) {
  console.error('[gen-secrets] web/ ディレクトリが見つかりません。スキップします。');
  process.exit(0);
}
const outPath = path.join(outDir, 'secrets.local.js');
fs.writeFileSync(outPath, body, 'utf8');
console.log(`[gen-secrets] wrote ${outPath} (MAPBOX_TOKEN ${MAPBOX_TOKEN ? 'set' : 'EMPTY'}, SHEET_ID ${SHEET_ID ? 'set' : 'EMPTY'})`);
