'use strict';

const core = require('./prompt-core.js');

const KEYS = Object.freeze({
  customPrompts: 'pv.customPrompts.v2',
  favoriteIds: 'pv.favoriteIds.v2',
  recentPrompts: 'pv.recentPrompts.v2',
  searchHistory: 'pv.searchHistory.v1',
  starterSeeded: 'pv.starterCustomSeeded.v2',
  migrated: 'pv.storage.v2.migrated',
});

const LEGACY_KEYS = Object.freeze([
  'customPrompts',
  'favorites',
  'recentPrompts',
  'searchHistory',
  'currentPrompt',
  'starterCustomSeeded',
]);

function message(error) {
  if (!error) return '未知错误';
  return error && error.message ? error.message : String(error);
}

function createStore(driver) {
  if (!driver) throw new TypeError('Storage driver is required.');

  function has(key) {
    try {
      const info = driver.getStorageInfoSync();
      return Boolean(info && Array.isArray(info.keys) && info.keys.indexOf(key) >= 0);
    } catch (error) {
      return false;
    }
  }

  function read(key, fallback) {
    try {
      if (!has(key)) return { ok: true, value: fallback, found: false };
      return { ok: true, value: driver.getStorageSync(key), found: true };
    } catch (error) {
      return { ok: false, value: fallback, found: false, error: message(error) };
    }
  }

  function write(key, value) {
    try {
      driver.setStorageSync(key, value);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: message(error) };
    }
  }

  function remove(key) {
    try {
      driver.removeStorageSync(key);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: message(error) };
    }
  }

  function normalizeStringIds(value) {
    const result = [];
    const seen = {};
    (Array.isArray(value) ? value : []).forEach((raw) => {
      const id = String(raw || '').trim();
      if (!id || seen[id]) return;
      seen[id] = true;
      result.push(id);
    });
    return result;
  }

  function loadCustomPrompts() {
    const stored = read(KEYS.customPrompts, []);
    if (!stored.ok) return stored;
    try {
      return {
        ok: true,
        value: core.normalizeLibrary(Array.isArray(stored.value) ? stored.value : [], 'custom'),
      };
    } catch (error) {
      return { ok: false, value: [], error: `自定义 Prompt 数据损坏：${message(error)}` };
    }
  }

  function saveCustomPrompts(prompts) {
    try {
      const normalized = core.normalizeLibrary(prompts || [], 'custom');
      const result = write(KEYS.customPrompts, normalized.map((prompt) => ({ ...prompt, tags: prompt.tags.slice() })));
      return result.ok ? { ok: true, value: normalized } : result;
    } catch (error) {
      return { ok: false, error: message(error) };
    }
  }

  function loadFavoriteIds() {
    const stored = read(KEYS.favoriteIds, []);
    if (!stored.ok) return stored;
    return { ok: true, value: normalizeStringIds(stored.value) };
  }

  function saveFavoriteIds(ids) {
    return write(KEYS.favoriteIds, normalizeStringIds(ids));
  }

  function toggleFavorite(id) {
    const loaded = loadFavoriteIds();
    if (!loaded.ok) return loaded;
    const ids = loaded.value.slice();
    const index = ids.indexOf(id);
    const favorited = index < 0;
    if (favorited) ids.unshift(id);
    else ids.splice(index, 1);
    const saved = saveFavoriteIds(ids);
    return saved.ok ? { ok: true, value: ids, favorited } : saved;
  }

  function loadRecents() {
    const stored = read(KEYS.recentPrompts, []);
    if (!stored.ok) return stored;
    const seen = {};
    const result = [];
    (Array.isArray(stored.value) ? stored.value : []).forEach((raw) => {
      const id = String(raw && raw.id || '').trim();
      if (!id || seen[id]) return;
      seen[id] = true;
      result.push({ id, ts: Number.isFinite(Number(raw.ts)) ? Number(raw.ts) : 0 });
    });
    return { ok: true, value: result.slice(0, 30) };
  }

  function saveRecents(recents) {
    const seen = {};
    const normalized = [];
    (Array.isArray(recents) ? recents : []).forEach((raw) => {
      const id = String(raw && raw.id || '').trim();
      if (!id || seen[id]) return;
      seen[id] = true;
      normalized.push({ id, ts: Number.isFinite(Number(raw.ts)) ? Number(raw.ts) : 0 });
    });
    return write(KEYS.recentPrompts, normalized.slice(0, 30));
  }

  function recordRecent(id, now) {
    const loaded = loadRecents();
    if (!loaded.ok) return loaded;
    const recents = loaded.value.filter((entry) => entry.id !== id);
    recents.unshift({ id, ts: Number.isFinite(Number(now)) ? Number(now) : Date.now() });
    const saved = saveRecents(recents);
    return saved.ok ? { ok: true, value: recents.slice(0, 30) } : saved;
  }

  function loadSearchHistory() {
    const stored = read(KEYS.searchHistory, []);
    if (!stored.ok) return stored;
    const seen = {};
    const result = [];
    (Array.isArray(stored.value) ? stored.value : []).forEach((raw) => {
      const keyword = String(raw || '').trim().slice(0, 80);
      if (!keyword || seen[keyword]) return;
      seen[keyword] = true;
      result.push(keyword);
    });
    return { ok: true, value: result.slice(0, 8) };
  }

  function saveSearchHistory(history) {
    const seen = {};
    const normalized = [];
    (Array.isArray(history) ? history : []).forEach((raw) => {
      const keyword = String(raw || '').trim().slice(0, 80);
      if (!keyword || seen[keyword]) return;
      seen[keyword] = true;
      normalized.push(keyword);
    });
    return write(KEYS.searchHistory, normalized.slice(0, 8));
  }

  function removePromptReferences(id) {
    const favorites = loadFavoriteIds();
    const recents = loadRecents();
    if (!favorites.ok) return favorites;
    if (!recents.ok) return recents;
    const favoriteResult = saveFavoriteIds(favorites.value.filter((value) => value !== id));
    if (!favoriteResult.ok) return favoriteResult;
    return saveRecents(recents.value.filter((entry) => entry.id !== id));
  }

  function isStarterSeeded() {
    const stored = read(KEYS.starterSeeded, false);
    return stored.ok && Boolean(stored.value);
  }

  function markStarterSeeded() {
    return write(KEYS.starterSeeded, true);
  }

  function titleMap(prompts) {
    const result = {};
    (prompts || []).forEach((prompt) => {
      if (!result[prompt.title]) result[prompt.title] = [];
      result[prompt.title].push(prompt.id);
    });
    return result;
  }

  function migrateLegacy(builtins, now) {
    const done = read(KEYS.migrated, false);
    if (done.ok && done.value) return { ok: true, migrated: false };

    const existingCustom = read(KEYS.customPrompts, []);
    const legacyCustom = read('customPrompts', []);
    if (!existingCustom.ok) return existingCustom;
    if (!legacyCustom.ok) return legacyCustom;

    let customs;
    try {
      if (existingCustom.found) {
        customs = core.normalizeLibrary(existingCustom.value || [], 'custom');
      } else {
        const source = Array.isArray(legacyCustom.value) ? legacyCustom.value : [];
        const used = {};
        customs = source.map((raw, index) => {
          let prompt = core.createCustomPrompt(raw, Number(now || Date.now()) + index, `legacy-${index}`);
          while (used[prompt.id]) {
            prompt = core.createCustomPrompt(raw, Number(now || Date.now()) + index, `legacy-${index}-${Object.keys(used).length}`);
          }
          used[prompt.id] = true;
          return prompt;
        });
      }
    } catch (error) {
      return { ok: false, error: `旧版自定义 Prompt 无法迁移：${message(error)}` };
    }

    const allPrompts = core.mergeLibraries(builtins || [], customs);
    const byTitle = titleMap(allPrompts);

    const existingFavorites = read(KEYS.favoriteIds, []);
    const legacyFavorites = read('favorites', []);
    if (!existingFavorites.ok) return existingFavorites;
    if (!legacyFavorites.ok) return legacyFavorites;
    let favoriteIds = existingFavorites.found
      ? normalizeStringIds(existingFavorites.value)
      : [];
    if (!existingFavorites.found) {
      (Array.isArray(legacyFavorites.value) ? legacyFavorites.value : []).forEach((title) => {
        (byTitle[String(title)] || []).forEach((id) => favoriteIds.push(id));
      });
      favoriteIds = normalizeStringIds(favoriteIds);
    }

    const existingRecents = read(KEYS.recentPrompts, []);
    const legacyRecents = read('recentPrompts', []);
    if (!existingRecents.ok) return existingRecents;
    if (!legacyRecents.ok) return legacyRecents;
    let recents = existingRecents.found ? existingRecents.value : [];
    if (!existingRecents.found) {
      recents = (Array.isArray(legacyRecents.value) ? legacyRecents.value : []).reduce((result, entry) => {
        const ids = byTitle[String(entry && entry.title || '')] || [];
        if (ids[0]) result.push({ id: ids[0], ts: Number(entry && entry.ts || 0) });
        return result;
      }, []);
    }

    const existingSearch = read(KEYS.searchHistory, []);
    const legacySearch = read('searchHistory', []);
    if (!existingSearch.ok) return existingSearch;
    if (!legacySearch.ok) return legacySearch;
    const searchHistory = existingSearch.found ? existingSearch.value : legacySearch.value;

    const writes = [
      saveCustomPrompts(customs),
      saveFavoriteIds(favoriteIds),
      saveRecents(recents),
      saveSearchHistory(searchHistory),
    ];
    const failed = writes.find((result) => !result.ok);
    if (failed) return failed;

    const marked = write(KEYS.migrated, true);
    if (!marked.ok) return marked;
    LEGACY_KEYS.forEach((key) => remove(key));
    return { ok: true, migrated: true };
  }

  return Object.freeze({
    KEYS,
    has,
    isStarterSeeded,
    loadCustomPrompts,
    loadFavoriteIds,
    loadRecents,
    loadSearchHistory,
    markStarterSeeded,
    migrateLegacy,
    read,
    recordRecent,
    removePromptReferences,
    saveCustomPrompts,
    saveFavoriteIds,
    saveRecents,
    saveSearchHistory,
    toggleFavorite,
    write,
  });
}

module.exports = Object.freeze({ KEYS, createStore });
