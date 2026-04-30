// pages/index/index.js
const promptsData = require('../../utils/prompts.js');
const categories = require('../../utils/categories.js');
const adsConfig = require('../../utils/ads-config.js');

const SORT_OPTIONS = [
  { id: 'default', label: '默认' },
  { id: 'recent', label: '最近用过' },
  { id: 'favorite', label: '收藏优先' },
  { id: 'alpha', label: '字母排序' },
];

Page({
  data: {
    keyword: '',
    activeCategory: '',  // '' = 全部
    activeTag: '',
    sortBy: 'default',
    viewMode: 'card',    // 'card' | 'compact'

    categories,
    sortOptions: SORT_OPTIONS,

    promptsAll: [],
    promptsFiltered: [],

    // 当前 category 下的可用 tags
    availableTags: [],

    favoriteSet: {},
    recentTitles: [],   // [{title, ts}]
    searchHistory: [],  // ['kw1', 'kw2', ...]

    bannerAdUnitId: adsConfig.BANNER_AD_UNIT_ID,
    showBannerAd: adsConfig.enableBanner && !!adsConfig.BANNER_AD_UNIT_ID,

    showSortMenu: false,
  },

  onLoad() {
    this.loadAll();
  },

  onShow() {
    this.refreshUserState();
    this.applyFilter();
  },

  loadAll() {
    const customPrompts = wx.getStorageSync('customPrompts') || [];
    // custom prompts 默认归 biz-life 大类（除非他们有 category 字段）
    customPrompts.forEach(p => { if (!p.category) p.category = 'biz-life'; });
    const all = promptsData.concat(customPrompts);
    this.setData({ promptsAll: all });
    this.refreshUserState();
    this.applyFilter();
  },

  refreshUserState() {
    const favTitles = wx.getStorageSync('favorites') || [];
    const favoriteSet = {};
    favTitles.forEach(t => { favoriteSet[t] = true; });

    const recents = wx.getStorageSync('recentPrompts') || [];
    const searchHistory = wx.getStorageSync('searchHistory') || [];

    this.setData({ favoriteSet, recentTitles: recents, searchHistory });
  },

  // === 分类切换 ===
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    const next = this.data.activeCategory === id ? '' : id;
    this.setData({ activeCategory: next, activeTag: '' });
    this.applyFilter();
  },

  // === 子标签切换 ===
  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ activeTag: this.data.activeTag === tag ? '' : tag });
    this.applyFilter();
  },

  // === 搜索 ===
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value });
    this.applyFilter();
  },

  onSearchConfirm(e) {
    const kw = (e.detail.value || '').trim();
    if (!kw) return;
    let history = this.data.searchHistory.filter(h => h !== kw);
    history.unshift(kw);
    history = history.slice(0, 5);
    wx.setStorageSync('searchHistory', history);
    this.setData({ searchHistory: history });
  },

  onSearchClear() {
    this.setData({ keyword: '' });
    this.applyFilter();
  },

  onSearchHistoryTap(e) {
    const kw = e.currentTarget.dataset.kw;
    this.setData({ keyword: kw });
    this.applyFilter();
  },

  onClearSearchHistory() {
    wx.setStorageSync('searchHistory', []);
    this.setData({ searchHistory: [] });
    wx.showToast({ title: '已清空', icon: 'none' });
  },

  // === 排序 ===
  onSortToggle() {
    this.setData({ showSortMenu: !this.data.showSortMenu });
  },

  onSortSelect(e) {
    const sortBy = e.currentTarget.dataset.id;
    this.setData({ sortBy, showSortMenu: false });
    this.applyFilter();
  },

  // === 视图模式 ===
  onViewModeToggle() {
    this.setData({ viewMode: this.data.viewMode === 'card' ? 'compact' : 'card' });
  },

  // === 主过滤逻辑 ===
  applyFilter() {
    const { keyword, activeCategory, activeTag, sortBy, promptsAll, favoriteSet, recentTitles } = this.data;

    let filtered = promptsAll;

    // 1. 大类过滤
    if (activeCategory) {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // 2. 提取该 category 下可用 tags（按出现次数）
    const tagCount = {};
    filtered.forEach(p => (p.tags || []).forEach(t => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    }));
    const availableTags = Object.keys(tagCount)
      .sort((a, b) => tagCount[b] - tagCount[a])
      .slice(0, 20);

    // 3. 子 tag 过滤
    if (activeTag) {
      filtered = filtered.filter(p => (p.tags || []).includes(activeTag));
    }

    // 4. 关键词搜索（含 desc_zh）
    if (keyword) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(kw) ||
        p.body.toLowerCase().includes(kw) ||
        (p.desc_zh && p.desc_zh.toLowerCase().includes(kw)) ||
        (p.tags || []).some(t => t.toLowerCase().includes(kw))
      );
    }

    // 5. 排序
    if (sortBy === 'recent') {
      const recentMap = {};
      recentTitles.forEach((r, i) => { recentMap[r.title] = i; });
      filtered = [...filtered].sort((a, b) => {
        const ai = recentMap[a.title] !== undefined ? recentMap[a.title] : 999;
        const bi = recentMap[b.title] !== undefined ? recentMap[b.title] : 999;
        return ai - bi;
      });
    } else if (sortBy === 'favorite') {
      filtered = [...filtered].sort((a, b) => {
        const af = favoriteSet[a.title] ? 1 : 0;
        const bf = favoriteSet[b.title] ? 1 : 0;
        return bf - af;
      });
    } else if (sortBy === 'alpha') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
    }
    // default: 保持 promptsAll 的原顺序

    this.setData({ promptsFiltered: filtered, availableTags });
  },

  // === 内联收藏切换 ===
  onToggleFavorite(e) {
    const title = e.currentTarget.dataset.title;
    let favTitles = wx.getStorageSync('favorites') || [];
    const isFav = favTitles.includes(title);

    if (isFav) {
      favTitles = favTitles.filter(t => t !== title);
    } else {
      favTitles.push(title);
    }
    wx.setStorageSync('favorites', favTitles);

    const favoriteSet = { ...this.data.favoriteSet };
    if (isFav) delete favoriteSet[title]; else favoriteSet[title] = true;
    this.setData({ favoriteSet });

    wx.showToast({ title: isFav ? '已取消' : '★ 已收藏', icon: 'none', duration: 800 });
  },

  // === 进入 detail ===
  onPromptTap(e) {
    const idx = e.currentTarget.dataset.idx;
    const prompt = this.data.promptsFiltered[idx];

    // 记录到 recent (max 30)
    let recents = wx.getStorageSync('recentPrompts') || [];
    recents = recents.filter(r => r.title !== prompt.title);
    recents.unshift({ title: prompt.title, ts: Date.now() });
    recents = recents.slice(0, 30);
    wx.setStorageSync('recentPrompts', recents);

    wx.setStorageSync('currentPrompt', prompt);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  // === 清除筛选 ===
  onClearAll() {
    this.setData({ keyword: '', activeCategory: '', activeTag: '', sortBy: 'default' });
    this.applyFilter();
  },

  // No-op for catch:tap on inner dialog (prevents bubbling to mask)
  onDialogStop() {},

  onShareAppMessage() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带',
      path: '/pages/index/index',
    };
  },

  onShareTimeline() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带（开源 / 离线 / 免费）',
      query: '',
    };
  },
});
