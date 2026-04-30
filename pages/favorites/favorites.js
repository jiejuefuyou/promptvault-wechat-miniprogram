// pages/favorites/favorites.js
const promptsData = require('../../utils/prompts.json');

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
    wx.showToast({ title: '已移除', icon: 'none' });
  },

  onGoToAll() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onClearAll() {
    wx.showModal({
      title: '清空收藏',
      content: '确定移除所有收藏？',
      success: res => {
        if (res.confirm) {
          wx.setStorageSync('favorites', []);
          this.setData({ favorites: [] });
          wx.showToast({ title: '已清空', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 113 AI prompts in your pocket', path: '/pages/index/index' };
  }
});
