'use strict';

const rawPrompts = require('../../utils/prompts.js');
const core = require('../../utils/prompt-core.js');
const { createStore } = require('../../utils/local-store.js');

const BUILTINS = core.normalizeLibrary(rawPrompts, 'builtin');
const localStore = createStore(wx);

Page({
  data: {
    favorites: [],
  },

  onShow() {
    const customResult = localStore.loadCustomPrompts();
    const favoriteResult = localStore.loadFavoriteIds();
    if (!customResult.ok || !favoriteResult.ok) {
      const error = !customResult.ok ? customResult.error : favoriteResult.error;
      wx.showToast({ title: `收藏读取失败：${error}`, icon: 'none' });
      this.setData({ favorites: [] });
      return;
    }

    const all = core.mergeLibraries(BUILTINS, customResult.value);
    const byId = {};
    all.forEach((prompt) => { byId[prompt.id] = prompt; });
    const favorites = favoriteResult.value.map((id) => byId[id]).filter(Boolean);
    this.setData({ favorites });
  },

  onPromptTap(e) {
    const id = e.currentTarget.dataset.id;
    const prompt = core.findPrompt(this.data.favorites, id);
    if (!prompt) return;
    wx.navigateTo({ url: `/pages/detail/detail?id=${encodeURIComponent(prompt.id)}` });
  },

  onUnfavorite(e) {
    const id = e.currentTarget.dataset.id;
    const loaded = localStore.loadFavoriteIds();
    if (!loaded.ok) {
      wx.showToast({ title: `收藏读取失败：${loaded.error}`, icon: 'none' });
      return;
    }
    const saved = localStore.saveFavoriteIds(loaded.value.filter((value) => value !== id));
    if (!saved.ok) {
      wx.showToast({ title: `移除失败：${saved.error}`, icon: 'none' });
      return;
    }
    this.setData({ favorites: this.data.favorites.filter((prompt) => prompt.id !== id) });
    wx.showToast({ title: '已移出收藏', icon: 'none' });
  },

  onGoToAll() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  onClearAll() {
    wx.showModal({
      title: '清空全部收藏？',
      content: '只会清除收藏标记，不会删除自定义 Prompt。',
      confirmText: '清空',
      confirmColor: '#d73a49',
      cancelText: '取消',
      success: (result) => {
        if (!result.confirm) return;
        const saved = localStore.saveFavoriteIds([]);
        if (!saved.ok) {
          wx.showToast({ title: `清空失败：${saved.error}`, icon: 'none' });
          return;
        }
        this.setData({ favorites: [] });
        wx.showToast({ title: '收藏已清空', icon: 'none' });
      },
    });
  },

  onShareAppMessage() {
    return {
      title: `PromptVault — ${getApp().globalData.promptCount} 条内置 AI Prompt`,
      path: '/pages/index/index',
    };
  },
});
