const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const core = require('../utils/prompt-core.js');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const json = (relative) => JSON.parse(read(relative));
const rawPrompts = require('../utils/prompts.js');
const prompts = core.normalizeLibrary(rawPrompts, 'builtin');

assert.ok(prompts.length >= 100, `Bundled prompt library unexpectedly small: ${prompts.length}`);
assert.equal(new Set(prompts.map((prompt) => prompt.id)).size, prompts.length, 'Built-in prompt IDs are not unique.');
assert.equal(
  new Set(prompts.map((prompt) => `${prompt.title}\u0000${prompt.body}`)).size,
  prompts.length,
  'Bundled library contains an exact duplicate title/body record.'
);

for (const prompt of prompts) {
  assert.ok(prompt.title.length <= core.LIMITS.title);
  assert.ok(prompt.body.length <= core.LIMITS.body);
  assert.ok(prompt.tags.length <= core.LIMITS.tags);
  assert.ok(prompt.tags.every((tag) => tag.length <= core.LIMITS.tag));
}

const appConfig = json('app.json');
const projectConfig = json('project.config.json');
json('sitemap.json');
assert.ok(appConfig.pages.includes('pages/detail/detail'));
assert.ok(appConfig.pages.includes('pages/privacy/privacy'));
assert.equal(projectConfig.miniprogramRoot || './', './');

const appSource = read('app.js');
const localStore = read('utils/local-store.js');
const promptCore = read('utils/prompt-core.js');
const index = read('pages/index/index.js');
const indexWxml = read('pages/index/index.wxml');
const detail = read('pages/detail/detail.js');
const detailWxml = read('pages/detail/detail.wxml');
const favorites = read('pages/favorites/favorites.js');
const favoritesWxml = read('pages/favorites/favorites.wxml');
const custom = read('pages/custom/custom.js');
const customWxml = read('pages/custom/custom.wxml');
const privacy = read('pages/privacy/privacy.wxml');
const ads = read('utils/ads-config.js');

assert.match(appSource, /version: '1\.1\.0'/);
assert.match(appSource, /promptCount: builtins\.length/);
assert.match(localStore, /pv\.customPrompts\.v2/);
assert.match(localStore, /pv\.favoriteIds\.v2/);
assert.match(localStore, /migrateLegacy/);
assert.match(promptCore, /parseVariableToken/);
assert.match(promptCore, /variablesForLanguage/);

for (const [name, source] of [
  ['index.js', index],
  ['detail.js', detail],
  ['favorites.js', favorites],
  ['custom.js', custom],
]) {
  assert.ok(!source.includes("setStorageSync('currentPrompt'"), `${name} still writes the stale currentPrompt snapshot.`);
  assert.ok(!/\b113\b/.test(source), `${name} hard-codes the bundled prompt count.`);
  assert.ok(!/wx\.(?:request|uploadFile|downloadFile|cloud\.)/.test(source), `${name} added an undeclared remote data path.`);
}

assert.match(index, /currentTarget\.dataset\.id/);
assert.match(indexWxml, /data-id="\{\{item\.id\}\}"/);
assert.match(indexWxml, /wx:key="id"/);
assert.match(indexWxml, /favoriteSet\[item\.id\]/);
assert.ok(!indexWxml.includes('data-title='));
assert.match(detail, /core\.findPrompt/);
assert.match(detail, /core\.variablesForLanguage/);
assert.match(detail, /fail:/, 'Clipboard failures must be visible.');
assert.match(detailWxml, /wx:if="\{\{rewardedEnabled\}\}"/);
assert.match(detailWxml, /user-select="true"/);
assert.match(favoritesWxml, /wx:key="id"/);
assert.ok(!favoritesWxml.includes('data-title='));
assert.match(customWxml, /wx:key="id"/);
assert.match(customWxml, /bindtap="onEdit"/);
assert.match(custom, /saveCustomPrompts/);
assert.match(custom, /removePromptReferences/);

assert.match(privacy, /微信平台边界/);
assert.match(privacy, /首页 Banner/);
assert.match(privacy, /不发送到开发者服务器/);
assert.match(ads, /BANNER_AD_UNIT_ID: ''/);
assert.match(ads, /REWARDED_AD_UNIT_ID: ''/);

console.log(`✅ WeChat miniprogram contract passed with ${prompts.length} built-in prompts and storage v2 routing.`);
