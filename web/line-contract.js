/**
 * LINE 連携の契約定義
 *
 * posts シート名と最小フラグ。列定義の既定値は index.html の POSTS_COL。
 * GAS デプロイ後もこのスタブでフロントの読み取りは動く。
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
