/**
 * LINE 連携の契約定義（敷根公園フェスマップでは未使用）
 *
 * index.html が読み込むためスタブのみ。GAS・posts シートは不要。
 */
(function (global) {
    'use strict';

    global.__LINE_CONTRACT__ = {
        SHEETS: {
            POSTS: 'posts'
        },
        FEATURES: {
            STORE_ONLY: true,
            ENABLE_STANDALONE_LIVE_PINS: false
        }
    };
})(typeof window !== 'undefined' ? window : this);
