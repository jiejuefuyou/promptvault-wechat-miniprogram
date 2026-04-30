// pages/index/index.js
const promptsData = require('../../utils/prompts.js');
const adsConfig = require('../../utils/ads-config.js');

Page({
  data: {
    keyword: '',
    activeTag: '',
    allTags: [],
    promptsAll: [],
    promptsFiltered: [],
    favoriteSet: {},  // {title: true} for fast lookup
    bannerAdUnitId: adsConfig.BANNER_AD_UNIT_ID,
    showBannerAd: adsConfig.enableBanner && !!adsConfig.BANNER_AD_UNIT_ID
  },

  onLoad() {
    this.loadAllPrompts();
  },

  // 每次切回首页 tab 重新读 storage（用户可能在别处改了收藏 / 自定义）
  onShow() {
    this.refreshFavorites();
  },

  loadAllPrompts() {
    const customPrompts = wx.getStorageSync('customPrompts') || [];
    const all = promptsData.concat(customPrompts);

    const tagCount = {};
    all.forEach(p => (p.tags || []).forEach(t => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    }));
    const tags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]);

    this.setData({
      promptsAll: all,
      promptsFiltered: all,
      allTags: tags.slice(0, 30)
    });
    this.refreshFavorites();
  },

  refreshFavorites() {
    const favTitles = wx.getStorageSync('favorites') || [];
    const favoriteSet = {};
    favTitles.forEach(t => { favoriteSet[t] = true; });
    this.setData({ favoriteSet });
  },

  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase().trim();
    this.setData({ keyword });
    this.applyFilter();
  },

  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ activeTag: this.data.activeTag === tag ? '' : tag });
    this.applyFilter();
  },

  applyFilter() {
    const { keyword, activeTag, promptsAll } = this.data;
    let filtered = promptsAll;

    if (activeTag) {
      filtered = filtered.filter(p => (p.tags || []).includes(activeTag));
    }

    if (keyword) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(keyword) ||
        p.body.toLowerCase().includes(keyword) ||
        (p.tags || []).some(t => t.toLowerCase().includes(keyword))
      );
    }

    this.setData({ promptsFiltered: filtered });
  },

  onPromptTap(e) {
    const idx = e.currentTarget.dataset.idx;
    const prompt = this.data.promptsFiltered[idx];
    wx.setStorageSync('currentPrompt', prompt);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  // 内联收藏切换 — 不进 detail 页
  onToggleFavorite(e) {
    e.stopPropagation && e.stopPropagation();
    const title = e.currentTarget.dataset.title;
    let favTitles = wx.getStorageSync('favorites') || [];
    const isCurrentlyFav = favTitles.includes(title);

    if (isCurrentlyFav) {
      favTitles = favTitles.filter(t => t !== title);
    } else {
      favTitles.push(title);
    }
    wx.setStorageSync('favorites', favTitles);

    const favoriteSet = { ...this.data.favoriteSet };
    if (isCurrentlyFav) {
      delete favoriteSet[title];
    } else {
      favoriteSet[title] = true;
    }
    this.setData({ favoriteSet });

    wx.showToast({
      title: isCurrentlyFav ? '已取消收藏' : '★ 已收藏',
      icon: 'none',
      duration: 1000
    });
  },

  onClearTag() {
    this.setData({ activeTag: '' });
    this.applyFilter();
  },

  onShareAppMessage() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带',
      path: '/pages/index/index',
      imageUrl: ''
    };
  },

  onShareTimeline() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带（开源 / 离线 / 免费）',
      query: ''
    };
  }
});
