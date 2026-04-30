// pages/articles/articles.js
const articlesData = require('../../utils/articles.js');

Page({
  data: {
    categories: articlesData.categories,
    activeCat: 'all',
    articles: articlesData.articles,
    filtered: articlesData.articles,
  },

  onLoad() {
    this.applyFilter();
  },

  onCatTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeCat: id });
    this.applyFilter();
  },

  applyFilter() {
    const { activeCat, articles } = this.data;
    const filtered = activeCat === 'all'
      ? articles
      : articles.filter(a => a.category === activeCat);
    this.setData({ filtered });
  },

  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    const article = this.data.articles.find(a => a.id === id);
    if (!article) return;
    wx.setStorageSync('currentArticle', article);
    wx.navigateTo({ url: '/pages/article-detail/article-detail' });
  },

  onShareAppMessage() {
    return {
      title: 'PromptVault — AI 提示词 + 实战要点',
      path: '/pages/articles/articles',
    };
  },
});
