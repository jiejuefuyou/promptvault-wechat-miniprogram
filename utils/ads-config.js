// utils/ads-config.js
// 集中管理广告位 unit-id。
// 流量主开通后（小程序 1000 累计访问后才能申请），来这里填 unit-id 即可。
//
// 申请流量主：
//   1. https://mp.weixin.qq.com → 推广 → 流量主 → 申请开通
//   2. 创建广告位（建议至少 2 个：1 Banner + 1 激励视频）
//   3. 复制每个广告位的 unit-id（adunit-xxxxxxxxxxxxxxxx 格式）
//   4. 把下面 BANNER_AD_UNIT_ID + REWARDED_AD_UNIT_ID 替换成真值
//   5. 重新跑 node tools/deploy.js → 提审 → 发布
//
// 不开通流量主时本文件不动，所有广告位 silent skip（不影响功能）。

module.exports = {
  // Banner: 出现在首页底部
  BANNER_AD_UNIT_ID: '',  // ← 填: adunit-xxxxxxxxxxxxxxxx

  // 激励视频: 用户在 detail 页主动点"看广告解锁专业版"时弹
  REWARDED_AD_UNIT_ID: '',  // ← 填: adunit-xxxxxxxxxxxxxxxx

  // 插屏广告: 详情页关闭时弹（可选, 太烦的可不开）
  INTERSTITIAL_AD_UNIT_ID: '',  // ← 填或留空

  // 启用控制（即使填了 unitId 也可关）
  enableBanner: true,
  enableRewarded: true,
  enableInterstitial: false,  // 默认关 — 体验差

  // 广告策略
  // 当前 plan: 激励视频 = 主力变现 (eCPM ¥30-80) + Banner = 长尾
  // 不要加: 视频前贴 / 强制插屏（用户会卸载）
};
