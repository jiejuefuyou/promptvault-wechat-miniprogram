// pages/custom/custom.js
Page({
  data: {
    customPrompts: [],
    showAddDialog: false,
    newTitle: '',
    newBody: '',
    newTags: ''   // comma-separated
  },

  onShow() {
    this.setData({ customPrompts: wx.getStorageSync('customPrompts') || [] });
  },

  onAddTap() {
    this.setData({ showAddDialog: true, newTitle: '', newBody: '', newTags: '' });
  },

  onCancelAdd() {
    this.setData({ showAddDialog: false });
  },

  // 阻止 dialog 内部点击冒泡到 mask（mask 触发 cancel）
  onDialogStop() {
    // intentional no-op
  },

  onTitleInput(e) { this.setData({ newTitle: e.detail.value }); },
  onBodyInput(e) { this.setData({ newBody: e.detail.value }); },
  onTagsInput(e) { this.setData({ newTags: e.detail.value }); },

  onSavePrompt() {
    const { newTitle, newBody, newTags } = this.data;
    if (!newTitle.trim() || !newBody.trim()) {
      wx.showToast({ title: '标题 + 内容必填', icon: 'none' });
      return;
    }
    const tags = newTags.split(/[,，]/).map(t => t.trim()).filter(Boolean);
    const prompt = {
      title: newTitle.trim(),
      body: newBody.trim(),
      tags: tags.length > 0 ? tags : ['Custom'],
      _custom: true
    };
    const customPrompts = wx.getStorageSync('customPrompts') || [];
    customPrompts.unshift(prompt);
    wx.setStorageSync('customPrompts', customPrompts);
    this.setData({ customPrompts, showAddDialog: false });
    wx.showToast({ title: '已添加', icon: 'success' });
  },

  onPromptTap(e) {
    const idx = e.currentTarget.dataset.idx;
    wx.setStorageSync('currentPrompt', this.data.customPrompts[idx]);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  onDelete(e) {
    const title = e.currentTarget.dataset.title;
    wx.showModal({
      title: '删除',
      content: `删除 "${title}"？`,
      success: res => {
        if (res.confirm) {
          let customPrompts = wx.getStorageSync('customPrompts') || [];
          customPrompts = customPrompts.filter(p => p.title !== title);
          wx.setStorageSync('customPrompts', customPrompts);
          this.setData({ customPrompts });
          wx.showToast({ title: '已删除', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 113 AI prompts in your pocket', path: '/pages/index/index' };
  }
});
