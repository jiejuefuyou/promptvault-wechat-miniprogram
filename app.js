// app.js
const prompts = require('./utils/prompts.js');
const articles = require('./utils/articles.js');

App({
  onLaunch() {
    // 初始化收藏 + 自定义 prompts storage
    if (!wx.getStorageSync('favorites')) wx.setStorageSync('favorites', []);
    if (!wx.getStorageSync('customPrompts')) wx.setStorageSync('customPrompts', []);
  },
  globalData: {
    version: '1.0.12',
    promptCount: prompts.length,        // 动态：随 prompts.js 自动算
    articleCount: articles.articles.length,
    surfaces: 5,                        // iOS / Web / Chrome / VSCode / 微信小程序
  },
});
