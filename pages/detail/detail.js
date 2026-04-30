// pages/detail/detail.js
const adsConfig = require('../../utils/ads-config.js');

function hasChinese(s) {
  return /[一-鿿]/.test(s || '');
}

Page({
  data: {
    prompt: null,
    variables: [],
    filledBody: '',
    currentLang: 'zh',          // 'zh' or 'en' — 当前显示版本
    hasBilingual: false,        // 是否有中英两版可切
    rewardedAdReady: false,
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

    // 判断是否双语：body_zh 存在且与 body 不同 = 双语
    const hasBilingual = !!prompt.body_zh && prompt.body_zh !== prompt.body;
    // 默认显示中文版（如果有），其次回退到 body
    const defaultLang = hasBilingual && hasChinese(prompt.body_zh) ? 'zh' : (hasChinese(prompt.body) ? 'zh' : 'en');
    const initialBody = (defaultLang === 'zh' && prompt.body_zh) ? prompt.body_zh : prompt.body;

    // 提取 {{xxx}} 变量（用 initialBody 提取）
    const matches = initialBody.match(/\{\{([^}]+)\}\}/g) || [];
    const uniqueKeys = [...new Set(matches.map(m => m.slice(2, -2).trim()))];
    const variables = uniqueKeys.map(k => ({ key: k, value: '' }));

    const favorites = wx.getStorageSync('favorites') || [];
    const isFav = favorites.includes(prompt.title);

    this.setData({
      prompt,
      variables,
      filledBody: initialBody,
      currentLang: defaultLang,
      hasBilingual,
      isFavorited: isFav,
    });

    this.loadRewardedAd();
  },

  // 中/英切换
  onLangToggle() {
    if (!this.data.hasBilingual) return;
    const nextLang = this.data.currentLang === 'zh' ? 'en' : 'zh';
    this.setData({ currentLang: nextLang }, () => {
      this.updateFilledBody();
    });
    wx.showToast({ title: nextLang === 'zh' ? '已切到中文版' : 'Switched to EN', icon: 'none', duration: 800 });
  },

  // 当前显示哪个 body
  getCurrentBody() {
    const { prompt, currentLang } = this.data;
    if (currentLang === 'zh' && prompt.body_zh) return prompt.body_zh;
    return prompt.body;
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
    let body = this.getCurrentBody();
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
        wx.showToast({ title: '📋 复制好了，去用吧！', icon: 'none' });
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
        wx.showToast({ title: '🎬 看完才有升级版哦', icon: 'none' });
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
      wx.showToast({ title: '⏳ 广告还在加载', icon: 'none' });
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
          title: '🎁 升级版搞定！',
          content: '加了专家口吻 + 不懂会主动问你，粘贴到 ChatGPT/Claude 试试',
          showCancel: false,
          confirmText: '好嘞'
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
      title: this.data.isFavorited ? '★ 收下啦！' : '溜了 👋',
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
