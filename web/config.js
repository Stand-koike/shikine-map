/**
 * エリア設定 — 敷根公園フェスマップ（shikine-map）
 *
 * イラスト対象: 総合運動公園（四隅・map.webp は QGIS 書き出し park_4326.tif 由来）。
 * ピン設計（飲食4 + 固定9）: web/docs/PIN_INVENTORY_SHIKINE.md
 *
 * ローカル微調整: config.local.js（Git 除外）
 *
 * @see web/docs/SHEET_SETUP_SHIKINE.md
 */
(function () {
    'use strict';

    var secrets = (typeof window !== 'undefined' && window.__SHIMODA_MAP_SECRETS__)
        ? window.__SHIMODA_MAP_SECRETS__
        : {};

    /**
     * map.webp 外枠 WGS84（Mapbox: 画像 TL, TR, BR, BL）。
     * qgis/export/park_4326.tif → gdalinfo cornerCoordinates（2026-10-24）。
     * @see web/docs/MAP_GEOTIFF_SHIKINE.md
     */
    var MAP_TL = [138.9290221, 34.6837438];
    var MAP_TR = [138.935199, 34.6837438];
    var MAP_BR = [138.935199, 34.680125];
    var MAP_BL = [138.9290221, 34.680125];
    var mapCoords = [MAP_TL, MAP_TR, MAP_BR, MAP_BL];

    var minLng = Math.min(mapCoords[0][0], mapCoords[1][0], mapCoords[2][0], mapCoords[3][0]);
    var maxLng = Math.max(mapCoords[0][0], mapCoords[1][0], mapCoords[2][0], mapCoords[3][0]);
    var minLat = Math.min(mapCoords[0][1], mapCoords[1][1], mapCoords[2][1], mapCoords[3][1]);
    var maxLat = Math.max(mapCoords[0][1], mapCoords[1][1], mapCoords[2][1], mapCoords[3][1]);
    var PARK_LNG = (minLng + maxLng) / 2;
    var PARK_LAT = (minLat + maxLat) / 2;
    var padLng = (maxLng - minLng) * 0.2;
    var padLat = (maxLat - minLat) * 0.2;

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
            cacheVersion: '20261024-park4326',
            solarLat:   PARK_LAT,
            solarLng:   PARK_LNG,
            timezone:   'Asia/Tokyo',

            coordinates: mapCoords,
            latOffset:  0,
            lngOffset:  0,
            center:    [PARK_LNG, PARK_LAT],
            initCenter: [PARK_LNG, PARK_LAT],
            initZoom:  18.0,
            initZoomMobile: 17.6,
            initCenterMobile: [PARK_LNG, PARK_LAT],
            minZoom:   17.2,
            minZoomMobile: 16.9,
            maxZoom:   20,
            initUseFitBounds: true,
            maxBounds: [
                [minLng - padLng, minLat - padLat],
                [maxLng + padLng, maxLat + padLat]
            ],
            bearing:   0,
            pitch:     45
        },

        POLL_INTERVAL: 30000,

        FIXED_MASTER_SHEET: '固定マスタ',

        FIXED_PIN_ICONS: {
            toilet: 'toilet.png',
            stage: 'stage.png',
            kids_play: 'kids_play.png',
            ws_indoor: 'ws_indoor.png',
            pool: 'pool.png',
            park_office: 'park_office.png'
        },
        FIXED_PIN_SIZE: 36,
        /** タップしてもモーダルを開かない（マップアイコンのみ） */
        FIXED_PIN_NO_MODAL: ['toilet'],

        /** LINE からの最新投稿をマップ／モーダルに出す（GAS 準備後に実投稿） */
        ENABLE_LIVE_POSTS: true,
        POSTS_SHEET: secrets.POSTS_SHEET || 'posts',
        LIVE_POST_POLL_INTERVAL: 30000,

        /** フェス全体タイムテーブル @see web/docs/EVENT_SCHEDULE_SHIKINE.md */
        EVENTS_SHEET: secrets.EVENTS_SHEET || 'event_schedule',
        EVENT_SCHEDULE_POLL_INTERVAL: 60000,
        EVENT_SCHEDULE_COLS: {
            START_TIME: 1, END_TIME: 2, TITLE: 3, PERFORMER: 4, DESCRIPTION: 5,
            VENUE: 6, EVENT_DATE: 7, SORT_ORDER: 8, HIDDEN: 9, IMAGE_URL: 10,
            STORE_ID: 11
        },

        /** 探す: シート category → 表示名。ピンは非表示にせず強調だけ */
        FIND_GROUPS: [
            { category: 'フードエリア', label: '飲食' },
            { category: 'toilet', label: 'トイレ' },
            { category: 'stage', label: 'ステージ' },
            { category: 'kids_play', label: 'キッズ' },
            { category: 'ws_indoor', label: 'ワークショップ' },
            { category: 'pool', label: 'プール' },
            { category: 'park_office', label: '事務所' }
        ],

        PARK_INFO: {
            title: '敷根公園フェス 2026',
            date: '2026年11月3日（火・祝）',
            hours: '主な時間 10:00〜16:00（自然観察は 9:30〜）',
            note: '入場無料',
            contact: '下田市敷根公園屋内温水プール',
            phone: '0558-23-6333'
        },

        /** QGIS 公式点の控え（デバッグ時のみ true） */
        SURVEY_POINTS: {
            enabled:    false,
            url:        'data/point_029d.geojson',
            showLabels: true
        },

        CLUSTER: {
            enabled:          false,
            clusterMaxZoom:   17,
            clusterRadius:    55,
            clusterMinPoints: 2,
            flyToZoom:        18.5
        },

        TRANSLATIONS: {
            ja: {
                all: 'すべて', go: 'Google Mapsで見る', coupon: 'クーポンを使う',
                loading: '読み込み中...', noData: 'データなし', filter: '探す',
                layers: 'レイヤー', newsListTitle: 'お知らせ', updating: 'データ更新中...',
                hours: '営業時間', tags: 'タグ', allTags: 'すべてのタグ', map: 'マップ',
                urlLink: 'リンク', descLabel: '説明', newsLabel: '補足',
                timetableTitle: 'タイムテーブル', timetableEmpty: 'スケジュールは準備中です',
                timetableVenue: '会場',
                applyLink: '参加申込はこちら',
                kawaraView: '最新情報を見る',
                kawaraTitle: '最新情報',
                supportedBy: 'Supported by',
                parkTitle: '公園',
                findHint: 'ピンは消さず、対象を大きく表示します'
            },
            en: {
                all: 'All', go: 'Open in Google Maps', coupon: 'Coupon',
                loading: 'Loading...', noData: 'No Data', filter: 'Find',
                layers: 'Layers', newsListTitle: 'News', updating: 'Updating...',
                hours: 'Hours', tags: 'Tags', allTags: 'All Tags', map: 'Map',
                urlLink: 'Link', descLabel: 'About', newsLabel: 'Notes',
                timetableTitle: 'Timetable', timetableEmpty: 'Schedule coming soon',
                timetableVenue: 'Venue',
                applyLink: 'Register here',
                kawaraView: 'Latest update',
                kawaraTitle: 'Latest',
                supportedBy: 'Supported by',
                parkTitle: 'Park',
                findHint: 'Pins stay visible; matches are larger'
            }
        }
    };
})();
