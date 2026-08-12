'use strict';

const rawPrompts = require('./utils/prompts.js');
const articles = require('./utils/articles.js');
const core = require('./utils/prompt-core.js');
const { createStore } = require('./utils/local-store.js');

const builtins = core.normalizeLibrary(rawPrompts, 'builtin');
const localStore = createStore(wx);

App({
  onLaunch() {
    const migration = localStore.migrateLegacy(builtins, Date.now());
    if (!migration.ok) {
      this.globalData.storageError = migration.error || '本地数据迁移失败';
      console.error('PromptVault local storage migration failed:', migration.error);
    }
  },

  globalData: {
    version: '1.1.0',
    promptCount: builtins.length,
    articleCount: articles.articles.length,
    surfaces: 5,
    storageError: '',
  },
});
