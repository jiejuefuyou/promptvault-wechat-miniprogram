// pages/index/index.js
const promptsData = require('../../utils/prompts.json');

Page({
  data: {
    keyword: '',
    activeTag: '',
    allTags: [],
    promptsAll: [],
    promptsFiltered: [],
    bannerAdUnitId: '', // user 在小程序后台拿 → 填进来
    showBannerAd: false
  },

  onLoad() {
    // 合并 starter + custom prompts
    const customPrompts = wx.getStorageSync('customPrompts') || [];
    const all = promptsData.concat(customPrompts);

    // 提取所有 tags（去重，按出现频率排序）
    const tagCount = {};
    all.forEach(p => (p.tags || []).forEach(t => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    }));
    const tags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]);

    this.setData({
      promptsAll: all,
      promptsFiltered: all,
      allTags: tags.slice(0, 30) // 显示 top 30 tags
    });
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
    // 通过全局缓存传 prompt 到 detail 页
    wx.setStorageSync('currentPrompt', prompt);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  onClearTag() {
    this.setData({ activeTag: '' });
    this.applyFilter();
  },

  onShareAppMessage() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带',
      path: '/pages/index/index',
      imageUrl: '' // TODO: 准备一张分享卡片图
    };
  },

  onShareTimeline() {
    return {
      title: 'PromptVault — 113 AI 提示词随身带（开源 / 离线 / 免费）',
      query: ''
    };
  }
});
