# PromptVault — WeChat Miniprogram

> 113 AI prompts in your WeChat. Offline. Zero data collection. Open source MIT.
>
> 5th surface of the same product. Same `prompts.json` powers iOS / Web / Chrome / VSCode versions.

---

## 用户上线 5 步走（10 分钟）

### Step 1: 填 AppID

打开 [project.config.json](project.config.json)，找到这一行：

```json
"appid": "REPLACE_WITH_YOUR_APPID",
```

替换为你在 [微信公众平台 - 小程序后台](https://mp.weixin.qq.com/) → 设置 → 开发设置 找到的 **AppID（小程序 ID）**。

---

### Step 2: 微信开发者工具 import 项目

下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 安装。

打开后：
- 点 "导入项目"
- **项目目录**：选这个 `wechat-miniprogram` 文件夹
- **AppID**：填你的（同 Step 1）
- **项目名称**：PromptVault

点确认。开发者工具会加载并显示模拟器。

---

### Step 3: 测试本地运行

在开发者工具里：
- 看左侧模拟器：应该看到 PromptVault 首页 + 搜索框 + 113 prompts 列表
- 点任意 prompt → 进入详情页 → 填变量 → 复制
- 收藏功能：点 "★" 切换
- 测试搜索 / 标签筛选

如果都 work → 准备上传。

---

### Step 4: 上传体验版

开发者工具点右上角 **上传**：
- 版本号：1.0.0
- 项目备注：`Initial release - 113 AI prompts`
- 点 "上传"

上传完到[微信公众平台后台](https://mp.weixin.qq.com/) → 版本管理 → 开发版本 → 找到刚上传的 → 点 "提交审核"。

填审核信息：
- **小程序类目**：工具 / 实用工具
- **审核备注**：「AI 提示词管理工具，113 条预置 prompt + {{变量}}替换 + 一键复制。完全离线运行，不上传任何用户数据。」
- **测试账号**：不需要（无登录）

提交后通常 1-3 天审核通过。

---

### Step 5: 开通流量主（达到 1000 累计真实访问后）

发布后引流：
- 朋友圈分享
- 微信群推
- 小红书 / 即刻 推文配二维码
- newsletter 末尾推

**1000 累计真实访问后**，回[微信公众平台后台](https://mp.weixin.qq.com/) → 推广 → 流量主 → 申请开通。

开通后拿到：
- **Banner 广告 unitId** → 填进 `pages/index/index.js` 第 11 行 `bannerAdUnitId`
- **激励视频 unitId** → 填进 `pages/detail/detail.js` 第 9 行 `rewardedAdUnitId`

填完重新上传 → 提交审核 → 通过后**广告自动生效**，被动收入开始。

---

## 预期收入数据

| 阶段 | DAU | 月广告收入 |
|---|---|---|
| 启动期（1-3 月） | 100-500 | ¥50-300 |
| 增长期（3-6 月） | 500-2000 | ¥300-1500 |
| 成熟期（6-12 月） | 2000-10000 | ¥1500-7500 |

**核心**：DAU 是关键变量。流量靠 (a) newsletter 引流 (b) 知乎 / 小红书带量 (c) 微信群分享 / 朋友圈传播。

---

## 文件结构

```
wechat-miniprogram/
├── app.js                    # App 入口，初始化 storage
├── app.json                  # 小程序全局配置（页面注册、navbar、theme）
├── app.wxss                  # 全局样式（dark theme）
├── sitemap.json              # 微信搜索 indexing 规则
├── project.config.json       # 项目配置（含 AppID）
├── project.private.config.json
├── pages/
│   ├── index/                # 首页（搜索 + 标签 + prompt 列表）
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── detail/               # 详情页（变量替换 + 复制 + 激励视频）
│       ├── detail.js
│       ├── detail.json
│       ├── detail.wxml
│       └── detail.wxss
└── utils/
    └── prompts.json          # 113 条预置 prompts（与 iOS / Web / Chrome / VSCode 同源）
```

---

## 与现有 4 surface 的关系

| Surface | 仓 | 状态 |
|---|---|---|
| iOS App | autoapp-prompt-vault | 等 Apple Developer 邮件 |
| Web | jiejuefuyou.github.io/prompts.html | LIVE |
| Chrome Extension | promptvault-chrome | published |
| VSCode Extension | promptvault-vscode | published |
| **WeChat Miniprogram** | **本仓** | **本次新增** |

**同源**：5 个 surface 共享 `prompts.json`。改一条 prompt 在源 + 推到所有 5 个仓即可全部同步。

---

## 隐私 + 安全

- **零数据收集**：脚本不发送任何网络请求，所有数据存本地（用户设备 / 微信 storage）
- **离线运行**：除了流量主广告位（用户主动看广告）外，整个 App 不需要网络
- **代码全开源**：MIT，`prompts.json` 也开源可二次使用

---

## 常见问题

**Q：可以用个人小程序账号吗？**
A：可以。本工具型小程序符合个人开发者类目（工具）。

**Q：审核会不会通不过？**
A：通常 1-3 天通过。如果被拒：
- 多半是因为分类不对（应选"工具" → "实用工具"，不是"教育"）
- 或者描述含模糊词（避免说"AI 助手"，说"AI 提示词管理工具"）

**Q：流量主开通后多久看到收入？**
A：开通后立即开始累积。每月 1 号结算上月，提现到 user 微信账户。

**Q：广告会不会影响用户体验？**
A：本设计 Banner 在底部 + 激励视频是用户主动触发（"看广告解锁专业版"）。不会强弹。

**Q：能不能加付费功能？**
A：个人账号不能直接收款（微信支付限制）。如要付费版，需企业账号 + 微信支付商户号。**当前版本只走流量主**。

---

## 下一步（user ship 后 CC 可帮做）

- [ ] 设计分享卡片图（首页分享时显示）
- [ ] 加 5-10 个新 prompt（"小程序专属"作 differentiator）
- [ ] 加 "Prompt of the Day" 每日推送（需企业账号 + 模板消息）
- [ ] 数据可视化：用户最常用哪些 tag

---

_2026-04-30 by jiejuefuyou_
_License: MIT — fork freely_
