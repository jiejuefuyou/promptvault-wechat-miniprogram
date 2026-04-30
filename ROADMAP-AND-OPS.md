# PromptVault 全套 Roadmap + 运营 SOP

> **改进 / 测试 / 调研 / 监控 / 流程 / 功能追加** 6 个维度的长期规划。
> 配套 [UPDATE-PROMPTS.md](UPDATE-PROMPTS.md) 看日常更新流程。
> 这是给 6+ 个月的产品计划，不是 1 周的 sprint。

---

## 1. 🚀 改进路线图

### 已完成 (v1.0.0 - v1.0.7) ✅

- [x] 基础架构: 113 prompts + 8 大类 + 4 tabs
- [x] 中文说明 (desc_zh)
- [x] 收藏 + 自定义 prompt
- [x] 搜索 + 历史 + 4 排序 + 视图切换
- [x] AI 新鲜事 (8 文章接入)
- [x] 隐私 + 关于页
- [x] 全 UI 活泼版文案

### 短期 (1 个月内) - v1.1

- [ ] **prompt 数量翻倍** (113 → 250+)
  - 每周 +10-20 条
  - 重点补：AI 副业 / 教师 / 律师 / 医生 / 投资 / 翻译实战
- [ ] **分享卡片图** (`shareAppMessage` 用)
  - 当前 `imageUrl: ''` → 自定义紫色海报
  - 设计简单 logo + slogan
- [ ] **首次启动引导** (1 屏 tooltip)
  - 指 ☆ 收藏按钮 / 「新鲜事」tab / 「我自己」加私藏
- [ ] **Recent prompt 单独 tab 或入口**
  - 当前藏在排序里
  - 改首页第一行展示"最近用过 N 条"
- [ ] **流量主开通** (1000 累计访问后)
  - 申请 + 创建 Banner + 激励视频广告位
  - 填 `utils/ads-config.js` → 重 deploy

### 中期 (3 个月内) - v1.2-1.5

- [ ] **导出收藏到 markdown** (一键 share)
- [ ] **Prompt of the Day** (每天首页推 1 条)
- [ ] **AI 工具索引页** (新 tab? 或 articles 子分类)
  - Coze / Dify / Claude Code / Cursor / Suno / 11Labs 等
  - 每个工具 + 使用场景 + 推荐 prompt
- [ ] **关键词高亮** (搜索结果)
- [ ] **collection 概念**
  - "晨会 standup 用 5 条" 一组
  - "周报生成完整流程" 一组
- [ ] **Quick action: 复制 + 立即跳 ChatGPT/Claude**
  - 用户先填变量 → 一键 → 唤起 H5 / 复制提示

### 长期 (6 个月+) - v2.0

- [ ] **AI 直接生成 prompt** (集成 LLM API)
  - 用户描述场景 → 自动生成 prompt
  - 需企业账号 + 微信支付 + 真 LLM 调用
- [ ] **社区版** (用户上传自己的 prompt 给所有人)
  - 需 server-side（脱离纯前端）
  - 内容审核 + 隐私挑战
- [ ] **付费会员** (¥99/年 高级 prompt 库 + 优先支持)
- [ ] **Prompt + 工作流可视化** (类似 ComfyUI)

---

## 2. ✅ 测试 checklist (每次 deploy 前必跑)

### 基础回归测试 (5 分钟手测)

```
□ 首页 4 tab 切换流畅
□ 首页搜索 → 输入"翻译" → 看到结果
□ 首页 8 大类选「AI 编程」→ 仅显示 24 条
□ 首页点 ☆ → 变 ★ + toast「★ 收下啦」
□ 切「最爱」tab → 看到刚收藏
□ 切「我自己」→ 点「+ 加一条新的 prompt」→ 弹窗
□ 弹窗输入标题/内容 → 点「存下！」→ toast「存好啦 🎉」
□ 切「新鲜事」→ 选「圈内事」分类 → 看到 1 篇
□ 点开任一文章 → 内容渲染（标题、紫色 summary、代码块）
□ 「我自己」底部 → 点「关于」→ 显示 stats / 联系
□ 点「隐私」→ 显示完整说明
□ 点详情页 → 填变量 → 复制 → toast「📋 复制好了」
```

### 自动化测试 (deploy 前必跑)

```bash
# 1. 数据完整性
node -e "
const p = require('./utils/prompts.js');
const a = require('./utils/articles.js');
const c = require('./utils/categories.js');
console.log('Prompts:', p.length, 'all have category:', p.every(x=>x.category), 'all have desc_zh:', p.every(x=>x.desc_zh));
console.log('Articles:', a.articles.length);
console.log('Cats:', c.length);
"

# 2. 页面语法
node -e "
global.Page = c=>c; global.App = c=>c; global.wx = {getStorageSync:()=>null,setStorageSync:()=>{}};
['index','articles','favorites','custom','detail','article-detail','about','privacy'].forEach(p=>{
  try { delete require.cache[require.resolve('./pages/'+p+'/'+p+'.js')]; require('./pages/'+p+'/'+p+'.js'); console.log('✓',p); }
  catch(e) { console.log('✗',p,e.message); }
});
"

# 3. 部署
node tools/deploy.js --preview  # 先 preview 验证
node tools/deploy.js            # 真上传
```

### 真实设备测试

每个 release 前用至少 2 部真手机扫 QR 测：
- [ ] iOS 15+ 一台
- [ ] Android 一台
- [ ] 微信 8.0.40+ 版本

---

## 3. 🔬 调研 cadence

### 每周调研 (周三发周报后跑)

- [ ] 看 [HN AI digest](../reports/hn-digest-*) → 找 1-2 个新工具值得加 prompt
- [ ] 看 [GitHub trending](../reports/github-trending-*) → 找新冒头工具
- [ ] 看 [Reddit indie/dev](../reports/reddit-ios-digest-*) → 找用户痛点

### 每月调研 (月末)

- [ ] 用户高频搜索词 (从 wx.storage searchHistory 收集，但没数据... 见 monitor 段)
- [ ] 公众平台后台 → 数据 → 看哪些 prompt 详情页打开最多
- [ ] 看竞品（其他 prompt 库小程序）有没有新 feature 我们该抄

### 每季度大调研

- [ ] 8 大类是否还合理 / 要不要加新类
- [ ] 老旧 prompt 清理（如某 LLM 已下架）
- [ ] 整体 IA 是否需要重设计

---

## 4. 📊 监控 (核心指标)

### 自动监控 (公众平台后台)

每周日跑一次 review：

| 指标 | 看哪里 | 触发线 |
|---|---|---|
| **DAU / WAU** | 公众平台 → 数据分析 | DAU 达 100 → 加快加 prompt; DAU 达 1000 → 申请流量主 |
| **累计访问数** | 同上 | 1000 → 申请流量主 |
| **平均使用时长** | 同上 | < 30 秒 → 内容不抓人; > 2 分钟 → 优秀 |
| **次日留存** | 同上 | < 10% → 改进;  > 30% → 健康 |
| **分享次数** | 公众平台分享统计 | 看哪类内容被分享最多 → 加同类 |

### 流量主收益（开通后）

| 指标 | 目标 |
|---|---|
| 月广告展示 | DAU × 30 × 1.5 |
| eCPM (激励视频) | ¥30-80 |
| 月收益 | DAU 1000 → ¥150-500 / DAU 5000 → ¥750-2500 |

### 主动监控（用户反馈）

- [ ] 公众平台客服邮箱 (jiejuefuyou@gmail.com) - 每周看 1 次
- [ ] GitHub repo issues - 每周看 1 次
- [ ] 即刻 / 知乎私信 - 不定期

---

## 5. 🔄 运营 SOP (可重复流程)

### 每周三 (固定)

```
09:00 跑 weekly_digest_zh.py 生成下期 newsletter draft
10:00 编辑 newsletter (~1 hr) 
11:00 发 newsletter 到 Substack/小报童/公众号
13:00 写 1-2 条新 prompt 加入 utils/prompts.js
13:30 跑 deploy.js 出新版
14:00 公众平台提审
```

### 每周日 (review 日)

```
查看公众平台 7 天数据
更新 STATUS.md 周度汇总
看 GitHub issues / 邮件
列下周 backlog 优先级
```

### 月度 (月末 1-2 小时)

```
跑全套测试 checklist
评估流量主收益
review prompt 使用 distribution
清理老旧/无效 prompt
评估是否新加 1 个 page / feature
```

---

## 6. ➕ 功能追加优先级

排好优先级，下次手有空时按这 order 加：

### P0 (next sprint)
1. 分享卡片图 (用户分享体验差)
2. 首次启动引导 (新用户 onboarding)
3. Recent 单独入口 (常用 prompt 易找)

### P1 (1 个月内)
4. 导出收藏到 markdown
5. Prompt of the Day
6. 关键词高亮搜索结果
7. AI 工具索引页

### P2 (3 个月内)
8. Collection / 工作流概念
9. 一键唤起 ChatGPT 网页版
10. 桌面化（PWA-like installable）

### P3 (6 个月+)
11. AI 实时生成 prompt
12. 社区版（用户上传）
13. 付费会员

---

## 7. 🎯 北极星指标 (一切优化都看这个)

**主指标**: **每周新增收藏数**
- 反映：用户真的觉得 prompt 有用，存着以后再用
- 比 DAU 更准 (浏览不等于价值)

**辅指标**:
- DAU (规模)
- 平均使用时长 (深度)
- 自定义 prompt 数 (重度用户信号)

不看的 (vanity metrics):
- ❌ 总访问数 (不区分质量)
- ❌ 单纯 share 数 (可能是无意义点击)

---

## 8. 🚨 失败 fallback (出问题怎么办)

| 出问题 | 临时方案 | 根因解 |
|---|---|---|
| pack > 2MB 限制 | 把 articles body 截断到 3KB | 拆分包 (subPackage) |
| 用户报某 prompt 引起 ChatGPT 拒答 | 加 desc_zh 备注 | 改 prompt body |
| 微信审核拒 | 看具体原因 → 改 → 重提 | 维护一份「常见审核问题」FAQ |
| 流量主审核拒 | 等 DAU 上去再申 | 同时跑 newsletter / Gumroad 卖 prompt pack |

---

## 9. 🌐 配套外部资产

- [github.com/jiejuefuyou/promptvault-wechat-miniprogram](https://github.com/jiejuefuyou/promptvault-wechat-miniprogram) - 本仓
- [jiejuefuyou.github.io](https://jiejuefuyou.github.io) - 网页版 + 5 端导航
- [autoappnotes.substack.com](https://autoappnotes.substack.com) - 周报
- [dev.to/snake_sun](https://dev.to/snake_sun) - 英文文章
- [github.com/jiejuefuyou/autoapp-toolkit](https://github.com/jiejuefuyou/autoapp-toolkit) - 配套 orchestration toolkit

---

_2026-04-30 v1 · 季度更新一次_
