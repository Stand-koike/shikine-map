/**
 * 固定マスタピン — store_id 補完・画像 URL・マーカー DOM
 * config.js の FIXED_PIN_* / FIXED_STORE_ID_* / FIXED_MASTER_FALLBACK を参照
 */
(function (global) {
    'use strict';

    const FIXED_PIN_DIR = 'assets/fixed-pins/';

    function config() {
        return global.CONFIG || global.__SHIMODA_MAP_CONFIG__ || {};
    }

    function normalizeStoreId(raw) {
        if (raw == null || String(raw).trim() === '') return '';
        return String(raw).replace(/\s+/g, ' ').trim();
    }

    function assetUrl(rel) {
        if (!rel) return '';
        if (/^https?:\/\//i.test(rel)) return rel;
        const path = String(rel).replace(/^\//, '');
        let url;
        try {
            url = new URL(path, document.baseURI).href;
        } catch (e) {
            url = path;
        }
        const ver = config().ASSET_VERSION;
        if (!ver) return url;
        const sep = url.includes('?') ? '&' : '?';
        return `${url}${sep}v=${encodeURIComponent(ver)}`;
    }

    function pinAsset(pathOrFile) {
        if (!pathOrFile) return '';
        if (/^(assets\/|https?:\/\/)/i.test(pathOrFile)) return assetUrl(pathOrFile);
        return assetUrl(FIXED_PIN_DIR + pathOrFile);
    }

    function resolveStoreId(spot) {
        const sid = normalizeStoreId(spot?.storeId);
        if (sid) return sid;

        const name = (spot?.name || '').trim();
        const byName = config().FIXED_STORE_ID_BY_NAME || {};
        if (name && byName[name]) return byName[name];

        const containsRules = config().FIXED_STORE_ID_BY_NAME_CONTAINS || [];
        for (let i = 0; i < containsRules.length; i++) {
            const rule = containsRules[i];
            if (!rule || !rule.contains || !rule.storeId) continue;
            if (name.includes(rule.contains)) return normalizeStoreId(rule.storeId);
        }

        const id = spot?.id || '';
        if (id.startsWith('fixed_spot_')) {
            const fromId = id.slice('fixed_spot_'.length);
            if (/^[a-z][a-z0-9_]*$/i.test(fromId)) return fromId;
        }

        const lat = spot?.coords?.[1];
        const lng = spot?.coords?.[0];
        if (lat == null || lng == null) return '';

        const eps = 0.00004;
        for (const row of config().FIXED_MASTER_FALLBACK || []) {
            const key = normalizeStoreId(row.storeId);
            if (!key || row.lat == null || row.lng == null) continue;
            if (Math.abs(lat - Number(row.lat)) < eps && Math.abs(lng - Number(row.lng)) < eps) return key;
        }
        return '';
    }

    function effectiveCategory(spot) {
        const byStore = config().FIXED_PIN_CATEGORY_BY_STORE_ID || {};
        const storeKey = resolveStoreId(spot);
        if (storeKey && byStore[storeKey]) return byStore[storeKey];
        const byName = config().FIXED_PIN_CATEGORY_BY_NAME || {};
        const name = (spot?.name || '').trim();
        if (name && byName[name]) return byName[name];
        return spot.category;
    }

    function applySpotIdentity(spot) {
        const sid = resolveStoreId(spot);
        if (!sid) return spot;
        return {
            ...spot,
            storeId: sid,
            id: `fixed_spot_${sid.replace(/\s+/g, '_')}`
        };
    }

    function mergeMasterFallback(spots) {
        const list = spots.map(applySpotIdentity);
        const have = new Set(
            list.map(s => resolveStoreId(s) || normalizeStoreId(s.storeId)).filter(Boolean)
        );
        (config().FIXED_MASTER_FALLBACK || []).forEach(row => {
            const sid = normalizeStoreId(row.storeId);
            if (!sid || have.has(sid)) return;
            const lat = Number(row.lat);
            const lng = Number(row.lng);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
            list.push(applySpotIdentity({
                id: `fixed_spot_${sid}`,
                storeId: sid,
                name: row.name || sid,
                name_en: row.name_en || row.name || sid,
                category: row.category || '',
                coords: [lng, lat],
                emoji: row.emoji || '',
                desc: row.desc || '',
                hours: row.hours || '',
                address: row.address || '',
                isFixed: true
            }));
            have.add(sid);
        });
        return list;
    }

    function overlaySrcForStore(storeKey) {
        if (!storeKey) return null;
        const file = (config().FIXED_PIN_OVERLAY_BY_STORE_ID || {})[storeKey];
        return file ? pinAsset(file) : null;
    }

    function circularLogoSrc(spot) {
        const storeKey = resolveStoreId(spot);
        const byStore = config().FIXED_PIN_ICON_BY_STORE_ID || {};
        if (storeKey && byStore[storeKey]) return byStore[storeKey];
        if (storeKey === 'kids_wakuwaku' && spot.imageUrl3) return spot.imageUrl3;
        return overlaySrcForStore(storeKey);
    }

    function pinEmojiForStore(storeKey) {
        if (!storeKey) return '';
        return (config().FIXED_PIN_EMOJI_BY_STORE_ID || {})[storeKey] || '';
    }

    function overlayEmojiFallback(storeKey) {
        if (!storeKey) return '🤸';
        return (config().FIXED_PIN_OVERLAY_EMOJI_FALLBACK || {})[storeKey] || '🤸';
    }

    function usesCircularLogo(spot) {
        const ids = config().FIXED_PIN_CIRCULAR_LOGO_STORE_IDS || [];
        const key = resolveStoreId(spot);
        return !!(key && ids.indexOf(key) !== -1);
    }

    function categorySkipsModal(category) {
        return (config().FIXED_PIN_NO_MODAL || []).indexOf(category) !== -1;
    }

    /** マップ描画用の URL・絵文字を一括解決 */
    function getVisual(spot) {
        const storeKey = resolveStoreId(spot);
        const cat = effectiveCategory(spot);
        const icons = config().FIXED_PIN_ICONS || {};
        const baseFile = icons[cat] || null;
        const size = config().FIXED_PIN_SIZE || 30;
        return {
            storeKey,
            size,
            baseSrc: baseFile ? pinAsset(baseFile) : null,
            overlaySrc: overlaySrcForStore(storeKey),
            pinEmoji: pinEmojiForStore(storeKey),
            usesCircular: usesCircularLogo(spot),
            circularLogoSrc: circularLogoSrc(spot)
        };
    }

    function createTeardropVisual(spot) {
        const v = getVisual(spot);
        const visual = document.createElement('div');
        visual.className = 'fixed-pin-visual';

        if (!v.baseSrc) {
            const fallback = document.createElement('span');
            fallback.style.fontSize = `${Math.round(v.size * 0.7)}px`;
            fallback.textContent = spot.emoji || '📍';
            visual.appendChild(fallback);
            return visual;
        }

        const stack = document.createElement('div');
        stack.className = 'fixed-pin-stack';
        stack.style.cssText = `width:${v.size}px;height:${v.size}px;`;

        const baseImg = document.createElement('img');
        baseImg.src = v.baseSrc;
        baseImg.alt = '';
        baseImg.className = 'fixed-pin-base';
        baseImg.onerror = () => {
            stack.replaceChildren();
            const fb = document.createElement('span');
            fb.style.fontSize = `${Math.round(v.size * 0.7)}px`;
            fb.textContent = spot.emoji || '📍';
            stack.appendChild(fb);
        };
        stack.appendChild(baseImg);

        if (v.pinEmoji) {
            const emojiEl = document.createElement('span');
            emojiEl.className = 'fixed-pin-overlay-emoji';
            emojiEl.setAttribute('aria-hidden', 'true');
            emojiEl.style.fontSize = `${Math.round(v.size * 0.38)}px`;
            emojiEl.textContent = v.pinEmoji;
            stack.appendChild(emojiEl);
        } else if (v.overlaySrc) {
            const overlayImg = document.createElement('img');
            overlayImg.src = v.overlaySrc;
            overlayImg.alt = '';
            overlayImg.className = 'fixed-pin-overlay';
            overlayImg.onerror = () => {
                overlayImg.remove();
                const fb = document.createElement('span');
                fb.className = 'fixed-pin-overlay-emoji';
                fb.setAttribute('aria-hidden', 'true');
                fb.style.fontSize = `${Math.round(v.size * 0.4)}px`;
                fb.textContent = overlayEmojiFallback(v.storeKey);
                stack.appendChild(fb);
            };
            stack.appendChild(overlayImg);
        }

        visual.appendChild(stack);
        return visual;
    }

    const FixedPinModule = {
        normalizeStoreId,
        assetUrl,
        pinAsset,
        resolveStoreId,
        effectiveCategory,
        applySpotIdentity,
        mergeMasterFallback,
        getVisual,
        circularLogoSrc,
        usesCircularLogo,
        categorySkipsModal,
        pinEmojiForStore,
        createTeardropVisual
    };

    global.FixedPinModule = FixedPinModule;
    global.normalizeStoreId_ = normalizeStoreId;
    global.assetUrl_ = assetUrl;
    global.resolveFixedPresetStoreId_ = resolveStoreId;
    global.applyFixedSpotIdentity_ = applySpotIdentity;
    global.mergeFixedMasterFallback_ = mergeMasterFallback;
    global.effectiveFixedPinCategory_ = effectiveCategory;
}(typeof window !== 'undefined' ? window : globalThis));
