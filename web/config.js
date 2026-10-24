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

    /** 初期 fit 用に四隅を中心へ少し縮め、公園全体を画面いっぱいに近づける */
    function scaleMapCoords(coords, factor) {
        var lng = 0, lat = 0, i;
        for (i = 0; i < coords.length; i++) {
            lng += coords[i][0];
            lat += coords[i][1];
        }
        lng /= coords.length;
        lat /= coords.length;
        return coords.map(function (pt) {
            return [lng + (pt[0] - lng) * factor, lat + (pt[1] - lat) * factor];
        });
    }

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
            cacheVersion: '20261024-pin-official-v2',
            solarLat:   PARK_LAT,
            solarLng:   PARK_LNG,
            timezone:   'Asia/Tokyo',

            coordinates: mapCoords,
            latOffset:  0,
            lngOffset:  0,
            center:    [PARK_LNG, PARK_LAT],
            initCenter: [PARK_LNG, PARK_LAT],
            initZoom:  19.2,
            initZoomMobile: 18.85,
            initCenterMobile: [PARK_LNG, PARK_LAT],
            minZoom:   16.6,
            minZoomMobile: 16.4,
            maxZoom:   20,
            initUseFitBounds: true,
            /** 起動時 fit の対象（中心寄り・イラスト四隅は画面外にはみ出す） */
            initViewCoordinates: scaleMapCoords(mapCoords, 0.68),
            /** fitBounds 初期表示のズーム上限 */
            initFitMaxZoom: 19.85,
            initViewPadding: {
                top: 40,
                bottom: 0,
                left: 0,
                right: 0,
                mobileTop: 36,
                mobileBottom: 150
            },
            /** 画面上の見え方調整（px）— 左コントロール／下カードシート分 */
            initViewOffset: [28, 6],
            initViewOffsetMobile: [0, 52],
            maxBounds: [
                [minLng - padLng, minLat - padLat],
                [maxLng + padLng, maxLat + padLat]
            ],
            bearing:   -100,
            pitch:     45,
            /** 右クリックドラッグでマップ回転（ピッチは固定） */
            allowBearingDrag: true
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
        /** store_id ごとのマップピン画像（`assets/...` または HTTPS） */
        FIXED_PIN_ICON_BY_STORE_ID: {
            kids_wakuwaku: 'assets/kids/sponsor-shimoda-baby-kids.webp'
        },
        /** 丸型ピン（店舗同型）の中に FIXED_PIN_ICON_BY_STORE_ID の画像を表示 */
        FIXED_PIN_CIRCULAR_LOGO_STORE_IDS: ['kids_wakuwaku'],
        /** モーダルに Instagram リンクを出す store_id */
        INSTAGRAM_BY_STORE_ID: {
            food_12kitchen: 'https://www.instagram.com/12kitchen_shimoda/?utm_source=ig_web_button_share_sheet',
            food_makimaki: 'https://www.instagram.com/izushimodamakimaki/?utm_source=ig_web_button_share_sheet',
            kids_wakuwaku: 'https://www.instagram.com/shimoda.babyandkids/?utm_source=ig_web_button_share_sheet'
        },
        /** 固定ピン PNG 辺（基準 36px の 150%） */
        FIXED_PIN_SIZE: 54,
        /** 店舗ピン外枠（基準 60/44px の 80%）— CSS と揃える */
        VENDOR_PIN_SIZE: 48,
        VENDOR_PIN_SIZE_MOBILE: 35,
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
        /**
         * QGIS point_official（2026-10-24）— シート lat/lng より優先
         * @see web/docs/sheets/point_official_2026-10-24.csv
         */
        PIN_COORDINATES_BY_STORE_ID: {
            food_makimaki: { lat: 34.6824932921563, lng: 138.930984010395 },
            food_12kitchen: { lat: 34.6825379662215, lng: 138.931109078408 },
            food_takahashi_toriniku: { lat: 34.682322483868, lng: 138.930987026466 },
            food_shimano: { lat: 34.6823518866714, lng: 138.93087404597 },
            stage_outdoor: { lat: 34.6812526807269, lng: 138.931414503298 },
            kids_wakuwaku: { lat: 34.682064308377, lng: 138.931091018924 },
            ws_kids_core: { lat: 34.6823658382876, lng: 138.930573730965 },
            pool_shikine: { lat: 34.6820041972965, lng: 138.930774716945 },
            office_nature_walk: { lat: 34.6823942346664, lng: 138.930745527896 },
            toilet_1: { lat: 34.6830374914053, lng: 138.932012836623 },
            toilet_2: { lat: 34.6809301040032, lng: 138.931958979481 },
            toilet_3: { lat: 34.6813727744368, lng: 138.933443691196 }
        },

        /** 飲食タブのズーム対象（未設定時は category=フードエリア / store_id food_*） */
        FOOD_AREA_STORE_IDS: [
            'food_makimaki', 'food_12kitchen', 'food_takahashi_toriniku', 'food_shimano'
        ],

        /** 遊ぶタブのフライヤーカード表示順（固定マスタ store_id。image_url / image_url_2 を横並び） */
        PLAY_TAB_STORE_IDS: [
            'kids_wakuwaku',
            'ws_kids_core',
            'pool_shikine',
            'office_nature_walk',
            'stage_outdoor'
        ],

        /** 遊ぶタブで image_url + image_url_2 を1枚のカード内に横並び表示 */
        PLAY_TAB_DUAL_FLYER_STORE_IDS: ['stage_outdoor'],

        /**
         * 遊ぶタブ用フライヤー（固定マスタ未取得・画像列空のときの同梱 assets）
         * @see web/docs/sheets/fixed_master_ALL_seed.csv
         */
        PLAY_TAB_FLYER_FALLBACK: {
            kids_wakuwaku: {
                name: 'わくわく広場',
                lat: 34.682064308377,
                lng: 138.931091018924,
                category: 'kids_play',
                emoji: '🎈',
                imageUrl: 'assets/kids/wakuwaku-hiroba.webp'
            },
            ws_kids_core: {
                name: 'キッズコアトレーニング',
                lat: 34.6823658382876,
                lng: 138.930573730965,
                category: 'ws_indoor',
                emoji: '🏃',
                imageUrl: 'assets/workshops/kids-core-training.webp',
                url: 'https://logoform.jp/f/srRs9'
            },
            pool_shikine: {
                name: '敷根プール（無料開放）',
                lat: 34.6820041972965,
                lng: 138.930774716945,
                category: 'pool',
                emoji: '🏊',
                imageUrl: 'assets/pool/shikine-pool-free-opening.webp'
            },
            office_nature_walk: {
                name: '自然観察体験会（敷根公園事務所）',
                lat: 34.6823942346664,
                lng: 138.930745527896,
                category: 'park_office',
                emoji: '🌿',
                imageUrl: 'assets/office/nature-walk-shikine.webp'
            },
            stage_outdoor: {
                name: '敷根公園野外ステージ',
                lat: 34.6812526807269,
                lng: 138.931414503298,
                category: 'stage',
                emoji: '🎤',
                imageUrl: 'assets/stage/aozora-yoga.webp',
                imageUrl2: 'assets/stage/shikine-music-stage-timetable.webp'
            }
        },

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
                all: 'すべて', instagram: 'Instagram', coupon: 'クーポンを使う',
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
                playTab: '遊ぶ',
                foodTab: '食べる',
                findHint: 'ピンは消さず、対象を大きく表示します'
            },
            en: {
                all: 'All', instagram: 'Instagram', coupon: 'Coupon',
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
                playTab: 'Play',
                foodTab: 'Eat',
                findHint: 'Pins stay visible; matches are larger'
            }
        }
    };
})();
