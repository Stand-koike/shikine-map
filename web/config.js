/**
 * エリア設定 — 敷根公園フェスマップ（shikine-map）
 *
 * イラスト地図・スプレッドシート未準備時はプレースホルダー座標と map.webp を使用。
 * ローカル微調整: config.local.js（Git 除外）
 *
 * @see web/docs/SHEET_SETUP_SHIKINE.md
 */
(function () {
    'use strict';

    var secrets = (typeof window !== 'undefined' && window.__SHIMODA_MAP_SECRETS__)
        ? window.__SHIMODA_MAP_SECRETS__
        : {};

    /** 敷根公園付近の仮フレーム（イラスト差し替え時に coordinates を更新） */
    var PARK_LNG = 138.9308;
    var PARK_LAT = 34.6820;
    var halfLng = 0.0033;
    var halfLat = 0.0025;

    window.__SHIMODA_MAP_CONFIG__ = {
        APP_TITLE: '敷根公園フェスマップ',

        GA_MEASUREMENT_ID: '',

        MAPBOX_TOKEN: secrets.MAPBOX_TOKEN || 'pk.YOUR_MAPBOX_TOKEN',
        SHEET_ID:     secrets.SHEET_ID     || 'YOUR_GOOGLE_SHEET_ID',

        COLS: {
            NAME: 1, LAT: 2, LNG: 3, EMOJI: 4,
            URL: 5, IMAGE_URL_2: 6, IMAGE_URL_3: 7,
            DESC: 8, CAT: 9, HIDDEN: 10,
            STORE_ID: 11, RESERVED: 12, STATUS: 13,
            NEWS: 14, LINK_URL: 15, COUPON: 16,
            ADDRESS: 17, PHONE: 18, TAGS: 19, HOURS: 20,
            NAME_EN: 21, DESC_EN: 22, CAT_EN: 23, STATUS_EN: 24,
            NEWS_EN: 25, LINK_URL_EN: 26, COUPON_EN: 27, ADDRESS_EN: 28, PHONE_EN: 29,
            TAGS_EN: 30, HOURS_EN: 31, TAGLINE: 32, TAGLINE_EN: 33
        },

        COLORS: { DEFAULT: '#2E7D32', RED: '#FF5252', YELLOW: '#FFCA28' },

        MAP_IMAGE: {
            url:        'map.webp',
            dayOnly:    true,
            urlSunset:  null,
            urlNight:   null,
            cacheVersion: '20261021-shikine-placeholder',
            solarLat:   null,
            solarLng:   null,
            timezone:   'Asia/Tokyo',

            coordinates: [
                [PARK_LNG - halfLng, PARK_LAT + halfLat],
                [PARK_LNG + halfLng, PARK_LAT + halfLat],
                [PARK_LNG + halfLng, PARK_LAT - halfLat],
                [PARK_LNG - halfLng, PARK_LAT - halfLat]
            ],
            latOffset:  0,
            lngOffset:  0,
            center:    [PARK_LNG, PARK_LAT],
            initCenter: [PARK_LNG, PARK_LAT],
            initZoom:  16.5,
            initZoomMobile: 16.0,
            initCenterMobile: [PARK_LNG, PARK_LAT],
            minZoom:   15.5,
            minZoomMobile: 15.2,
            maxZoom:   19,
            initUseFitBounds: true,
            maxBounds: [
                [PARK_LNG - halfLng * 1.4, PARK_LAT - halfLat * 1.4],
                [PARK_LNG + halfLng * 1.4, PARK_LAT + halfLat * 1.4]
            ],
            bearing:   0,
            pitch:     45
        },

        POLL_INTERVAL: 30000,

        /** 固定施設レイヤー（フェスでは未使用） */
        FIXED_MASTER_SHEET: null,

        /** LINE かわら版・ライブ投稿は使わない */
        ENABLE_LIVE_POSTS: false,
        LIVE_POST_POLL_INTERVAL: 0,

        CLUSTER: {
            enabled:          true,
            clusterMaxZoom:   17,
            clusterRadius:    55,
            clusterMinPoints: 2,
            flyToZoom:        17.5
        },

        TRANSLATIONS: {
            ja: {
                all: 'すべて', go: 'Google Mapsで見る', coupon: 'クーポンを使う',
                loading: '読み込み中...', noData: 'データなし', filter: '絞り込み',
                layers: 'レイヤー', newsListTitle: 'お知らせ', updating: 'データ更新中...',
                hours: '営業時間', tags: 'タグ', allTags: 'すべてのタグ', map: 'マップ',
                urlLink: 'リンク', descLabel: '説明', newsLabel: '補足'
            },
            en: {
                all: 'All', go: 'Open in Google Maps', coupon: 'Coupon',
                loading: 'Loading...', noData: 'No Data', filter: 'Filter',
                layers: 'Layers', newsListTitle: 'News', updating: 'Updating...',
                hours: 'Hours', tags: 'Tags', allTags: 'All Tags', map: 'Map',
                urlLink: 'Link', descLabel: 'About', newsLabel: 'Notes'
            }
        }
    };
})();
