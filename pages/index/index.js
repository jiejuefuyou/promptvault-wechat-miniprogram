'use strict';

const rawPrompts = require('../../utils/prompts.js');
const categories = require('../../utils/categories.js');
const adsConfig = require('../../utils/ads-config.js');
const core = require('../../utils/prompt-core.js');
const { createStore } = require('../../utils/local-store.js');

const BUILTINS = core.normalizeLibrary(rawPrompts, 'builtin');
const localStore = createStore(wx);
const SORT_OPTIONS = [
  { id: 'default', label: '默认' },
  { id: 'recent', label: '最近用过' },
  { id: 'favorite', label: '收藏优先' },
  { id: 'alpha', label: '字母排序' },
];

function favoriteMap(ids) {
  const map = {};
  (ids || []).forEach((id) => { map[id] = true; });
  return map;
}

Page({
  data: {
    keyword: '',
    activeCategory: '',
    activeTag: '',
    sortBy: 'default',
    viewMode: 'card',
    categories,
    sortOptions: SORT_OPTIONS,
    promptsAll: [],
    promptsFiltered: [],
    availableTags: [],
    favoriteSet: {},
    recentPrompts: [],
    searchHistory: [],
    bannerAdUnitId: adsConfig.BANNER_AD_UNIT_ID,
    showBannerAd: adsConfig.enableBanner && Boolean(adsConfig.BANNER_AD_UNIT_ID),
    showSortMenu: false,
  },

  onShow() {
    this.loadAll();
  },

  loadAll() {
    const customResult = localStore.loadCustomPrompts();
    const favoriteResult = localStore.loadFavoriteIds();
    const recentResult = localStore.loadRecents();
    const historyResult = localStore.loadSearchHistory();

    this.reportStorageFailure(customResult, favoriteResult, recentResult, historyResult);
    const customs = customResult.ok ? customResult.value : [];
    const all = core.mergeLibraries(BUILTINS, customs);
    this.setData({
      promptsAll: all,
      favoriteSet: favoriteMap(favoriteResult.ok ? favoriteResult.value : []),
      recentPrompts: recentResult.ok ? recentResult.value : [],
      searchHistory: historyResult.ok ? historyResult.value : [],
    }, () => this.applyFilter());
  },

  reportStorageFailure(...results) {
    const failed = results.find((result) => result && !result.ok);
    const appError = getApp().globalData.storageError;
    const error = failed && failed.error ? failed.error : appError;
    if (!error || this._lastStorageError === error) return;
    this._lastStorageError = error;
    wx.showToast({ title: `本地数据读取失败：${error}`, icon: 'none', duration: 2600 });
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id || '';
    this.setData({
      activeCategory: this.data.activeCategory === id ? '' : id,
      activeTag: '',
    }, () => this.applyFilter());
  },

  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag || '';
    this.setData({ activeTag: this.data.activeTag === tag ? '' : tag }, () => this.applyFilter());
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value || '' }, () => this.applyFilter());
  },

  onSearchConfirm(e) {
    const keyword = String(e.detail.value || '').trim().slice(0, 80);
    if (!keyword) return;
    const history = [keyword].concat(this.data.searchHistory.filter((item) => item !== keyword)).slice(0, 8);
    const saved = localStore.saveSearchHistory(history);
    if (!saved.ok) {
      wx.showToast({ title: `搜索记录没存上：${saved.error}`, icon: 'none' });
      return;
    }
    this.setData({ searchHistory: history });
  },

  onSearchClear() {
    this.setData({ keyword: '' }, () => this.applyFilter());
  },

  onSearchHistoryTap(e) {
    this.setData({ keyword: e.currentTarget.dataset.kw || '' }, () => this.applyFilter());
  },

  onClearSearchHistory() {
    const saved = localStore.saveSearchHistory([]);
    if (!saved.ok) {
      wx.showToast({ title: `清空失败：${saved.error}`, icon: 'none' });
      return;
    }
    this.setData({ searchHistory: [] });
    wx.showToast({ title: '搜索记录已清空', icon: 'none' });
  },

  onSortToggle() {
    this.setData({ showSortMenu: !this.data.showSortMenu });
  },

  onSortSelect(e) {
    this.setData({ sortBy: e.currentTarget.dataset.id || 'default', showSortMenu: false }, () => this.applyFilter());
  },

  onViewModeToggle() {
    this.setData({ viewMode: this.data.viewMode === 'card' ? 'compact' : 'card' });
  },

  applyFilter() {
    const { keyword, activeCategory, activeTag, sortBy, promptsAll, favoriteSet, recentPrompts } = this.data;
    let categoryPool = activeCategory
      ? promptsAll.filter((prompt) => prompt.category === activeCategory)
      : promptsAll.slice();

    const tagCount = {};
    categoryPool.forEach((prompt) => (prompt.tags || []).forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }));
    const availableTags = Object.keys(tagCount)
      .sort((left, right) => tagCount[right] - tagCount[left] || left.localeCompare(right, 'zh-CN'))
      .slice(0, 20);

    if (activeTag) {
      categoryPool = categoryPool.filter((prompt) => prompt.tags.indexOf(activeTag) >= 0);
    }
    let filtered = core.searchPrompts(categoryPool, keyword);

    if (sortBy === 'recent') {
      const recentOrder = {};
      recentPrompts.forEach((entry, index) => { recentOrder[entry.id] = index; });
      filtered = filtered.slice().sort((left, right) => {
        const leftIndex = recentOrder[left.id] === undefined ? Number.MAX_SAFE_INTEGER : recentOrder[left.id];
        const rightIndex = recentOrder[right.id] === undefined ? Number.MAX_SAFE_INTEGER : recentOrder[right.id];
        return leftIndex - rightIndex;
      });
    } else if (sortBy === 'favorite') {
      filtered = filtered.slice().sort((left, right) => Number(Boolean(favoriteSet[right.id])) - Number(Boolean(favoriteSet[left.id])));
    } else if (sortBy === 'alpha') {
      filtered = filtered.slice().sort((left, right) => left.title.localeCompare(right.title, 'zh-CN'));
    }

    this.setData({ promptsFiltered: filtered, availableTags });
  },

  onToggleFavorite(e) {
    const id = e.currentTarget.dataset.id;
    const result = localStore.toggleFavorite(id);
    if (!result.ok) {
      wx.showToast({ title: `收藏没存上：${result.error}`, icon: 'none' });
      return;
    }
    this.setData({ favoriteSet: favoriteMap(result.value) }, () => {
      if (this.data.sortBy === 'favorite') this.applyFilter();
    });
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消收藏', icon: 'none', duration: 800 });
  },

  onPromptTap(e) {
    const id = e.currentTarget.dataset.id;
    const prompt = core.findPrompt(this.data.promptsFiltered, id);
    if (!prompt) {
      wx.showToast({ title: '这条 Prompt 已不存在', icon: 'none' });
      return;
    }
    const recent = localStore.recordRecent(prompt.id, Date.now());
    if (!recent.ok) console.warn('PromptVault recent history write failed:', recent.error);
    wx.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(prompt.id)}` });
  },

  onClearAll() {
    this.setData({ keyword: '', activeCategory: '', activeTag: '', sortBy: 'default' }, () => this.applyFilter());
  },

  onDialogStop() {},

  onShareAppMessage() {
    return {
      title: `PromptVault — ${this.data.promptsAll.length} 条 AI 提示词随身带`,
      path: '/pages/index/index',
    };
  },

  onShareTimeline() {
    return {
      title: `PromptVault — ${this.data.promptsAll.length} 条 AI 提示词（本地保存 / 开源）`,
      query: '',
    };
  },
});
