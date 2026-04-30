// pages/favorites/favorites.js
const promptsData = require('../../utils/prompts.js');

Page({
  data: {
    favorites: []
  },

  onShow() {
    // 每次切到 tab 重新读 storage（用户在别处可能改了）
    const favTitles = wx.getStorageSync('favorites') || [];
    const customPrompts = wx.getStorageSync('customPrompts') || [];
    const allPrompts = promptsData.concat(customPrompts);
    const favorites = allPrompts.filter(p => favTitles.includes(p.title));
    this.setData({ favorites });
  },

  onPromptTap(e) {
    const idx = e.currentTarget.dataset.idx;
    const prompt = this.data.favorites[idx];
    wx.setStorageSync('currentPrompt', prompt);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  onUnfavorite(e) {
    const title = e.currentTarget.dataset.title;
    let favTitles = wx.getStorageSync('favorites') || [];
    favTitles = favTitles.filter(t => t !== title);
    wx.setStorageSync('favorites', favTitles);
    this.setData({
      favorites: this.data.favorites.filter(p => p.title !== title)
    });
    wx.showToast({ title: '溜了 👋', icon: 'none' });
  },

  onGoToAll() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onClearAll() {
    wx.showModal({
      title: '真的全部清掉？',
      content: '收藏的小可爱们就再见了哦 😢',
      confirmText: '清掉',
      cancelText: '再想想',
      success: res => {
        if (res.confirm) {
          wx.setStorageSync('favorites', []);
          this.setData({ favorites: [] });
          wx.showToast({ title: '清空啦 🧹', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 113 AI prompts in your pocket', path: '/pages/index/index' };
  }
});
