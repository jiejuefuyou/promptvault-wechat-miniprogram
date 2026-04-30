// pages/custom/custom.js
const STARTER_CUSTOM = {
  title: '示例：我的常用 prompt 模板',
  body: '我是 [角色]，正在做 [任务]。\n要求：\n1. 用 [语气] 回答\n2. 输出 [格式]\n3. 不要 [限制]\n\n具体内容：\n{{content}}',
  tags: ['示例', '模板'],
  desc_zh: '编辑/删除这条，写你自己常用的 prompt 模板',
  category: 'biz-life',
  _custom: true,
  _starter: true,
};

Page({
  data: {
    customPrompts: [],
    showAddDialog: false,
    newTitle: '',
    newBody: '',
    newTags: ''
  },

  onLoad() {
    // 首次进来预填 1 条示例（仅一次，storage 标记防重复）
    if (!wx.getStorageSync('starterCustomSeeded')) {
      const existing = wx.getStorageSync('customPrompts') || [];
      if (existing.length === 0) {
        wx.setStorageSync('customPrompts', [STARTER_CUSTOM]);
      }
      wx.setStorageSync('starterCustomSeeded', true);
    }
  },

  onShow() {
    this.setData({ customPrompts: wx.getStorageSync('customPrompts') || [] });
  },

  onGoAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  onGoPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
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
      wx.showToast({ title: '🤔 名字和内容都填一下嘛', icon: 'none' });
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
    wx.showToast({ title: '存好啦 🎉', icon: 'success' });
  },

  onPromptTap(e) {
    const idx = e.currentTarget.dataset.idx;
    wx.setStorageSync('currentPrompt', this.data.customPrompts[idx]);
    wx.navigateTo({ url: '/pages/detail/detail' });
  },

  onDelete(e) {
    const title = e.currentTarget.dataset.title;
    wx.showModal({
      title: '不要这条了？',
      content: `"${title}" 真的删掉？`,
      confirmText: '删',
      cancelText: '留着',
      success: res => {
        if (res.confirm) {
          let customPrompts = wx.getStorageSync('customPrompts') || [];
          customPrompts = customPrompts.filter(p => p.title !== title);
          wx.setStorageSync('customPrompts', customPrompts);
          this.setData({ customPrompts });
          wx.showToast({ title: '溜了 👋', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage() {
    return { title: 'PromptVault — 113 AI prompts in your pocket', path: '/pages/index/index' };
  }
});
