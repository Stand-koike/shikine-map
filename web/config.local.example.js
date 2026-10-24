/**
 * ローカルだけの上書き（Git にコミットしない）
 * コピー: config.local.js
 * Import-GeoTiff.ps1 が自動生成する場合はこのファイルを上書きします。
 */
(function () {
    'use strict';
    var base = window.__SHIMODA_MAP_CONFIG__;
    if (!base || !base.MAP_IMAGE) return;

    // 例: 微調整
    // base.MAP_IMAGE.latOffset = 0;
    // base.MAP_IMAGE.lngOffset = 0;
    // base.MAP_IMAGE.pitch = 45;
})();
