// app.js
App({
  onLaunch() {
    // 初始化收藏列表（持久化到 storage）
    if (!wx.getStorageSync('favorites')) {
      wx.setStorageSync('favorites', []);
    }
    // 自定义 prompts（用户加的）
    if (!wx.getStorageSync('customPrompts')) {
      wx.setStorageSync('customPrompts', []);
    }
  },
  globalData: {
    version: '1.0.0',
    promptCount: 113
  }
});
