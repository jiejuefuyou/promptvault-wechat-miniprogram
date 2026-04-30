# 怎么更新 prompts / 文章 / 内容（10 分钟搞定一次更新）

> 内容是这个小程序的核心。这文档教你**新增/修改/删除** prompt + 文章 + 分类的标准流程。
> 全部走脚本+ require 自动算数，**绝不手动改 N 条 = 改 N 个地方**。

---

## 🟢 加 1 条新 prompt（最常见，5 分钟）

### Step 1: 编辑 `utils/prompts.js`

定位到列表末尾（或合适分类附近），插入：

```js
{
  "title": "你的 prompt 标题",
  "body": "Prompt 正文，可以含 {{变量名}} 占位符，比如 {{language}}",
  "tags": ["标签 1", "标签 2", "标签 3"],
  "desc_zh": "20-30 字中文一行说明（首页紫色 hint 显示）",
  "category": "ai-coding"  // 8 选 1: ai-coding / ai-art / ai-video / content / agent / work / learn / biz-life
}
```

**关键字段**：
- `title`: 中英文都行
- `body`: 用 `{{变量}}` 让用户填空
- `tags`: 选已有 tag 优先（保持一致），3-5 个最佳
- `desc_zh`: **必填** 1 行中文，不懂英文的用户靠这个理解
- `category`: **必填** 8 大类之一

### Step 2: 不需要做的事 ✨

- ❌ 不需要改 `app.js` (promptCount 自动)
- ❌ 不需要改 `pages/index/index.wxml` 标题数字（动态算）
- ❌ 不需要改 `pages/about/about.wxml` 数字（globalData 自动）
- ❌ 不需要改 categories.js（用现有 8 大类即可）

### Step 3: 部署

```bash
node tools/deploy.js --version "1.0.X" --desc "新增 N 条 prompt"
node tools/deploy.js --preview --desc "verify"
```

公众平台点提审 → 通过 → 发布。

---

## 🔴 删一条 prompt（30 秒）

直接删 `utils/prompts.js` 中对应整个 `{...}`。一切自动同步。

注意：**已被用户收藏的 prompt** 删除后，那些用户的"最爱"页会少一条（按 title 匹配，找不到就 silent skip，无报错）。

---

## 🟡 改一条 prompt（30 秒）

直接编辑 `utils/prompts.js` 对应字段。`title` 是 storage key，**改 title 会让该条目从用户收藏掉队**（按 title 匹配）。所以：
- 修小错（typo / 改 desc_zh / 加 tag）：随便改
- 改 title：**只在必要时改**，会让用户收藏丢失

---

## 🆕 加全新一类（如 "AI 营销" 9 大类）

```js
// utils/categories.js 加一项：
{ "id": "marketing", "icon": "📢", "name": "AI 营销" }

// 然后给相关 prompt 的 category 改成 "marketing"
```

注意：分类一旦加进去，公众平台**审核备注里也要更新**。

---

## 🆕 加 1 篇新文章（要点 / 新鲜事页）

### Step 1: 写 markdown 到 `reports/some-article.md`

放在 autoapp 根的 `reports/` 目录（autoapp-toolkit 仓外）。

### Step 2: 编辑 `utils/build_articles.py` ARTICLES_META 添加：

```python
{
    "id": "your-id",
    "type": "deep-dive",   # or "newsletter"
    "file": "some-article.md",
    "title": "活泼版标题（不要超 25 字）",
    "summary": "1-2 句钩子 summary（让人想点开）",
    "date": "2026-MM-DD",
    "tags": ["tag1", "tag2"],
    "category": "indie-dev"  # 5 选 1: industry / indie-dev / ai-agent / engineering
}
```

### Step 3: 重新跑脚本

```bash
cd utils && python build_articles.py
```

会重新生成 `articles.js`（自动截断 6KB body 防 pack 膨胀）。

### Step 4: 部署

`node tools/deploy.js --version "1.0.X+1" --desc "新增文章 X"`

---

## ⚙️ 加新功能 / 改 UI

不在本文档范围。看 `app.json` (page 注册) + `pages/*/` 下对应文件。

文件结构标准:
```
pages/X/X.js     # logic
pages/X/X.json   # page config
pages/X/X.wxml   # template
pages/X/X.wxss   # styles
```

---

## 📊 推荐更新节奏

| 频次 | 内容 | 触发 |
|---|---|---|
| 每周 1 次 | 加 5-10 条 prompt | 周三 newsletter 后 |
| 每周 1 次 | 加 1 篇文章 | 周三 |
| 每月 1 次 | 检查 prompt 是否过时（tool 改名等） | 月末 |
| 每季 1 次 | 大类调整 / 新功能 | 看用户反馈 |

---

## 🔍 检查更新效果

部署后扫 preview-qr.jpg 测：
- [ ] 首页数字 = `prompts.length` 实际值
- [ ] 新加的 prompt 在搜索 / 分类筛选下都能找到
- [ ] desc_zh 在首页紫色 hint 正确显示
- [ ] detail 页 `{{变量}}` 能正确解析

如果哪里数字不对/找不到 → 99% 是 `category` 字段拼错（要 8 选 1 不能新造）。

---

## 🚨 常见错误

**错误 1**: prompts.js syntax error
```bash
# 验证语法:
node -e "console.log(require('./utils/prompts.js').length)"
# 应该输出数字。报错 = JSON 格式错（漏逗号 / 多逗号 / 括号不闭合）
```

**错误 2**: category 拼错
- 必须是 8 个 ID 之一: `ai-coding / ai-art / ai-video / content / agent / work / learn / biz-life`
- 错了 → 该 prompt 在所有大类筛选里都找不到（但搜索还能用）

**错误 3**: tags 数组写成字符串
```js
// ❌ 错: "tags": "AI, Coding"
// ✅ 对: "tags": ["AI", "Coding"]
```

---

## 当前状态参考（2026-04-30）

- prompts: 113 条
- articles: 8 篇
- 8 大类全部有 prompt 覆盖
- 5 个 articles 分类
- pack size: ~237KB（限 2MB，加内容空间还很大）

---

_配套 ROADMAP-AND-OPS.md 看长期规划。_
