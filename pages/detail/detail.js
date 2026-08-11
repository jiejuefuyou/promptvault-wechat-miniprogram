'use strict';

const rawPrompts = require('../../utils/prompts.js');
const adsConfig = require('../../utils/ads-config.js');
const core = require('../../utils/prompt-core.js');
const { createStore } = require('../../utils/local-store.js');

const BUILTINS = core.normalizeLibrary(rawPrompts, 'builtin');
const localStore = createStore(wx);
const REWARDED_AD_LOAD_TIMEOUT_MS = 8000;

function hasChinese(value) {
  return /[\u3400-\u9fff]/.test(value || '');
}

function variableError(variable) {
  if (variable.type === 'int' && variable.value && !/^-?\d+$/.test(variable.value)) {
    return '请输入整数，或留空保留占位符';
  }
  return '';
}

function decorateVariables(variables) {
  const labels = { string: '单行文字', int: '整数', multiline: '多行文字' };
  return (variables || []).map((variable) => ({
    ...variable,
    typeLabel: labels[variable.type] || labels.string,
    defaultHint: variable.defaultValue === null
      ? '留空会保留占位符'
      : `默认：${variable.defaultValue || '空'}`,
    error: variableError(variable),
  }));
}

function safeDecodeId(value) {
  const raw = String(value || '');
  try {
    return decodeURIComponent(raw);
  } catch (error) {
    return '';
  }
}

Page({
  data: {
    prompt: null,
    variables: [],
    filledBody: '',
    currentLang: 'zh',
    hasBilingual: false,
    hasVariableErrors: false,
    rewardedAdReady: false,
    rewardedAdState: 'idle',
    rewardedAdUnitId: adsConfig.REWARDED_AD_UNIT_ID,
    rewardedEnabled: adsConfig.enableRewarded && Boolean(adsConfig.REWARDED_AD_UNIT_ID),
    isFavorited: false,
  },

  onLoad(options) {
    this.promptId = safeDecodeId(options && options.id);
    if (!this.promptId) {
      this.showLoadFailure('分享链接缺少有效的 Prompt ID。');
      return;
    }
    this.loadPrompt();
  },

  onUnload() {
    if (this._adLoadTimer) {
      clearTimeout(this._adLoadTimer);
      this._adLoadTimer = null;
    }
    if (!this.rewardedAd) return;
    if (this._onAdLoad && this.rewardedAd.offLoad) this.rewardedAd.offLoad(this._onAdLoad);
    if (this._onAdError && this.rewardedAd.offError) this.rewardedAd.offError(this._onAdError);
    if (this._onAdClose && this.rewardedAd.offClose) this.rewardedAd.offClose(this._onAdClose);
    this.rewardedAd = null;
  },

  loadPrompt() {
    const customResult = localStore.loadCustomPrompts();
    if (!customResult.ok) {
      this.showLoadFailure(`本地 Prompt 读取失败：${customResult.error}`);
      return;
    }
    const library = core.mergeLibraries(BUILTINS, customResult.value);
    const prompt = core.findPrompt(library, this.promptId);
    if (!prompt) {
      this.showLoadFailure('这条 Prompt 已删除、数据已更新，或分享链接无效。');
      return;
    }

    const hasBilingual = Boolean(prompt.body_zh && prompt.body_zh !== prompt.body);
    const defaultLang = hasBilingual && hasChinese(prompt.body_zh)
      ? 'zh'
      : (hasChinese(prompt.body) ? 'zh' : 'en');
    const variables = decorateVariables(core.variablesForLanguage(prompt, defaultLang, []));
    const favoriteResult = localStore.loadFavoriteIds();
    if (!favoriteResult.ok) console.warn('PromptVault favorite read failed:', favoriteResult.error);

    this.setData({
      prompt,
      variables,
      filledBody: core.renderPrompt(core.bodyForLanguage(prompt, defaultLang), core.valuesFromVariables(variables)),
      currentLang: defaultLang,
      hasBilingual,
      hasVariableErrors: variables.some((variable) => Boolean(variable.error)),
      isFavorited: favoriteResult.ok && favoriteResult.value.indexOf(prompt.id) >= 0,
    });

    const recent = localStore.recordRecent(prompt.id, Date.now());
    if (!recent.ok) console.warn('PromptVault recent write failed:', recent.error);
    if (this.data.rewardedEnabled) this.loadRewardedAd();
  },

  showLoadFailure(content) {
    wx.showModal({
      title: '无法打开 Prompt',
      content,
      showCancel: false,
      success: () => {
        const pages = getCurrentPages();
        if (pages.length > 1) wx.navigateBack();
        else wx.switchTab({ url: '/pages/index/index' });
      },
    });
  },

  onLangToggle() {
    if (!this.data.hasBilingual || !this.data.prompt) return;
    const nextLang = this.data.currentLang === 'zh' ? 'en' : 'zh';
    const variables = decorateVariables(core.variablesForLanguage(
      this.data.prompt,
      nextLang,
      this.data.variables
    ));
    const body = core.bodyForLanguage(this.data.prompt, nextLang);
    this.setData({
      currentLang: nextLang,
      variables,
      hasVariableErrors: variables.some((variable) => Boolean(variable.error)),
      filledBody: core.renderPrompt(body, core.valuesFromVariables(variables)),
    });
    wx.showToast({ title: nextLang === 'zh' ? '已切到中文版' : 'Switched to English', icon: 'none', duration: 800 });
  },

  onVarInput(e) {
    const name = e.currentTarget.dataset.name;
    const value = e.detail.value || '';
    const variables = decorateVariables(this.data.variables.map((variable) =>
      variable.name === name ? { ...variable, value } : variable
    ));
    this.setData({
      variables,
      hasVariableErrors: variables.some((variable) => Boolean(variable.error)),
    }, () => this.updateFilledBody());
  },

  updateFilledBody() {
    if (!this.data.prompt) return;
    const body = core.bodyForLanguage(this.data.prompt, this.data.currentLang);
    this.setData({ filledBody: core.renderPrompt(body, core.valuesFromVariables(this.data.variables)) });
  },

  onCopy() {
    if (this.data.hasVariableErrors) {
      wx.showToast({ title: '先修正变量输入错误', icon: 'none' });
      return;
    }
    const content = this.data.filledBody;
    if (!content) return;
    wx.setClipboardData({
      data: content,
      success: () => wx.showToast({ title: '已复制到剪贴板', icon: 'success' }),
      fail: (error) => {
        console.warn('PromptVault clipboard write failed:', error);
        wx.showModal({
          title: '复制失败',
          content: '微信没有允许写入剪贴板。可以长按预览文字手动复制后再试。',
          showCancel: false,
        });
      },
    });
  },

  setAdState(state) {
    this.setData({
      rewardedAdState: state,
      rewardedAdReady: state === 'ready',
    });
  },

  startAdTimeout() {
    if (this._adLoadTimer) clearTimeout(this._adLoadTimer);
    this._adLoadTimer = setTimeout(() => {
      this._adLoadTimer = null;
      if (this.data.rewardedAdState === 'loading') {
        this.setAdState('error');
      }
    }, REWARDED_AD_LOAD_TIMEOUT_MS);
  },

  clearAdTimeout() {
    if (!this._adLoadTimer) return;
    clearTimeout(this._adLoadTimer);
    this._adLoadTimer = null;
  },

  loadRewardedAd() {
    if (!this.data.rewardedEnabled) return;
    if (!wx.createRewardedVideoAd) {
      this.setAdState('error');
      return;
    }

    if (!this.rewardedAd) {
      this.rewardedAd = wx.createRewardedVideoAd({ adUnitId: this.data.rewardedAdUnitId });
      this._onAdLoad = () => {
        this.clearAdTimeout();
        this.setAdState('ready');
      };
      this._onAdError = (error) => {
        this.clearAdTimeout();
        this.setAdState('error');
        console.warn('PromptVault rewarded ad error:', error);
      };
      this._onAdClose = (result) => {
        if (result && result.isEnded) this.applyEnhancement();
        else wx.showToast({ title: '完整看完后才会生成增强版', icon: 'none' });
      };
      this.rewardedAd.onLoad(this._onAdLoad);
      this.rewardedAd.onError(this._onAdError);
      this.rewardedAd.onClose(this._onAdClose);
    }

    this.setAdState('loading');
    this.startAdTimeout();
    this.rewardedAd.load().catch((error) => {
      this.clearAdTimeout();
      this.setAdState('error');
      console.warn('PromptVault rewarded ad load failed:', error);
    });
  },

  onWatchAdEnhance() {
    if (this.data.hasVariableErrors) {
      wx.showToast({ title: '先修正变量输入错误', icon: 'none' });
      return;
    }
    if (!this.data.rewardedEnabled) {
      wx.showToast({ title: '当前版本没有启用广告增强', icon: 'none' });
      return;
    }
    if (!this.rewardedAd || this.data.rewardedAdState === 'error') {
      this.loadRewardedAd();
      wx.showToast({ title: '正在重新加载广告', icon: 'none' });
      return;
    }
    if (this.data.rewardedAdState !== 'ready') {
      wx.showToast({ title: '广告正在准备，请稍后再试', icon: 'none' });
      return;
    }

    this.rewardedAd.show().catch(() => {
      this.setAdState('loading');
      this.startAdTimeout();
      return this.rewardedAd.load()
        .then(() => {
          this.clearAdTimeout();
          this.setAdState('ready');
          return this.rewardedAd.show();
        })
        .catch((error) => {
          this.clearAdTimeout();
          this.setAdState('error');
          console.warn('PromptVault rewarded ad show failed:', error);
          wx.showToast({ title: '广告暂时不可用，原版 Prompt 仍可直接复制', icon: 'none' });
        });
    });
  },

  applyEnhancement() {
    if (this.data.hasVariableErrors) return;
    const prefix = 'You are an expert assistant. Be precise and concise. Skip preamble.\n\n';
    const suffix = '\n\nIf any part is ambiguous, ask one clarifying question before answering.';
    const enhanced = `${prefix}${this.data.filledBody}${suffix}`;
    wx.setClipboardData({
      data: enhanced,
      success: () => wx.showModal({
        title: '增强版已复制',
        content: '增加了精确、简洁和歧义先确认的要求。请粘贴到你选择的 AI 工具中检查后使用。',
        showCancel: false,
      }),
      fail: () => wx.showToast({ title: '增强版生成了，但剪贴板写入失败', icon: 'none' }),
    });
  },

  onToggleFavorite() {
    if (!this.data.prompt) return;
    const result = localStore.toggleFavorite(this.data.prompt.id);
    if (!result.ok) {
      wx.showToast({ title: `收藏没存上：${result.error}`, icon: 'none' });
      return;
    }
    this.setData({ isFavorited: result.favorited });
    wx.showToast({ title: result.favorited ? '已收藏' : '已取消收藏', icon: 'none' });
  },

  onShareAppMessage() {
    const prompt = this.data.prompt;
    if (!prompt || prompt._custom) {
      return { title: 'PromptVault — 本地 AI 提示词工具', path: '/pages/index/index' };
    }
    return {
      title: `PromptVault：${prompt.title}`,
      path: `/pages/detail/detail?id=${encodeURIComponent(prompt.id)}`,
    };
  },
});
