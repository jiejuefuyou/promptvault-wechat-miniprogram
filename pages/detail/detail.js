// pages/detail/detail.js
const adsConfig = require('../../utils/ads-config.js');

Page({
  data: {
    prompt: null,
    variables: [],          // [{ key: 'text', value: '' }]
    filledBody: '',
    rewardedAdReady: false, // 激励视频可用
    rewardedAdUnitId: adsConfig.REWARDED_AD_UNIT_ID,
    rewardedEnabled: adsConfig.enableRewarded && !!adsConfig.REWARDED_AD_UNIT_ID,
    isFavorited: false
  },

  onLoad() {
    const prompt = wx.getStorageSync('currentPrompt');
    if (!prompt) {
      wx.showToast({ title: '加载失败', icon: 'none' });
      return;
    }

    // 提取 {{xxx}} 变量
    const matches = prompt.body.match(/\{\{([^}]+)\}\}/g) || [];
    const uniqueKeys = [...new Set(matches.map(m => m.slice(2, -2).trim()))];
    const variables = uniqueKeys.map(k => ({ key: k, value: '' }));

    // 检查是否已收藏
    const favorites = wx.getStorageSync('favorites') || [];
    const isFav = favorites.includes(prompt.title);

    this.setData({
      prompt,
      variables,
      filledBody: prompt.body,
      isFavorited: isFav
    });

    // 预加载激励视频
    this.loadRewardedAd();
  },

  onVarInput(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    const variables = this.data.variables.map(v =>
      v.key === key ? { ...v, value } : v
    );
    this.setData({ variables }, () => this.updateFilledBody());
  },

  updateFilledBody() {
    let body = this.data.prompt.body;
    this.data.variables.forEach(v => {
      const re = new RegExp(`\\{\\{${this.escapeRegex(v.key)}\\}\\}`, 'g');
      body = body.replace(re, v.value || `{{${v.key}}}`);
    });
    this.setData({ filledBody: body });
  },

  escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  onCopy() {
    wx.setClipboardData({
      data: this.data.filledBody,
      success: () => {
        wx.showToast({ title: '✅ 已复制', icon: 'none' });
      }
    });
  },

  // 激励视频：让用户主动看完得"专业增强 prompt"（增加 GPT-style 系统级 prefix）
  loadRewardedAd() {
    if (!this.data.rewardedAdUnitId) return;
    if (!wx.createRewardedVideoAd) {
      console.log('SDK 不支持激励视频');
      return;
    }
    this.rewardedAd = wx.createRewardedVideoAd({
      adUnitId: this.data.rewardedAdUnitId
    });
    this.rewardedAd.onLoad(() => {
      this.setData({ rewardedAdReady: true });
    });
    this.rewardedAd.onError(err => console.warn('激励视频错误', err));
    this.rewardedAd.onClose(res => {
      if (res && res.isEnded) {
        this.applyEnhancement();
      } else {
        wx.showToast({ title: '需要看完才能解锁', icon: 'none' });
      }
    });
  },

  onWatchAdEnhance() {
    if (!this.data.rewardedAdUnitId) {
      // 流量主未开通时，直接 enhance（开发期）
      this.applyEnhancement();
      return;
    }
    if (!this.rewardedAd) {
      wx.showToast({ title: '广告加载中', icon: 'none' });
      return;
    }
    this.rewardedAd.show().catch(() => {
      this.rewardedAd.load().then(() => this.rewardedAd.show());
    });
  },

  applyEnhancement() {
    // 在 prompt 前后加专业级 prefix/suffix
    const prefix = `You are an expert assistant. Be precise and concise. Skip preamble.\n\n`;
    const suffix = `\n\nIf any part is ambiguous, ask 1 clarifying question before answering.`;
    const enhanced = prefix + this.data.filledBody + suffix;
    wx.setClipboardData({
      data: enhanced,
      success: () => {
        wx.showModal({
          title: '🎁 专业版 prompt 已复制',
          content: '已加入 expert system prompt + 主动澄清要求。粘贴到 ChatGPT / Claude 即可。',
          showCancel: false
        });
      }
    });
  },

  onToggleFavorite() {
    let favorites = wx.getStorageSync('favorites') || [];
    if (this.data.isFavorited) {
      favorites = favorites.filter(t => t !== this.data.prompt.title);
    } else {
      favorites.push(this.data.prompt.title);
    }
    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorited: !this.data.isFavorited });
    wx.showToast({
      title: this.data.isFavorited ? '已收藏' : '已取消',
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: `PromptVault: ${this.data.prompt.title}`,
      path: '/pages/index/index'
    };
  }
});
