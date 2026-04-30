// pages/privacy/privacy.js
Page({
  onCopyEmail() {
    wx.setClipboardData({
      data: 'jiejuefuyou@gmail.com',
      success: () => wx.showToast({ title: '邮箱已复制 📋', icon: 'none' }),
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 隐私说明', path: '/pages/privacy/privacy' };
  },
});
