const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../utils/prompt-core.js');
const { createStore, KEYS } = require('../utils/local-store.js');

class MemoryStorage {
  constructor(seed = {}) {
    this.values = new Map(Object.entries(seed));
    this.failKey = '';
  }

  getStorageInfoSync() {
    return { keys: [...this.values.keys()] };
  }

  getStorageSync(key) {
    return this.values.has(key) ? this.values.get(key) : '';
  }

  setStorageSync(key, value) {
    if (key === this.failKey) throw new Error(`quota:${key}`);
    this.values.set(key, structuredClone(value));
  }

  removeStorageSync(key) {
    this.values.delete(key);
  }
}

function builtins() {
  return core.normalizeLibrary([
    { title: 'One', body: 'Body one' },
    { title: 'Two', body: 'Body two' },
  ], 'builtin');
}

test('migrates title-based legacy state to stable ids and removes old keys only after success', () => {
  const driver = new MemoryStorage({
    favorites: ['One'],
    recentPrompts: [{ title: 'Two', ts: 99 }],
    searchHistory: ['code', 'code', '写作'],
    customPrompts: [{ title: 'Mine', body: 'Custom body', tags: ['x'] }],
  });
  const store = createStore(driver);
  const result = store.migrateLegacy(builtins(), 1000);

  assert.equal(result.ok, true);
  assert.equal(result.migrated, true);
  assert.equal(driver.values.get(KEYS.migrated), true);
  assert.equal(driver.values.has('favorites'), false);
  assert.equal(driver.values.has('customPrompts'), false);

  const custom = store.loadCustomPrompts();
  const favorites = store.loadFavoriteIds();
  const recents = store.loadRecents();
  const history = store.loadSearchHistory();
  assert.equal(custom.value.length, 1);
  assert.match(custom.value[0].id, /^custom-/);
  assert.deepEqual(favorites.value, [builtins()[0].id]);
  assert.deepEqual(recents.value, [{ id: builtins()[1].id, ts: 99 }]);
  assert.deepEqual(history.value, ['code', '写作']);
});

test('failed v2 write leaves legacy keys and migration marker intact for retry', () => {
  const driver = new MemoryStorage({
    favorites: ['One'],
    customPrompts: [{ title: 'Mine', body: 'Body' }],
  });
  driver.failKey = KEYS.favoriteIds;
  const store = createStore(driver);
  const result = store.migrateLegacy(builtins(), 1000);

  assert.equal(result.ok, false);
  assert.equal(driver.values.has('favorites'), true);
  assert.equal(driver.values.has('customPrompts'), true);
  assert.equal(driver.values.has(KEYS.migrated), false);
});

test('custom prompt writes are validated and round-trip with ids', () => {
  const driver = new MemoryStorage();
  const store = createStore(driver);
  const prompt = core.createCustomPrompt({ title: 'Mine', body: 'Body', tags: ['x'] }, 10, 'seed');
  const saved = store.saveCustomPrompts([prompt]);
  const loaded = store.loadCustomPrompts();

  assert.equal(saved.ok, true);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.value[0].id, prompt.id);
  assert.deepEqual(loaded.value[0].tags, ['x']);
});

test('write failure is reported instead of publishing success', () => {
  const driver = new MemoryStorage();
  driver.failKey = KEYS.customPrompts;
  const store = createStore(driver);
  const prompt = core.createCustomPrompt({ title: 'Mine', body: 'Body' }, 10, 'seed');
  const saved = store.saveCustomPrompts([prompt]);

  assert.equal(saved.ok, false);
  assert.match(saved.error, /quota/);
  assert.equal(driver.values.has(KEYS.customPrompts), false);
});

test('favorite toggle and recent history deduplicate by id', () => {
  const driver = new MemoryStorage();
  const store = createStore(driver);
  assert.equal(store.toggleFavorite('builtin-one').favorited, true);
  assert.equal(store.toggleFavorite('builtin-one').favorited, false);

  store.recordRecent('a', 1);
  store.recordRecent('b', 2);
  store.recordRecent('a', 3);
  assert.deepEqual(store.loadRecents().value, [{ id: 'a', ts: 3 }, { id: 'b', ts: 2 }]);
});

test('deleting a custom prompt cleans favorite and recent references', () => {
  const driver = new MemoryStorage();
  const store = createStore(driver);
  store.saveFavoriteIds(['custom-a', 'builtin-b']);
  store.saveRecents([{ id: 'custom-a', ts: 2 }, { id: 'builtin-b', ts: 1 }]);

  const result = store.removePromptReferences('custom-a');
  assert.equal(result.ok, true);
  assert.deepEqual(store.loadFavoriteIds().value, ['builtin-b']);
  assert.deepEqual(store.loadRecents().value, [{ id: 'builtin-b', ts: 1 }]);
});
