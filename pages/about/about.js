// pages/about/about.js
Page({
  data: {
    version: '1.0.7',
    promptCount: 113,
    articleCount: 8,
    surfaces: 5,
  },

  onCopyEmail() {
    wx.setClipboardData({
      data: 'jiejuefuyou@gmail.com',
      success: () => wx.showToast({ title: '邮箱已复制 📋', icon: 'none' }),
    });
  },

  onCopyGithub() {
    wx.setClipboardData({
      data: 'https://github.com/jiejuefuyou/promptvault-wechat-miniprogram',
      success: () => wx.showToast({ title: 'GitHub 链接已复制 📋', icon: 'none' }),
    });
  },

  onGoPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },

  onShareAppMessage() {
    return { title: 'AI 提示词小抄 — 113 条 + 中文说明 + 完全离线', path: '/pages/index/index' };
  },
});
