'use strict';

const core = require('../../utils/prompt-core.js');
const { createStore } = require('../../utils/local-store.js');

const localStore = createStore(wx);
const STARTER_CUSTOM = Object.freeze({
  title: '示例：我的常用 Prompt 模板',
  body: '我是 {{role:string=产品经理}}，正在做 {{task}}。\n要求：\n1. 用 {{tone:string=简洁}} 回答\n2. 输出 {{format:string=Markdown}}\n3. 不要编造不确定的信息\n\n具体内容：\n{{content:multiline=}}',
  tags: ['示例', '模板'],
  desc_zh: '可以编辑或删除；展示 typed variable 和默认值写法',
  category: 'biz-life',
  _starter: true,
});

Page({
  data: {
    customPrompts: [],
    showAddDialog: false,
    editingId: '',
    newTitle: '',
    newBody: '',
    newTags: '',
  },

  onLoad() {
    this.seedStarterIfNeeded();
  },

  onShow() {
    this.reloadCustomPrompts();
  },

  seedStarterIfNeeded() {
    if (localStore.isStarterSeeded()) return;
    const loaded = localStore.loadCustomPrompts();
    if (!loaded.ok) {
      wx.showToast({ title: `示例初始化失败：${loaded.error}`, icon: 'none' });
      return;
    }
    if (loaded.value.length === 0) {
      try {
        const starter = core.createCustomPrompt(STARTER_CUSTOM, Date.now(), 'starter');
        const saved = localStore.saveCustomPrompts([starter]);
        if (!saved.ok) {
          wx.showToast({ title: `示例没存上：${saved.error}`, icon: 'none' });
          return;
        }
      } catch (error) {
        wx.showToast({ title: `示例数据无效：${error.message}`, icon: 'none' });
        return;
      }
    }
    const marked = localStore.markStarterSeeded();
    if (!marked.ok) console.warn('PromptVault starter marker write failed:', marked.error);
  },

  reloadCustomPrompts() {
    const loaded = localStore.loadCustomPrompts();
    if (!loaded.ok) {
      wx.showToast({ title: `自定义 Prompt 读取失败：${loaded.error}`, icon: 'none' });
      this.setData({ customPrompts: [] });
      return;
    }
    this.setData({ customPrompts: loaded.value });
  },

  onGoAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  },

  onGoPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  },

  onAddTap() {
    this.setData({
      showAddDialog: true,
      editingId: '',
      newTitle: '',
      newBody: '',
      newTags: '',
    });
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id;
    const prompt = core.findPrompt(this.data.customPrompts, id);
    if (!prompt) {
      wx.showToast({ title: '这条 Prompt 已不存在', icon: 'none' });
      return;
    }
    this.setData({
      showAddDialog: true,
      editingId: prompt.id,
      newTitle: prompt.title,
      newBody: prompt.body,
      newTags: prompt.tags.join(', '),
    });
  },

  onCancelAdd() {
    this.setData({
      showAddDialog: false,
      editingId: '',
      newTitle: '',
      newBody: '',
      newTags: '',
    });
  },

  onDialogStop() {},
  onTitleInput(e) { this.setData({ newTitle: e.detail.value || '' }); },
  onBodyInput(e) { this.setData({ newBody: e.detail.value || '' }); },
  onTagsInput(e) { this.setData({ newTags: e.detail.value || '' }); },

  onSavePrompt() {
    const title = this.data.newTitle.trim();
    const body = this.data.newBody.trim();
    if (!title || !body) {
      wx.showToast({ title: '标题和内容都需要填写', icon: 'none' });
      return;
    }

    const tags = this.data.newTags
      .split(/[,，]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
    const current = this.data.customPrompts.slice();

    try {
      let candidate;
      let next;
      if (this.data.editingId) {
        const index = current.findIndex((prompt) => prompt.id === this.data.editingId);
        if (index < 0) throw new Error('要编辑的 Prompt 已不存在。');
        const existing = current[index];
        candidate = core.normalizedPrompt({
          ...existing,
          title,
          body,
          tags: tags.length > 0 ? tags : ['Custom'],
        }, { source: 'custom', index });
        if (core.duplicateContent(current, candidate, existing.id)) {
          throw new Error('已经有一条标题和内容完全相同的 Prompt。');
        }
        next = current.slice();
        next[index] = candidate;
      } else {
        candidate = core.createCustomPrompt({
          title,
          body,
          tags: tags.length > 0 ? tags : ['Custom'],
          category: 'biz-life',
        }, Date.now());
        if (core.duplicateContent(current, candidate, '')) {
          throw new Error('已经有一条标题和内容完全相同的 Prompt。');
        }
        next = [candidate].concat(current);
      }

      const saved = localStore.saveCustomPrompts(next);
      if (!saved.ok) throw new Error(saved.error || '本地写入失败');
      this.setData({
        customPrompts: saved.value,
        showAddDialog: false,
        editingId: '',
        newTitle: '',
        newBody: '',
        newTags: '',
      });
      wx.showToast({ title: this.data.editingId ? '已更新' : '已保存', icon: 'success' });
    } catch (error) {
      wx.showModal({
        title: '没有保存',
        content: error.message || String(error),
        showCancel: false,
      });
    }
  },

  onPromptTap(e) {
    const id = e.currentTarget.dataset.id;
    const prompt = core.findPrompt(this.data.customPrompts, id);
    if (!prompt) return;
    wx.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(prompt.id)}` });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    const prompt = core.findPrompt(this.data.customPrompts, id);
    if (!prompt) return;
    wx.showModal({
      title: '删除这条 Prompt？',
      content: `“${prompt.title}” 会从本机永久删除。`,
      confirmText: '删除',
      confirmColor: '#d73a49',
      cancelText: '保留',
      success: (result) => {
        if (!result.confirm) return;
        const next = this.data.customPrompts.filter((item) => item.id !== id);
        const saved = localStore.saveCustomPrompts(next);
        if (!saved.ok) {
          wx.showToast({ title: `删除失败：${saved.error}`, icon: 'none' });
          return;
        }
        const cleaned = localStore.removePromptReferences(id);
        if (!cleaned.ok) console.warn('PromptVault reference cleanup failed:', cleaned.error);
        this.setData({ customPrompts: saved.value });
        wx.showToast({ title: '已删除', icon: 'none' });
      },
    });
  },

  onShareAppMessage() {
    return {
      title: `PromptVault — ${getApp().globalData.promptCount + this.data.customPrompts.length} 条本地 AI Prompt`,
      path: '/pages/index/index',
    };
  },
});
