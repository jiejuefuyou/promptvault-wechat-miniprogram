# PromptVault — 微信小程序

微信里的本地 AI Prompt 工具：搜索内置库、填写 `{{variables}}`、预览并复制；也可以收藏和保存自己的 Prompt。

## 1.1 数据完整性版本

这一版本不再用标题充当收藏、删除和最近记录的主键。每条 Prompt 都有稳定 ID，并通过 storage v2 保存：

```text
pv.customPrompts.v2
pv.favoriteIds.v2
pv.recentPrompts.v2
pv.searchHistory.v1
```

首次启动会迁移旧版：

- `customPrompts`
- `favorites`（标题数组）
- `recentPrompts`（标题记录）
- `searchHistory`

只有所有 v2 写入成功后才删除旧 key 并标记迁移完成；写入失败会保留旧数据，下一次仍可重试。

## 功能

- 从实际 `utils/prompts.js` 动态读取内置数量
- 分类、标签、全文搜索与排序
- 收藏和最近打开记录
- 自定义 Prompt：新建、编辑、删除
- 中英双版本切换
- typed variables：

```text
{{name}}
{{language:string=Japanese}}
{{count:int=5}}
{{notes:multiline=}}
```

- 变量默认值、空占位符保留、多行渲染
- 预览文字可长按选择
- 内置 Prompt 可通过稳定 ID 分享到详情页
- 自定义 Prompt 只在当前设备存在，分享时回到公共首页

## 本机数据与网络边界

PromptVault 开发者不建立账号或云同步服务。以下内容只保存到当前设备的微信小程序 storage：

- 自定义 Prompt
- 收藏 ID
- 搜索历史
- 最近打开记录

Prompt 正文和变量输入在本机渲染，不发送到开发者服务器。

小程序运行在微信客户端内，微信平台本身可能处理必要的设备、网络、运行日志和安全信息。仓库默认广告位 ID 为空；运营者启用微信流量主后：

- 首页 Banner 可能在页面打开时联网加载
- 激励视频只在用户主动点击增强按钮后展示
- 广告相关处理受微信平台规则约束

原始 Prompt 的查看、填写和复制不要求观看广告。

## 项目结构

```text
app.js
app.json
pages/
  index/          搜索、分类、排序、收藏
  detail/         typed variable、双语、预览、复制
  favorites/      ID-based 收藏
  custom/         事务式自定义 Prompt 管理
  articles/
  article-detail/
  about/
  privacy/
utils/
  prompts.js      内置 Prompt 数据
  prompt-core.js  ID、校验、搜索、typed variable 渲染
  local-store.js  storage v2 与旧版迁移
  ads-config.js   默认空广告位配置
tests/
scripts/
```

## 在微信开发者工具运行

1. 在 `project.config.json` 填入你的小程序 AppID。
2. 用微信开发者工具导入仓库根目录。
3. 编译并检查：
   - 首页搜索和排序
   - 收藏、取消收藏、最近记录
   - 新建、编辑、删除自定义 Prompt
   - typed variable 与中英切换
   - 剪贴板成功/失败路径
   - 隐私页和未配置广告时的 UI

广告位只应在运营主体完成相应平台配置和隐私披露后写入 `utils/ads-config.js`。

## 自动验证

无第三方依赖：

```bash
npm run verify
```

验证内容包括：

- 实际 Prompt 数据的 shape、限制、ID 与重复项
- typed variables、默认值、多行和中英切换
- storage v1 → v2 迁移
- 写入失败不误删旧 key
- 收藏/最近记录按 ID 去重
- 删除自定义 Prompt 后清理引用
- 页面不再写 `currentPrompt` 快照或硬编码数量
- 广告 UI 与隐私说明一致
- Prompt 页面没有未声明的远程请求路径

GitHub Actions 使用 Node 22 执行同一合同。

## 发布前人工 Gate

源码合同不能替代微信真机和审核证据。发布前至少完成：

- 微信开发者工具构建与真机预览
- Android / iOS 微信基础库 smoke
- storage 旧版迁移、容量不足与损坏数据
- 分享内置详情、自定义 Prompt 不外泄
- 剪贴板拒绝/失败
- 广告关闭、Banner 和激励视频三种配置
- 小程序隐私保护指引与实际 API/广告能力一致
- 上传包体与平台代码质量检查

## License

代码使用 MIT License。内置 Prompt 内容可用于个人使用；商业再分发请先联系确认。