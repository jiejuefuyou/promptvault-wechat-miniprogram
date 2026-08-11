'use strict';

const app = getApp();

function copyText(value, successTitle) {
  wx.setClipboardData({
    data: value,
    success: () => wx.showToast({ title: successTitle, icon: 'success' }),
    fail: () => wx.showModal({
      title: '复制失败',
      content: value,
      showCancel: false,
    }),
  });
}

Page({
  data: {
    version: app.globalData.version,
    promptCount: app.globalData.promptCount,
    articleCount: app.globalData.articleCount,
    surfaces: app.globalData.surfaces,
  },

  onCopyEmail() {
    copyText('jiejuefuyou@gmail.com', '邮箱已复制');
  },

  onCopyGithub() {
    copyText('https://github.com/jiejuefuyou/promptvault-wechat-miniprogram', 'GitHub 链接已复制');
  },

  onGoPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },

  onShareAppMessage() {
    return {
      title: `AI 提示词小抄 — ${app.globalData.promptCount} 条内置 Prompt，本机填写与收藏`,
      path: '/pages/index/index',
    };
  },
});
