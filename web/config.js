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

    var spanLng = maxLng - minLng;
    var spanLat = maxLat - minLat;

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

    /** 任意の基準点の周りに縮める（スマホの fit 範囲を基準点寄りにする） */
    function scaleMapCoordsAround(coords, factor, anchorLng, anchorLat) {
        return coords.map(function (pt) {
            return [
                anchorLng + (pt[0] - anchorLng) * factor,
                anchorLat + (pt[1] - anchorLat) * factor
            ];
        });
    }

    /** テニスコート寄り（公式点 トイレ(テニス) の南西を基準） */
    var mobileInitAnchorLng = minLng + spanLng * 0.62;
    var mobileInitAnchorLat = minLat + spanLat * 0.36;

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
            initZoom:  19.2,
            initZoomMobile: 18.85,
            initCenterMobile: [PARK_LNG, PARK_LAT],
            minZoom:   16.6,
            minZoomMobile: 16.4,
            maxZoom:   20,
            initUseFitBounds: true,
            /** 起動時 fit の対象（中心寄り・イラスト四隅は画面外にはみ出す） */
            initViewCoordinates: scaleMapCoords(mapCoords, 0.68),
            /** スマホ: テニスコート側を基準に寄せる（factor 大きい＝やや引き） */
            initViewCoordinatesMobile: scaleMapCoordsAround(
                mapCoords, 0.41, mobileInitAnchorLng, mobileInitAnchorLat
            ),
            /** fitBounds 初期表示のズーム上限 */
            initFitMaxZoom: 19.85,
            initFitMaxZoomMobile: 19.75,
            initViewPadding: {
                top: 40,
                bottom: 0,
                left: 0,
                right: 0,
                mobileTop: 22,
                mobileBottom: 118,
                mobileLeft: 0,
                mobileRight: 52
            },
            /** 画面上の見え方調整（px）— 左コントロール／下カードシート分 */
            initViewOffset: [28, 6],
            /** スマホ: 下シート分 Y、テニスコート側が入る X */
            initViewOffsetMobile: [-78, 52],
            /**
             * fitBounds 後の追い込み（maxZoom 上限で fit だけでは変わらない分）
             * centerLng/Lat は度単位のパン（西・南がマイナス）
             */
            initMobilePostFit: {
                extraZoom: 0.38,
                centerLng: spanLng * 0.04,
                centerLat: -spanLat * 0.06
            },
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
        /** シートの category が空・誤りでも PNG ピンに揃える（emoji 列は使わない） */
        FIXED_PIN_CATEGORY_BY_STORE_ID: {
            kids_ground: 'kids_play'
        },
        FIXED_PIN_CATEGORY_BY_NAME: {
            'グラウンド': 'kids_play',
            'みんなでサッカー！！': 'kids_play'
        },
        /** シートに store_id が無いときの補完（L 列 = kids_ground 推奨） */
        FIXED_STORE_ID_BY_NAME: {
            'グラウンド': 'kids_ground',
            'みんなでサッカー！！': 'kids_ground'
        },
        /** 固定マスタに行が無い／store_id 空でもピンを出す */
        FIXED_MASTER_FALLBACK: [
            {
                storeId: 'kids_ground',
                name: 'みんなでサッカー！！',
                lat: 34.6819033380519,
                lng: 138.931956231428,
                category: 'kids_play'
            }
        ],
        /** store_id ごとのマップピン画像（`assets/...` または HTTPS） */
        FIXED_PIN_ICON_BY_STORE_ID: {
            kids_wakuwaku: 'assets/kids/sponsor-shimoda-baby-kids.webp'
        },
        /** 丸型ピン内に絵文字（画像より優先） */
        FIXED_PIN_EMOJI_BY_STORE_ID: {
            kids_ground: '⚽'
        },
        /** 丸型ピン（店舗同型）の中にロゴ画像または絵文字を表示 */
        FIXED_PIN_CIRCULAR_LOGO_STORE_IDS: ['kids_wakuwaku', 'kids_ground'],
        /**
         * 固定スポットのモーダル表示（フライヤー文言のみ等）
         * @see web/docs/sheets/fixed_master_ALL_seed.csv kids_ground 行
         */
        FIXED_MODAL_BY_STORE_ID: {
            kids_ground: {
                name: 'みんなでサッカー！！',
                name_en: 'Soccer with Everyone!!',
                hours: '11:00 - 12:00',
                hours_en: '11:00 - 12:00',
                address: '健康広場',
                address_en: 'Health Plaza',
                desc: '申込なし、飛び入りOK！みんなで楽しくミニゲーム！\n終了後12:00 - 16:00までグラウンド無料開放！',
                desc_en: 'No signup; drop-ins welcome! Fun mini-games together.\nGround open free 12:00–16:00 after the session!',
                hideCategory: true,
                hideSlider: true,
                hideDescLabel: true,
                hideNews: true,
                hideTags: true,
                hideStatus: true,
                hideSponsor: true,
                hideContactExtras: true
            }
        },
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

        /** 起動スプラッシュ動画（モバイル・セッション初回のみ） */
        SPLASH_VIDEO: {
            enabled: true,
            mobileOnly: true,
            src: 'assets/splash-shikine.mp4?v=2',
            storageKey: 'shikine_map_splash_seen_v2',
            skipLabel: 'スキップ',
            tapHint: 'タップして再生',
            maxWaitMs: 15000
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
