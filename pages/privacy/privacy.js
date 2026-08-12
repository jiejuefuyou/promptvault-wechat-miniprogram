'use strict';

Page({
  onCopyEmail() {
    wx.setClipboardData({
      data: 'jiejuefuyou@gmail.com',
      success: () => wx.showToast({ title: '邮箱已复制', icon: 'success' }),
      fail: () => wx.showModal({
        title: '复制失败',
        content: '请手动复制：jiejuefuyou@gmail.com',
        showCancel: false,
      }),
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 隐私与广告说明', path: '/pages/privacy/privacy' };
  },
});
