module.exports = [
  {
    "title": "Translate to natural English",
    "body": "Translate the following text into natural, conversational English. Preserve technical terms; rewrite anything that would sound awkward to a native speaker.\n\n{{text}}",
    "tags": [
      "翻译",
      "Translation",
      "ChatGPT"
    ],
    "desc_zh": "把英文段落改写成自然口语化英文，适合给 native speaker 看",
    "category": "content",
    "body_zh": "把下面这段话翻译成自然流畅的英文，可以给 native speaker 看的那种。保留专业术语；任何让 native 听着别扭的句子都要重写。\n\n{{text}}"
  },
  {
    "title": "翻译成简体中文",
    "body": "把下面的内容翻译成简体中文。要求：自然口语化，保留专业术语，不要逐字直译。\n\n{{text}}",
    "tags": [
      "翻译",
      "Translation"
    ],
    "desc_zh": "把英文/混合内容翻译成口语化中文，保留专业术语",
    "category": "content",
    "body_zh": "把下面的内容翻译成简体中文。要求：自然口语化，保留专业术语，不要逐字直译。\n\n{{text}}"
  },
  {
    "title": "Summarize a long article in 5 bullets",
    "body": "Summarize the following article in 5 bullet points, then 1 takeaway sentence at the end.\n\n{{article}}",
    "tags": [
      "总结",
      "Summarize"
    ],
    "desc_zh": "把长文章压缩成 5 个要点 + 1 句总结",
    "category": "content",
    "body_zh": "把下面这篇文章总结成 5 个要点，结尾再写 1 句最重要的 takeaway。\n\n{{article}}"
  },
  {
    "title": "Explain code in plain English",
    "body": "Explain what this code does, line by line, in plain English a junior engineer would understand. Then list any subtle bugs or edge cases you notice.\n\n```\n{{code}}\n```",
    "tags": [
      "编程",
      "Coding",
      "Cursor"
    ],
    "desc_zh": "逐行用大白话解释代码，并指出隐藏 bug",
    "category": "ai-coding",
    "body_zh": "用通俗易懂的中文解释这段代码，逐行讲，让初级工程师能看懂。然后列出你注意到的微妙 bug 或边界情况。\n\n```\n{{code}}\n```"
  },
  {
    "title": "Refactor for readability",
    "body": "Refactor this code for readability. Keep behavior identical. Prefer named functions over comments. Output only the refactored code; explain only the non-obvious choices in 1-2 lines after.\n\n```\n{{code}}\n```",
    "tags": [
      "编程",
      "Coding",
      "Cursor",
      "Claude Code"
    ],
    "desc_zh": "重构代码提高可读性，行为不变，输出新代码",
    "category": "ai-coding",
    "body_zh": "重构这段代码让它更易读。行为保持不变。优先用命名清晰的函数代替注释。只输出重构后的代码；非显然的设计决策在代码后面用 1-2 行简短解释。\n\n```\n{{code}}\n```"
  },
  {
    "title": "Write a unit test for this function",
    "body": "Write a unit test for the following function in {{language}}. Cover the happy path + 2 edge cases + 1 error case. Use the project's existing test framework.\n\n```\n{{function}}\n```",
    "tags": [
      "编程",
      "Coding",
      "Testing"
    ],
    "desc_zh": "为函数写单测：正常路径 + 2 边界 + 1 错误",
    "category": "ai-coding",
    "body_zh": "用 {{language}} 给下面这个函数写单元测试。覆盖：正常路径 + 2 个边界情况 + 1 个错误情况。用项目现有的测试框架。\n\n```\n{{function}}\n```"
  },
  {
    "title": "Code review like a senior",
    "body": "Review the following code change as a senior {{language}} engineer would. Focus on: correctness, performance, error handling, naming, and any non-obvious concurrency / race-condition risks. Be terse — only flag what matters.\n\n```\n{{diff}}\n```",
    "tags": [
      "编程",
      "Coding",
      "Code Review"
    ],
    "desc_zh": "用资深工程师视角做 code review，指出真问题",
    "category": "ai-coding",
    "body_zh": "用资深工程师的视角审查这段代码，找出真正的问题——不要鸡毛蒜皮的 lint。重点：设计 / 边界 bug / 性能 / 安全 / 可维护性。\n\n```\n{{code}}\n```"
  },
  {
    "title": "AI 绘画提示词（中文 → SD/Midjourney）",
    "body": "把下面这段中文描述转换成英文 Stable Diffusion / Midjourney 提示词。要求：用逗号分隔、加权重 (word:1.2)、加质量词、按主体 / 场景 / 风格 / 光影 / 镜头 / 质量 顺序排列。\n\n描述：{{description}}\n风格倾向：{{style}}",
    "tags": [
      "AI绘画",
      "Image-Gen",
      "Midjourney",
      "SD"
    ],
    "desc_zh": "中文需求 → SD/Midjourney 出图英文 prompt",
    "category": "ai-art",
    "body_zh": "把下面这段中文描述转换成英文 Stable Diffusion / Midjourney 提示词。要求：用逗号分隔、加权重 (word:1.2)、加质量词、按主体 / 场景 / 风格 / 光影 / 镜头 / 质量 顺序排列。\n\n描述：{{description}}\n风格倾向：{{style}}"
  },
  {
    "title": "ComfyUI workflow troubleshoot",
    "body": "I'm running this ComfyUI workflow and getting {{error}}. Walk me through diagnosing the cause: which node usually outputs that error, what input dimensions might be off, and what conditioning / sampler settings to check.",
    "tags": [
      "AI绘画",
      "ComfyUI",
      "Image-Gen"
    ],
    "desc_zh": "ComfyUI 工作流报错排查模板",
    "category": "ai-art",
    "body_zh": "我的 ComfyUI 工作流报错了。错误信息：{{error}}。工作流截图描述：{{workflow_desc}}。可能原因？怎么定位？"
  },
  {
    "title": "拍摄文案 → 短视频脚本",
    "body": "根据下面的拍摄文案，输出一个 60 秒短视频脚本，含：开头钩子（3 秒）、3 个分镜（每个 ≤ 15 秒）、结尾引导互动。语气：{{tone}}\n\n文案：{{copy}}",
    "tags": [
      "短视频",
      "Script",
      "AI视频"
    ],
    "desc_zh": "拍摄文案 → 短视频脚本（含分镜 + 字幕）",
    "category": "ai-video",
    "body_zh": "根据下面的拍摄文案，输出一个 60 秒短视频脚本，含：开头钩子（3 秒）、3 个分镜（每个 ≤ 15 秒）、结尾引导互动。语气：{{tone}}\n\n文案：{{copy}}"
  },
  {
    "title": "DeepSeek / Claude 系统提示词模板",
    "body": "你是一个 {{role}}。回答时遵循：\n1. 先给结论，再讲过程\n2. 不写废话过渡句\n3. 引用代码 / 数据 / 文献时给出可验证来源\n4. 不确定时直接说\"我不确定\"，不要编造\n\n用户问题：{{question}}",
    "tags": [
      "LLM",
      "System Prompt",
      "DeepSeek",
      "Claude"
    ],
    "desc_zh": "DeepSeek/Claude 通用 system prompt 起手模板",
    "category": "ai-coding",
    "body_zh": "你是一个 {{role}}。回答时遵循：\n1. 先给结论，再讲过程\n2. 不写废话过渡句\n3. 引用代码 / 数据 / 文献时给出可验证来源\n4. 不确定时直接说\"我不确定\"，不要编造\n\n用户问题：{{question}}"
  },
  {
    "title": "邮件起草（专业语气）",
    "body": "Draft an email to {{recipient}} about {{topic}}. Tone: professional but warm. Constraints: ≤ 150 words, single CTA, no jargon, no thank-you-in-advance.",
    "tags": [
      "邮件",
      "Email",
      "Writing"
    ],
    "desc_zh": "起草专业语气英文邮件",
    "category": "work",
    "body_zh": "起草一封专业语气的英文邮件。\n\n收件人: {{recipient}}\n场景: {{context}}\n核心诉求: {{ask}}\n语气: 专业 + 礼貌 + 不卑不亢\n\n输出 1 个完整邮件 (含 subject + greeting + body + sign-off)。"
  },
  {
    "title": "邮件起草（中文商务）",
    "body": "起草一封中文商务邮件给{{对象}}，主题{{话题}}。要求：正式但不生硬，控制在 200 字内，只有一个明确请求，不要客套话堆砌。",
    "tags": [
      "邮件",
      "Email",
      "Writing"
    ],
    "desc_zh": "起草中文商务邮件（合规、得体）",
    "category": "work",
    "body_zh": "起草一封中文商务邮件给{{对象}}，主题{{话题}}。要求：正式但不生硬，控制在 200 字内，只有一个明确请求，不要客套话堆砌。"
  },
  {
    "title": "Brainstorm 10 angles",
    "body": "Generate 10 distinct angles or hooks for the following topic, each in one sentence. Optimize for novelty — skip the obvious takes.\n\nTopic: {{topic}}\nAudience: {{audience}}",
    "tags": [
      "创意",
      "Brainstorm",
      "Writing"
    ],
    "desc_zh": "围绕一个 idea 头脑风暴 10 个不同角度",
    "category": "work",
    "body_zh": "围绕这个想法头脑风暴 10 个完全不同的角度：{{idea}}。每个角度 1 句话，互相不重复。"
  },
  {
    "title": "Job description → resume bullets",
    "body": "Match my background to this job description. Output 5 resume bullets that prove fit, each starting with an action verb and ending with a quantified outcome.\n\nJob:\n{{jd}}\n\nMy background:\n{{background}}",
    "tags": [
      "求职",
      "Resume",
      "Career"
    ],
    "desc_zh": "JD 描述 → resume 简历要点（量化）",
    "category": "biz-life",
    "body_zh": "把下面这段 JD 翻译成简历的成就要点（量化数字 + 强动词）：\n\n{{jd}}"
  },
  {
    "title": "面试官提问准备",
    "body": "我下周面试 {{position}} 岗位。基于这份 JD（下方），列 10 道最可能问的技术 + 行为题，每题给一个简短答题骨架（不要展开）。\n\nJD：{{jd}}",
    "tags": [
      "求职",
      "面试",
      "Career"
    ],
    "desc_zh": "面试官视角生成可能问到的问题",
    "category": "biz-life",
    "body_zh": "我下周面试 {{position}} 岗位。基于这份 JD（下方），列 10 道最可能问的技术 + 行为题，每题给一个简短答题骨架（不要展开）。\n\nJD：{{jd}}"
  },
  {
    "title": "Daily standup helper",
    "body": "Turn my notes into a 3-line standup: yesterday / today / blockers. Trim filler. If a blocker has no owner, suggest one.\n\n{{notes}}",
    "tags": [
      "效率",
      "Productivity",
      "Work"
    ],
    "desc_zh": "晨会站会 helper：今天做啥/昨天做了啥",
    "category": "work",
    "body_zh": "帮我准备今天的晨会分享。\n\n昨天我做了：{{yesterday}}\n今天我打算做：{{today}}\n阻塞我的事：{{blockers}}\n\n输出 3 段简洁可口语化的英文。"
  },
  {
    "title": "周报生成（基于 git log）",
    "body": "下面是我这周的 git commit 记录。把它整理成 5 条人能看的中文周报项，每项形式：[做了什么] → [带来什么影响]。隐去 commit hash 和分支名。\n\n{{git_log}}",
    "tags": [
      "效率",
      "周报",
      "Work"
    ],
    "desc_zh": "基于 git log 自动生成周报（中文）",
    "category": "work",
    "body_zh": "下面是我这周的 git commit 记录。把它整理成 5 条人能看的中文周报项，每项形式：[做了什么] → [带来什么影响]。隐去 commit hash 和分支名。\n\n{{git_log}}"
  },
  {
    "title": "OKR 拆解",
    "body": "基于这个 Objective，拆出 3-4 个有数字、有时间、可验证的 Key Results。每个 KR 用「By [date], [metric] from X to Y」格式。\n\nObjective: {{objective}}",
    "tags": [
      "效率",
      "OKR",
      "Work"
    ],
    "desc_zh": "把模糊目标拆成 OKR（O + 3 KR）",
    "category": "work",
    "body_zh": "基于这个 Objective，拆出 3-4 个有数字、有时间、可验证的 Key Results。每个 KR 用「By [date], [metric] from X to Y」格式。\n\nObjective: {{objective}}"
  },
  {
    "title": "决策框架（Pros/Cons + 推荐）",
    "body": "我面前有这两个选择，帮我做结构化对比 + 给推荐：\n\n选择 A：{{option_a}}\n选择 B：{{option_b}}\n\n输出格式：\n1. 各 3 条最强 pro\n2. 各 2 条最强 con\n3. 一句话推荐 + 一句反对该推荐的最强反驳",
    "tags": [
      "决策",
      "Decision",
      "Productivity"
    ],
    "desc_zh": "Pros/Cons + 推荐 + 决策依据 完整决策框架",
    "category": "work",
    "body_zh": "我面前有这两个选择，帮我做结构化对比 + 给推荐：\n\n选择 A：{{option_a}}\n选择 B：{{option_b}}\n\n输出格式：\n1. 各 3 条最强 pro\n2. 各 2 条最强 con\n3. 一句话推荐 + 一句反对该推荐的最强反驳"
  },
  {
    "title": "ELI5 — explain like I'm 5",
    "body": "Explain {{concept}} like I'm 5 years old. Use one analogy from everyday life. No jargon.",
    "tags": [
      "学习",
      "Learning"
    ],
    "desc_zh": "用 5 岁小孩能懂的方式解释复杂概念",
    "category": "learn",
    "body_zh": "用 5 岁小孩能听懂的方式解释这个概念：{{concept}}。用类比，不用专业术语。"
  },
  {
    "title": "Feynman 学习法",
    "body": "我刚学了 {{topic}}。请扮演一个完全不懂这个主题的人，用质疑式提问帮我找出我哪里没真懂。每轮一个问题，等我答完再问下一个。",
    "tags": [
      "学习",
      "Feynman"
    ],
    "desc_zh": "Feynman 学习法：用自己的话教一遍",
    "category": "learn",
    "body_zh": "我刚学了 {{topic}}。请扮演一个完全不懂这个主题的人，用质疑式提问帮我找出我哪里没真懂。每轮一个问题，等我答完再问下一个。"
  },
  {
    "title": "PDF / 长文 chunked 总结",
    "body": "下面这段文档很长。请按主题分块总结，每块给：标题 + 3-5 句要点 + 1 句 \"为什么这块重要\"。如果检测到结构性错误（比如自相矛盾、逻辑断裂），单独标记。\n\n{{document}}",
    "tags": [
      "总结",
      "Summarize",
      "Reading"
    ],
    "desc_zh": "把长 PDF / 长文分块总结，最后合并",
    "category": "learn",
    "body_zh": "下面这段文档很长。请按主题分块总结，每块给：标题 + 3-5 句要点 + 1 句 \"为什么这块重要\"。如果检测到结构性错误（比如自相矛盾、逻辑断裂），单独标记。\n\n{{document}}"
  },
  {
    "title": "对比同类产品",
    "body": "对比 {{product_a}} 和 {{product_b}}：\n1. 各自最强差异化（一句话）\n2. 价格 / 订阅模型对比\n3. 谁更适合 {{use_case}}\n\n来源最近半年内的公开信息；不确定的地方明确标注。",
    "tags": [
      "调研",
      "Research"
    ],
    "desc_zh": "对比 N 个同类产品的优缺点 + 推荐场景",
    "category": "biz-life",
    "body_zh": "对比 {{product_a}} 和 {{product_b}}：\n1. 各自最强差异化（一句话）\n2. 价格 / 订阅模型对比\n3. 谁更适合 {{use_case}}\n\n来源最近半年内的公开信息；不确定的地方明确标注。"
  },
  {
    "title": "App Store description 优化",
    "body": "下面是一段 App Store 描述。优化它：保留原意，但提高 conversion-readability — 第一句必须是一个具体场景钩子，bullet 不超过 6 条，每条 ≤ 12 字。\n\n{{description}}",
    "tags": [
      "ASO",
      "App Store",
      "Marketing"
    ],
    "desc_zh": "App Store 描述按 ASO 规则优化",
    "category": "biz-life",
    "body_zh": "下面是一段 App Store 描述。优化它：保留原意，但提高 conversion-readability — 第一句必须是一个具体场景钩子，bullet 不超过 6 条，每条 ≤ 12 字。\n\n{{description}}"
  },
  {
    "title": "ASO keyword research",
    "body": "Suggest 10 App Store keywords for an app that does {{description}}. Each keyword should be: ≤ 12 chars, low competition, descriptive (not branded). Sort by estimated search volume desc.",
    "tags": [
      "ASO",
      "App Store"
    ],
    "desc_zh": "ASO 关键词调研：竞品 + 长尾词挖掘",
    "category": "biz-life",
    "body_zh": "我有一款 App，描述如下：{{app_description}}。帮我找 10-20 个适合 ASO 优化的关键词，按搜索量 × 竞争度排序。"
  },
  {
    "title": "Reddit Show & Tell post",
    "body": "Draft a Reddit /r/{{subreddit}} \"Show & Tell\" post for my project: {{project}}.\n\nConstraints:\n- Title ≤ 70 chars, no clickbait, no emoji\n- Body: lead with the constraint or non-obvious choice, not features\n- End with one specific question to invite comments\n- No links until paragraph 3",
    "tags": [
      "Marketing",
      "Reddit",
      "Launch"
    ],
    "desc_zh": "Reddit 'Show & Tell' 帖子套路（不被 ban）",
    "category": "content",
    "body_zh": "我做了一个产品：{{product}}。帮我写一个 Reddit r/SideProject 的 Show & Tell 帖子，要点：(1) 不像广告 (2) 真实开发故事 (3) 对其他 indie 有用 (4) 文末留个开放问题让人评论。"
  },
  {
    "title": "Twitter/X thread builder",
    "body": "Turn this rough draft into a 6-tweet thread:\n- Tweet 1: hook in ≤ 80 chars\n- Tweets 2-5: one specific point each, all under 240 chars\n- Tweet 6: links + soft CTA\n- No emoji, no thread emojis (1/, 2/), no \"buckle up\"\n\nDraft: {{draft}}",
    "tags": [
      "Marketing",
      "Twitter",
      "Writing"
    ],
    "desc_zh": "Twitter/X thread 8-10 条结构化内容",
    "category": "content",
    "body_zh": "把下面这个想法写成 Twitter thread (8-10 条)：{{topic}}。第 1 条是钩子，2-9 条干货，第 10 条 CTA。每条 240 字符内。"
  },
  {
    "title": "Product Hunt 文案",
    "body": "我准备把 {{product}} 上 Product Hunt。生成：\n1. Tagline（≤ 60 字符）\n2. 一段 Description（≤ 260 字）\n3. 第一条 Maker comment 的草稿（强调约束 / 非显性设计选择，不要列功能）",
    "tags": [
      "Marketing",
      "Product Hunt",
      "Launch"
    ],
    "desc_zh": "Product Hunt launch 文案（标题+描述+评论）",
    "category": "content",
    "body_zh": "我准备把 {{product}} 上 Product Hunt。生成：\n1. Tagline（≤ 60 字符）\n2. 一段 Description（≤ 260 字）\n3. 第一条 Maker comment 的草稿（强调约束 / 非显性设计选择，不要列功能）"
  },
  {
    "title": "Coze / Dify 智能体 prompt 骨架",
    "body": "我要在 {{platform}} 搭一个 {{role}} 智能体。给我一个高质量 system prompt 起手：\n- 角色定义（≤ 100 字）\n- 能力边界（明确说不做什么）\n- 输出格式约束（JSON / Markdown / 自然语言）\n- 失败/不确定时的兜底\n- 一段示例 input → output 演示",
    "tags": [
      "Agent",
      "Coze",
      "Dify",
      "智能体"
    ],
    "desc_zh": "Coze/Dify 智能体 system prompt 起手骨架",
    "category": "agent",
    "body_zh": "我要在 {{platform}} 搭一个 {{role}} 智能体。给我一个高质量 system prompt 起手：\n- 角色定义（≤ 100 字）\n- 能力边界（明确说不做什么）\n- 输出格式约束（JSON / Markdown / 自然语言）\n- 失败/不确定时的兜底\n- 一段示例 input → output 演示"
  },
  {
    "title": "Claude Code 项目根 system prompt",
    "body": "You are working in this repository as a senior {{language}} engineer. Conventions:\n- Prefer editing existing files over creating new ones\n- Match the codebase's existing style; don't introduce a new framework\n- Run the project's tests after changes — the test command is `{{test_cmd}}`\n- Before each edit, read the file to understand the surrounding context\n- Don't write throwaway comments; only WHY-comments\n\nWhen given a task, plan briefly, then execute. State assumptions out loud only if non-obvious.",
    "tags": [
      "Claude Code",
      "Coding-Agent",
      "System Prompt"
    ],
    "desc_zh": "Claude Code 项目根 system prompt（决定 agent 风格）",
    "category": "ai-coding",
    "body_zh": "我的项目是 {{project_type}}，技术栈 {{tech_stack}}，团队 {{team_size}} 人。帮我写一份 Claude Code 用的 CLAUDE.md 项目根 system prompt，覆盖：(1) 风格偏好 (2) 测试要求 (3) commit 规范 (4) 不要做的事。"
  },
  {
    "title": "Claude Code 修 bug 输入模板",
    "body": "Bug 描述: {{bug}}\n复现路径: {{repro}}\n相关文件: {{files}}\n\n请先定位 root cause（不只补症状），再 propose 修复。修复后运行测试确认；如无测试，写一个最小回归测试。",
    "tags": [
      "Claude Code",
      "Coding-Agent",
      "Debug"
    ],
    "desc_zh": "Claude Code 修 bug 标准输入模板（含上下文）",
    "category": "ai-coding",
    "body_zh": "Bug 描述: {{bug}}\n复现路径: {{repro}}\n相关文件: {{files}}\n\n请先定位 root cause（不只补症状），再 propose 修复。修复后运行测试确认；如无测试，写一个最小回归测试。"
  },
  {
    "title": "Cursor / Claude Code 实施新功能",
    "body": "实施需求：{{feature}}\n\n约束：\n- 不要为这一个功能搭新 abstraction，复用现有模式\n- 改动落到尽量少的文件\n- 边界情况写 unit test，不写集成测试\n- 不删/重命名公共 API（除非必要并明确说出 breaking change）",
    "tags": [
      "Claude Code",
      "Cursor",
      "Coding-Agent"
    ],
    "desc_zh": "Cursor / Claude Code 实施新功能的标准模板",
    "category": "ai-coding",
    "body_zh": "实施需求：{{feature}}\n\n约束：\n- 不要为这一个功能搭新 abstraction，复用现有模式\n- 改动落到尽量少的文件\n- 边界情况写 unit test，不写集成测试\n- 不删/重命名公共 API（除非必要并明确说出 breaking change）"
  },
  {
    "title": "Code review (senior peer)",
    "body": "以资深 {{language}} 工程师视角 review 这段 diff。只 flag 真的影响：\n1. 正确性 / data race / 内存安全\n2. 性能（O(n^2)+ 或不必要 IO）\n3. 名字误导 / 失效注释\n4. 测试缺口（哪些路径未覆盖）\n忽略风格 / 格式（让 linter 处理）。\n\n```diff\n{{diff}}\n```",
    "tags": [
      "Coding-Agent",
      "Code Review"
    ],
    "desc_zh": "Senior peer 视角的代码审查（找设计 + 边界 bug）",
    "category": "ai-coding",
    "body_zh": "以资深 {{language}} 工程师视角 review 这段 diff。只 flag 真的影响：\n1. 正确性 / data race / 内存安全\n2. 性能（O(n^2)+ 或不必要 IO）\n3. 名字误导 / 失效注释\n4. 测试缺口（哪些路径未覆盖）\n忽略风格 / 格式（让 linter 处理）。\n\n```diff\n{{diff}}\n```"
  },
  {
    "title": "Claude Code skill: changelog from git log",
    "body": "下面是 git log 的 commit titles。整理成面向用户的 changelog（一段 2-3 行）：\n- 用户能感知的功能 / 修复在前\n- 内部重构、CI、依赖升级合并到末尾「Internal」段\n- 不暴露 commit hash / 内部分支名\n\n{{commit_log}}",
    "tags": [
      "Claude Code",
      "Coding-Agent",
      "Release"
    ],
    "desc_zh": "Claude Code skill: 从 git log 自动生成 changelog",
    "category": "ai-coding",
    "body_zh": "下面是 git log 的 commit titles。整理成面向用户的 changelog（一段 2-3 行）：\n- 用户能感知的功能 / 修复在前\n- 内部重构、CI、依赖升级合并到末尾「Internal」段\n- 不暴露 commit hash / 内部分支名\n\n{{commit_log}}"
  },
  {
    "title": "Cursor 项目记忆 .cursorrules",
    "body": "为这个项目生成 .cursorrules 文件内容。基于：\n- 项目主语言：{{language}}\n- 技术栈：{{stack}}\n- 团队偏好：{{preferences}}\n\n格式：bullet 形式，每条一句话，能直接给 Cursor 读。包括：（a）测试命令；（b）该用 / 不该用哪些库；（c）命名约定；（d）需要保持的文件结构；（e）任何「先看 X 再做 Y」的硬流程。",
    "tags": [
      "Cursor",
      "Coding-Agent"
    ],
    "desc_zh": "Cursor 项目 .cursorrules 起手模板",
    "category": "ai-coding",
    "body_zh": "为这个项目生成 .cursorrules 文件内容。基于：\n- 项目主语言：{{language}}\n- 技术栈：{{stack}}\n- 团队偏好：{{preferences}}\n\n格式：bullet 形式，每条一句话，能直接给 Cursor 读。包括：（a）测试命令；（b）该用 / 不该用哪些库；（c）命名约定；（d）需要保持的文件结构；（e）任何「先看 X 再做 Y」的硬流程。"
  },
  {
    "title": "Gemini Antigravity 工作流模板",
    "body": "我用 Gemini Antigravity / Gemini Code 在 {{task}} 任务上。请按这个 8 步走：\n1. 读完 {{relevant_files}} 三遍再写代码\n2. 列出你不确定的假设（≤ 5 条）\n3. 对照已有测试找参考写法\n4. 写代码\n5. 跑 {{test_cmd}}\n6. 失败 → 读完报错再改\n7. 通过 → 自检 diff 是否还有可删的\n8. 输出 1 句话总结",
    "tags": [
      "Gemini",
      "Coding-Agent"
    ],
    "desc_zh": "Gemini Antigravity 工作流起手模板",
    "category": "agent",
    "body_zh": "我用 Gemini Antigravity / Gemini Code 在 {{task}} 任务上。请按这个 8 步走：\n1. 读完 {{relevant_files}} 三遍再写代码\n2. 列出你不确定的假设（≤ 5 条）\n3. 对照已有测试找参考写法\n4. 写代码\n5. 跑 {{test_cmd}}\n6. 失败 → 读完报错再改\n7. 通过 → 自检 diff 是否还有可删的\n8. 输出 1 句话总结"
  },
  {
    "title": "Nano Banana 人物换装",
    "body": "Take the person in image 1. Keep their face identity, body shape, and lighting unchanged. Change only the outfit to: {{outfit}}. The setting stays at {{location}}. Output a photorealistic image, full body, natural pose.",
    "tags": [
      "Nano Banana",
      "Image-Gen",
      "Gemini"
    ],
    "desc_zh": "Nano Banana 人物换装 prompt（保持脸型）",
    "category": "ai-art",
    "body_zh": "用 Nano Banana 把图中人物换成 {{outfit}} 装扮。保持脸型、发型、姿势完全一致。背景：{{background}}。"
  },
  {
    "title": "Nano Banana 多图融合（背景换人）",
    "body": "Image 1 is the subject. Image 2 is the new background. Place the subject from image 1 into image 2's environment. Match the lighting direction, color temperature, and depth-of-field of image 2. Subject's face / clothing must stay identical.",
    "tags": [
      "Nano Banana",
      "Image-Gen",
      "Gemini"
    ],
    "desc_zh": "Nano Banana 多图融合（背景换人）",
    "category": "ai-art",
    "body_zh": "用 Nano Banana：图 A 是背景（{{bg_desc}}），图 B 是人物（{{person_desc}}）。把人物自然融合到背景，光线匹配，比例合理。"
  },
  {
    "title": "Nano Banana 产品摄影",
    "body": "Take the product in the image. Render it in a {{scene}} scene with {{lighting}} lighting. {{angle}} angle. Photorealistic, commercial-quality, no text overlay, no watermark. Match {{brand_style}} aesthetic.",
    "tags": [
      "Nano Banana",
      "Image-Gen",
      "产品摄影"
    ],
    "desc_zh": "Nano Banana 产品摄影 prompt（电商风格）",
    "category": "ai-art",
    "body_zh": "用 Nano Banana 给我的产品 {{product}} 出一组电商风格商业摄影。要求：白底 / 45 度俯角 / 柔光 / 突出材质。3 个不同角度。"
  },
  {
    "title": "ComfyUI 工作流复用 brief",
    "body": "我有一个 ComfyUI workflow .json (附件)。请帮我：\n1. 概括这个 workflow 做什么（一句话）\n2. 列出关键节点链路（哪几个 sampler + KSampler 组合）\n3. 标出适合我替换的输入：prompt 文本 / 模型 / LoRA / 控制图\n4. 给一个「如果想做 {{variant}} 应该改哪几个节点」的 diff 建议",
    "tags": [
      "ComfyUI",
      "Image-Gen"
    ],
    "desc_zh": "ComfyUI 工作流文档化 + 复用 brief",
    "category": "ai-art",
    "body_zh": "我有一个 ComfyUI workflow .json (附件)。请帮我：\n1. 概括这个 workflow 做什么（一句话）\n2. 列出关键节点链路（哪几个 sampler + KSampler 组合）\n3. 标出适合我替换的输入：prompt 文本 / 模型 / LoRA / 控制图\n4. 给一个「如果想做 {{variant}} 应该改哪几个节点」的 diff 建议"
  },
  {
    "title": "AI 出图反推 prompt（图→词）",
    "body": "我提供一张图。请反推出 Stable Diffusion / Midjourney 风格的英文 prompt（含权重和质量词），让我用同一 prompt 生成相似风格的新图。同时输出：\n- 主体描述\n- 镜头语言（焦距、角度）\n- 风格标签（艺术家 / 流派）\n- 光影（time of day, lighting setup）\n- 色调",
    "tags": [
      "Image-Gen",
      "Prompt Engineering",
      "SD",
      "Midjourney"
    ],
    "desc_zh": "图片反推 prompt（图 → 文字描述）",
    "category": "ai-art",
    "body_zh": "我提供一张图。请反推出 Stable Diffusion / Midjourney 风格的英文 prompt（含权重和质量词），让我用同一 prompt 生成相似风格的新图。同时输出：\n- 主体描述\n- 镜头语言（焦距、角度）\n- 风格标签（艺术家 / 流派）\n- 光影（time of day, lighting setup）\n- 色调"
  },
  {
    "title": "Coze 智能体 system prompt 起手",
    "body": "你是 {{name}}，定位是 {{role}}。\n\n核心能力：\n- {{capability_1}}\n- {{capability_2}}\n- {{capability_3}}\n\n硬约束（不可违反）：\n- 不回答非本主题的问题，礼貌引回\n- 输出格式 = {{format}}（JSON / Markdown / 自然语言）\n- 不确定时说「我不确定」，不要编造\n\n失败兜底：被问到能力外的请求，回复「这个我帮不到您，建议您 {{alternative}}」。",
    "tags": [
      "Coze",
      "Agent",
      "智能体",
      "Dify"
    ],
    "desc_zh": "Coze 智能体起手 system prompt（含工具调用）",
    "category": "agent",
    "body_zh": "你是 {{name}}，定位是 {{role}}。\n\n核心能力：\n- {{capability_1}}\n- {{capability_2}}\n- {{capability_3}}\n\n硬约束（不可违反）：\n- 不回答非本主题的问题，礼貌引回\n- 输出格式 = {{format}}（JSON / Markdown / 自然语言）\n- 不确定时说「我不确定」，不要编造\n\n失败兜底：被问到能力外的请求，回复「这个我帮不到您，建议您 {{alternative}}」。"
  },
  {
    "title": "Dify 工作流 RAG agent prompt",
    "body": "你正在 RAG 模式下。检索结果在 {{context}} 里。\n\n规则：\n1. 答案必须直接源于检索片段；不引用 = 不知道\n2. 每条断言后用 [片段编号] 标注来源\n3. 检索结果矛盾时优先时间最新的，并明示矛盾\n4. 检索片段不足以回答时直接说「知识库中无此信息」，不要补脑\n\n用户问题：{{question}}",
    "tags": [
      "Dify",
      "Agent",
      "RAG"
    ],
    "desc_zh": "Dify 工作流 + RAG 检索增强 agent prompt",
    "category": "agent",
    "body_zh": "你正在 RAG 模式下。检索结果在 {{context}} 里。\n\n规则：\n1. 答案必须直接源于检索片段；不引用 = 不知道\n2. 每条断言后用 [片段编号] 标注来源\n3. 检索结果矛盾时优先时间最新的，并明示矛盾\n4. 检索片段不足以回答时直接说「知识库中无此信息」，不要补脑\n\n用户问题：{{question}}"
  },
  {
    "title": "n8n + LLM 自动化提示词",
    "body": "在 n8n workflow 中，我从 {{trigger}} 拿到原始数据 {{input_shape}}，需要 LLM 输出严格 JSON 形式：\n\n{{json_schema}}\n\n要求：\n- 只返回 JSON，不要 markdown 代码块包裹\n- 数值字段不要带单位字符串\n- 缺失字段返回 null 而不是空字符串\n- 任何字段不确定都返回 null + 在 \"_uncertain\" 字段列出",
    "tags": [
      "n8n",
      "Agent",
      "Automation"
    ],
    "desc_zh": "n8n + LLM 工作流自动化 prompt 模板",
    "category": "agent",
    "body_zh": "在 n8n workflow 中，我从 {{trigger}} 拿到原始数据 {{input_shape}}，需要 LLM 输出严格 JSON 形式：\n\n{{json_schema}}\n\n要求：\n- 只返回 JSON，不要 markdown 代码块包裹\n- 数值字段不要带单位字符串\n- 缺失字段返回 null 而不是空字符串\n- 任何字段不确定都返回 null + 在 \"_uncertain\" 字段列出"
  },
  {
    "title": "browser-use / Computer Use 任务模板",
    "body": "Goal: {{goal}}\nStarting URL: {{url}}\nDone-when: {{done_condition}}\n\nConstraints:\n- Don't sign anything up; if signup wall, stop and report\n- Don't click ads even if look like content\n- After 5 failed actions, stop and dump current screenshot + DOM\n- Don't enter the user's payment info ever",
    "tags": [
      "browser-use",
      "Computer Use",
      "Agent"
    ],
    "desc_zh": "browser-use / Computer Use 任务自动化模板",
    "category": "agent",
    "body_zh": "用 browser-use（或 Anthropic Computer Use）让 AI 帮我完成这个任务：{{task}}。详细步骤分解：1. ... 2. ... 失败时如何 retry？需要哪些权限？"
  },
  {
    "title": "海螺 AI / Kling 视频脚本 prompt",
    "body": "把这段文字转换成可输入海螺 AI / Kling 的视频生成 prompt。要求：\n1. 主体描述（人 / 物 / 场景）开头\n2. 动作（动词，具象）\n3. 镜头语言（推 / 拉 / 摇 / 移 / 跟）\n4. 时长 {{duration}} 秒，{{aspect_ratio}}\n5. 风格 {{style}}\n\n文字：{{text}}",
    "tags": [
      "AI视频",
      "海螺AI",
      "Kling",
      "Video-Gen"
    ],
    "desc_zh": "海螺 / Kling 等中文 AI 视频脚本 prompt",
    "category": "ai-video",
    "body_zh": "把这段文字转换成可输入海螺 AI / Kling 的视频生成 prompt。要求：\n1. 主体描述（人 / 物 / 场景）开头\n2. 动作（动词，具象）\n3. 镜头语言（推 / 拉 / 摇 / 移 / 跟）\n4. 时长 {{duration}} 秒，{{aspect_ratio}}\n5. 风格 {{style}}\n\n文字：{{text}}"
  },
  {
    "title": "Sora 2 短视频脚本（叙事型）",
    "body": "为 Sora 2 写一个 {{duration}} 秒短视频脚本：\n\n主题：{{theme}}\n受众：{{audience}}\n\n输出格式：\n- 开场（≤ 2 秒）：一个让人停下滑动的钩子镜头\n- 主体（中段）：一个清晰动作 + 一个意外转折\n- 结尾（≤ 2 秒）：留白或反悬念\n\n避免：复杂多人交互（Sora 2 当前弱）、对话台词、文字 overlay。",
    "tags": [
      "Sora",
      "AI视频",
      "Video-Gen"
    ],
    "desc_zh": "Sora 2 短视频脚本（叙事型，含运镜）",
    "category": "ai-video",
    "body_zh": "为 Sora 2 写一个 {{duration}} 秒短视频脚本：\n\n主题：{{theme}}\n受众：{{audience}}\n\n输出格式：\n- 开场（≤ 2 秒）：一个让人停下滑动的钩子镜头\n- 主体（中段）：一个清晰动作 + 一个意外转折\n- 结尾（≤ 2 秒）：留白或反悬念\n\n避免：复杂多人交互（Sora 2 当前弱）、对话台词、文字 overlay。"
  },
  {
    "title": "LLM 面试题速答模板",
    "body": "面试题：{{question}}\n\n答题骨架（按这个结构）：\n1. 一句话核心结论\n2. 关键概念定义（≤ 2 句话）\n3. 工程权衡 / 何时用何时不用\n4. 具体例子（如果有）\n5. 容易被追问的边界（提前 1 个）\n\n不要讲废话引言，直接进结论。",
    "tags": [
      "LLM",
      "面试",
      "学习"
    ],
    "desc_zh": "面试现场速答 LLM 面试题模板",
    "category": "learn",
    "body_zh": "面试题：{{question}}\n\n答题骨架（按这个结构）：\n1. 一句话核心结论\n2. 关键概念定义（≤ 2 句话）\n3. 工程权衡 / 何时用何时不用\n4. 具体例子（如果有）\n5. 容易被追问的边界（提前 1 个）\n\n不要讲废话引言，直接进结论。"
  },
  {
    "title": "对比两个大模型（用户视角）",
    "body": "对比 {{model_a}} 和 {{model_b}} 在 {{use_case}} 上：\n1. 哪个明显更强？引用最近半年公开 benchmark\n2. 价格 / 速度 / 上下文长度差异\n3. 哪些场景下 {{model_a}} 是 strict win？反之？\n4. 如果用户预算紧 / 不紧，分别推荐哪个\n\n来源不确定的明确说「我不确定」。",
    "tags": [
      "LLM",
      "调研"
    ],
    "desc_zh": "用户视角对比两个大模型（实测对比）",
    "category": "learn",
    "body_zh": "对比 {{model_a}} 和 {{model_b}} 在 {{use_case}} 上：\n1. 哪个明显更强？引用最近半年公开 benchmark\n2. 价格 / 速度 / 上下文长度差异\n3. 哪些场景下 {{model_a}} 是 strict win？反之？\n4. 如果用户预算紧 / 不紧，分别推荐哪个\n\n来源不确定的明确说「我不确定」。"
  },
  {
    "title": "本地部署大模型选型",
    "body": "我有 {{gpu}} 显卡，{{vram}} GB 显存，{{ram}} GB 内存。要本地跑 {{purpose}} 任务。\n\n推荐：\n1. 模型选型（参数量 / 量化等级）\n2. 推理框架（llama.cpp / vLLM / Ollama / LM Studio 哪个适合）\n3. 量化版本（GGUF Q4_K_M? AWQ?）\n4. 上下文长度可达多少\n5. 一个具体可执行的 setup 命令链",
    "tags": [
      "LLM",
      "本地部署",
      "DeepSeek"
    ],
    "desc_zh": "本地部署大模型选型 brief（硬件 + 模型）",
    "category": "learn",
    "body_zh": "我有 {{gpu}} 显卡，{{vram}} GB 显存，{{ram}} GB 内存。要本地跑 {{purpose}} 任务。\n\n推荐：\n1. 模型选型（参数量 / 量化等级）\n2. 推理框架（llama.cpp / vLLM / Ollama / LM Studio 哪个适合）\n3. 量化版本（GGUF Q4_K_M? AWQ?）\n4. 上下文长度可达多少\n5. 一个具体可执行的 setup 命令链"
  },
  {
    "title": "AI 工具体验测评模板（小红书风）",
    "body": "我刚试了 {{tool_name}}。请帮我把试用感受组织成一段适合发小红书 / 即刻的内容：\n- 开头一句钩子（让人想看下去）\n- 核心三个点：能做什么 / 哪里强 / 哪里坑\n- 结尾一句行动建议（值得 / 不值得 / 等谁修了 X 再用）\n\n粗体笔记：{{notes}}",
    "tags": [
      "AI工具",
      "Marketing",
      "小红书"
    ],
    "desc_zh": "AI 工具体验测评模板（小红书风格）",
    "category": "content",
    "body_zh": "我刚试了 {{tool_name}}。请帮我把试用感受组织成一段适合发小红书 / 即刻的内容：\n- 开头一句钩子（让人想看下去）\n- 核心三个点：能做什么 / 哪里强 / 哪里坑\n- 结尾一句行动建议（值得 / 不值得 / 等谁修了 X 再用）\n\n粗体笔记：{{notes}}"
  },
  {
    "title": "AI 副业方向评估",
    "body": "评估这个 AI 副业方向：{{direction}}\n\n维度：\n1. 工作量（每天需投入小时数）\n2. 启动成本（金钱 + 学习曲线）\n3. 6 个月内能做到的现实月收入区间\n4. 主要风险（平台规则 / AI 退步 / 同质化）\n5. 用户已具备 {{user_skill}} 时的杠杆点\n\n不要把它说得太美好；说真话。",
    "tags": [
      "AI副业",
      "决策"
    ],
    "desc_zh": "评估 AI 副业方向（市场 + 竞争 + 难度）",
    "category": "biz-life",
    "body_zh": "评估这个 AI 副业方向：{{direction}}\n\n维度：\n1. 工作量（每天需投入小时数）\n2. 启动成本（金钱 + 学习曲线）\n3. 6 个月内能做到的现实月收入区间\n4. 主要风险（平台规则 / AI 退步 / 同质化）\n5. 用户已具备 {{user_skill}} 时的杠杆点\n\n不要把它说得太美好；说真话。"
  },
  {
    "title": "AI 教程视频结构",
    "body": "把这段 AI 教程内容组织成一个 5-8 分钟视频脚本：\n\n内容：{{content}}\n受众：{{audience}}\n\n结构：\n- 0-15s：钩子 + 「看完你能做到什么」一句话承诺\n- 15-60s：背景 / 为什么需要这个工具\n- 60s-3min：核心步骤 1（亲手 demo）\n- 3-5min：核心步骤 2 + 3\n- 末尾 15s：踩坑提醒 + 引导评论区互动\n\n避免冗长开场白。",
    "tags": [
      "AI教程",
      "B站",
      "小红书",
      "Marketing"
    ],
    "desc_zh": "AI 教程视频结构（钩子 + 内容 + 收尾）",
    "category": "content",
    "body_zh": "把这段 AI 教程内容组织成一个 5-8 分钟视频脚本：\n\n内容：{{content}}\n受众：{{audience}}\n\n结构：\n- 0-15s：钩子 + 「看完你能做到什么」一句话承诺\n- 15-60s：背景 / 为什么需要这个工具\n- 60s-3min：核心步骤 1（亲手 demo）\n- 3-5min：核心步骤 2 + 3\n- 末尾 15s：踩坑提醒 + 引导评论区互动\n\n避免冗长开场白。"
  },
  {
    "title": "DeepSeek-R1 thinking 区块解读",
    "body": "下面是 DeepSeek-R1 的 thinking 区块。请：\n1. 提取它真正的核心推理路径（≤ 5 步）\n2. 标出哪一步它纠正了自己（如果有）\n3. 对最终答案的置信度评估（高 / 中 / 低 + 一句理由）\n\n{{thinking_block}}",
    "tags": [
      "DeepSeek",
      "LLM",
      "推理"
    ],
    "desc_zh": "解读 DeepSeek-R1 的 thinking 区块",
    "category": "ai-coding",
    "body_zh": "下面是 DeepSeek-R1 的 thinking 区块。请：\n1. 提取它真正的核心推理路径（≤ 5 步）\n2. 标出哪一步它纠正了自己（如果有）\n3. 对最终答案的置信度评估（高 / 中 / 低 + 一句理由）\n\n{{thinking_block}}"
  },
  {
    "title": "AI 整理碎片笔记",
    "body": "下面是我的笔记原文（碎片散乱）。请按这个步骤整理：\n1. 先识别隐含的 2-4 个主题\n2. 把内容按主题归类\n3. 每个主题下：先要点（bullet），再补一句「为什么这块对我重要」\n4. 末尾加一节「开放问题」，列出我自己也没想清楚的 3 件事\n\n{{notes}}",
    "tags": [
      "效率",
      "笔记",
      "AI助手"
    ],
    "desc_zh": "把碎片笔记整理成结构化文档",
    "category": "work",
    "body_zh": "下面是我的笔记原文（碎片散乱）。请按这个步骤整理：\n1. 先识别隐含的 2-4 个主题\n2. 把内容按主题归类\n3. 每个主题下：先要点（bullet），再补一句「为什么这块对我重要」\n4. 末尾加一节「开放问题」，列出我自己也没想清楚的 3 件事\n\n{{notes}}"
  },
  {
    "title": "AI 生成小红书爆款标题",
    "body": "话题：{{topic}}\n受众：{{audience}}\n\n生成 10 个适合小红书的标题，要求：\n- ≤ 18 字\n- 含具体数字 / 对比 / 反常识 三选一\n- 不要带 emoji（封面已有）\n- 不要「赶紧收藏」这种过气句式\n- 末尾不要标点\n\n按预测点击率从高到低排。",
    "tags": [
      "小红书",
      "Marketing",
      "Writing"
    ],
    "desc_zh": "AI 生成小红书爆款标题（多 hook 测试）",
    "category": "content",
    "body_zh": "话题：{{topic}}\n受众：{{audience}}\n\n生成 10 个适合小红书的标题，要求：\n- ≤ 18 字\n- 含具体数字 / 对比 / 反常识 三选一\n- 不要带 emoji（封面已有）\n- 不要「赶紧收藏」这种过气句式\n- 末尾不要标点\n\n按预测点击率从高到低排。"
  },
  {
    "title": "Midjourney 一致性人物模板",
    "body": "Generate {{character_name}} consistent across multiple shots.\n\nReference: {{cref_url}} --cref --cw 100\nStyle reference: {{sref_url}} --sref\n\nScene: {{scene}}\nMood: {{mood}}\nAspect: --ar {{ar}}\nQuality: --v 6.1 --q 2 --style raw\n\nNegative: {{negative}} --no",
    "tags": [
      "Midjourney",
      "Image-Gen",
      "Character"
    ],
    "desc_zh": "Midjourney 一致性人物 prompt（不同场景）",
    "category": "ai-art",
    "body_zh": "用 Midjourney 生成一个角色，特征：{{features}}（性别 / 年龄 / 发型 / 服装）。用 --cref 锁定人物，--cw 100。生成 6 个不同场景：办公室 / 户外 / 卧室 / 健身房 / 咖啡馆 / 海边。"
  },
  {
    "title": "SD WebUI / Forge 通用 prompt 结构",
    "body": "(masterpiece:1.2), (best quality:1.2), (8k:1.1), {{subject}}, {{action}}, {{environment}}, (cinematic lighting:1.1), {{lens}}, {{color_palette}}, <lora:{{lora_name}}:0.8>\n\nNegative: lowres, bad anatomy, jpeg artifacts, watermark, text, signature, extra fingers, malformed hands, blurry",
    "tags": [
      "Stable Diffusion",
      "Image-Gen",
      "WebUI"
    ],
    "desc_zh": "SD WebUI / Forge 通用 prompt 结构（高质量）",
    "category": "ai-art",
    "body_zh": "用 Stable Diffusion (WebUI / Forge) 出图。Positive prompt 结构：(主体 + 动作), (风格), (镜头 + 灯光), (画质强化词)。Negative prompt: low quality, blurry, deformed。Sampler: DPM++ 2M Karras, Steps 30。\n\n主体: {{subject}}\n风格: {{style}}"
  },
  {
    "title": "AI 头像生成（社媒用）",
    "body": "Generate a clean avatar for {{platform}} based on this brief:\n\nMood: {{mood}}\nStyle: {{style}}\nColor palette: {{colors}}\nSquare aspect (1:1)\nFace clearly visible\nTransparent or solid background — no busy patterns\nNo text overlay\nProfessional but personable",
    "tags": [
      "Image-Gen",
      "头像",
      "Marketing"
    ],
    "desc_zh": "AI 生成社媒头像（多风格选择）",
    "category": "ai-art",
    "body_zh": "帮我生成 5 个适合 {{platform}}（如知乎/即刻/LinkedIn）的头像 prompt，风格：{{style}}（如简约/拟物/动漫）。每个 prompt 详细到可以直接喂 Midjourney/SD。"
  },
  {
    "title": "AI 壁纸生成（手机锁屏）",
    "body": "Mobile wallpaper, vertical 9:19.5 aspect, lock-screen safe.\n\nTheme: {{theme}}\nMood: {{mood}}\nDominant color: {{color}}\n\nAvoid:\n- Busy details in the top 1/3 (where lock-screen clock/notifications sit)\n- Extreme contrast that hurts notification readability\n- Text or logos\n- Recognizable celebrity faces (App Store rules)",
    "tags": [
      "Image-Gen",
      "壁纸"
    ],
    "desc_zh": "AI 生成手机锁屏壁纸（高分辨率）",
    "category": "ai-art",
    "body_zh": "生成一张 {{theme}} 主题的手机锁屏壁纸 prompt。规格：竖屏 9:16, 4K, 适合 OLED 屏（深色为主以省电）, 中心留时间显示空间。"
  },
  {
    "title": "ControlNet OpenPose 人物动作 prompt",
    "body": "ControlNet OpenPose 输入：{{pose_ref}}\n\nMain prompt: {{character}} doing {{action}}, {{outfit}}, {{environment}}, photorealistic, full body, {{lighting}}\n\nControlNet weight: 0.85\nDenoising: 0.7\nGuidance: 7.5",
    "tags": [
      "ControlNet",
      "Stable Diffusion",
      "Image-Gen"
    ],
    "desc_zh": "ControlNet OpenPose 控制人物动作 prompt",
    "category": "ai-art",
    "body_zh": "ControlNet OpenPose 输入：{{pose_ref}}\n\nMain prompt: {{character}} doing {{action}}, {{outfit}}, {{environment}}, photorealistic, full body, {{lighting}}\n\nControlNet weight: 0.85\nDenoising: 0.7\nGuidance: 7.5"
  },
  {
    "title": "可灵 Kling 1.6 视频 prompt（中文）",
    "body": "镜头：{{shot_type}}（特写/中景/全景/俯视/航拍）\n主体：{{subject}}\n主体动作：{{action}}（具象动词，不要形容词堆砌）\n环境：{{environment}}\n光影：{{lighting}}\n时长：{{duration}}秒\n风格：{{style}}\n\n不要的：{{negative}}",
    "tags": [
      "可灵",
      "Kling",
      "AI视频",
      "Video-Gen"
    ],
    "desc_zh": "可灵 1.6 中文视频 prompt（运镜 + 物理）",
    "category": "ai-video",
    "body_zh": "镜头：{{shot_type}}（特写/中景/全景/俯视/航拍）\n主体：{{subject}}\n主体动作：{{action}}（具象动词，不要形容词堆砌）\n环境：{{environment}}\n光影：{{lighting}}\n时长：{{duration}}秒\n风格：{{style}}\n\n不要的：{{negative}}"
  },
  {
    "title": "即梦 4.0 视频脚本",
    "body": "为即梦 4.0 写视频生成 prompt。\n\n场景：{{scene}}\n主体：{{subject}}\n关键动作：{{action}}\n时长：{{duration}}秒\n比例：{{aspect}}\n\n注意：\n- 即梦对中文 prompt 兼容更好，重要描述用中文\n- 多人场景容易出现穿模，避免\n- 复杂多动作分多段生成再剪",
    "tags": [
      "即梦",
      "AI视频",
      "Video-Gen"
    ],
    "desc_zh": "即梦 4.0 视频脚本模板",
    "category": "ai-video",
    "body_zh": "为即梦 4.0 写视频生成 prompt。\n\n场景：{{scene}}\n主体：{{subject}}\n关键动作：{{action}}\n时长：{{duration}}秒\n比例：{{aspect}}\n\n注意：\n- 即梦对中文 prompt 兼容更好，重要描述用中文\n- 多人场景容易出现穿模，避免\n- 复杂多动作分多段生成再剪"
  },
  {
    "title": "Veo 3 长 prompt（含同步音轨）",
    "body": "VEO 3 prompt with synchronized audio cue:\n\nScene: {{scene}}\nVisual: {{visual_description}}\nMotion: {{camera_motion}}\nDialogue (single line, lip-synced): \"{{dialogue}}\"\nSFX: {{sfx_description}}\nAmbient: {{ambient}}\nDuration: 8s",
    "tags": [
      "Veo",
      "AI视频",
      "Video-Gen"
    ],
    "desc_zh": "Veo 3 长 prompt（含同步音轨）",
    "category": "ai-video",
    "body_zh": "用 Veo 3 生成一段视频。\n\n场景: {{scene}}\n时长: {{duration}}\n运镜: {{camera}}\n音轨: 同步 {{audio_style}} (如「轻快电子乐 + 鸟叫」)\n物理: 真实物理（重力 / 光影）\n\n输出 1 个完整 prompt + 2 个备选风格变体。"
  },
  {
    "title": "MCP server 设计模板",
    "body": "为 Claude Code / Cursor 设计 MCP server，封装 {{capability}}。\n\n需要给我输出：\n1. server 名字 + 一句话定位\n2. 暴露的 tool 列表（每个：name / description / inputSchema）\n3. 安全边界（哪些操作绝不暴露）\n4. 错误处理：API 失败时返回什么 shape\n5. 需要的环境变量 + 是否敏感（API key 类）\n6. 一个完整 example tool call 演示",
    "tags": [
      "MCP",
      "Agent",
      "Coding-Agent",
      "Claude Code"
    ],
    "desc_zh": "MCP server 设计模板（工具 + 资源 + prompt）",
    "category": "ai-coding",
    "body_zh": "为 Claude Code / Cursor 设计 MCP server，封装 {{capability}}。\n\n需要给我输出：\n1. server 名字 + 一句话定位\n2. 暴露的 tool 列表（每个：name / description / inputSchema）\n3. 安全边界（哪些操作绝不暴露）\n4. 错误处理：API 失败时返回什么 shape\n5. 需要的环境变量 + 是否敏感（API key 类）\n6. 一个完整 example tool call 演示"
  },
  {
    "title": "FastGPT / MaxKB 知识库 prompt",
    "body": "你是 {{topic}} 知识库。检索结果在下方。\n\n要求：\n1. 答案严格基于检索文档，不外推\n2. 每条断言后用 [文档名 §节号] 标注\n3. 检索为空 → 「该知识库暂无此信息」，建议用户问 {{fallback_topic}}\n4. 检索矛盾 → 列出矛盾项让用户自行判断\n5. 用户问的过于宽泛 → 反问聚焦再答\n\n检索文档：{{retrieved_chunks}}\n用户问题：{{question}}",
    "tags": [
      "FastGPT",
      "MaxKB",
      "RAG",
      "Agent"
    ],
    "desc_zh": "FastGPT / MaxKB 知识库 prompt 起手",
    "category": "agent",
    "body_zh": "你是 {{topic}} 知识库。检索结果在下方。\n\n要求：\n1. 答案严格基于检索文档，不外推\n2. 每条断言后用 [文档名 §节号] 标注\n3. 检索为空 → 「该知识库暂无此信息」，建议用户问 {{fallback_topic}}\n4. 检索矛盾 → 列出矛盾项让用户自行判断\n5. 用户问的过于宽泛 → 反问聚焦再答\n\n检索文档：{{retrieved_chunks}}\n用户问题：{{question}}"
  },
  {
    "title": "MetaGPT 多 agent 协作 brief",
    "body": "需求：{{requirement}}\n\n按 MetaGPT 的 SOP 流程拆解：\n1. ProductManager: 写 PRD（用户故事 + 验收标准）\n2. Architect: 出系统设计（关键模块 + 接口）\n3. ProjectManager: 拆任务（每任务 ≤ 1 人天）\n4. Engineer: 实施每任务（含测试）\n5. QA: 集成测试 + 回归\n\n每个角色输出一个 markdown 段落，不要超过 500 字。",
    "tags": [
      "MetaGPT",
      "Agent",
      "智能体",
      "工程"
    ],
    "desc_zh": "MetaGPT 多 agent 协作 brief（角色分工）",
    "category": "agent",
    "body_zh": "需求：{{requirement}}\n\n按 MetaGPT 的 SOP 流程拆解：\n1. ProductManager: 写 PRD（用户故事 + 验收标准）\n2. Architect: 出系统设计（关键模块 + 接口）\n3. ProjectManager: 拆任务（每任务 ≤ 1 人天）\n4. Engineer: 实施每任务（含测试）\n5. QA: 集成测试 + 回归\n\n每个角色输出一个 markdown 段落，不要超过 500 字。"
  },
  {
    "title": "Agent 失败模式诊断清单",
    "body": "我的 {{agent_platform}} agent 在 {{task}} 上失败了：{{symptom}}\n\n按这 8 个常见失败模式排查：\n1. context window 溢出（input 太长）\n2. tool schema 错配（实际参数 vs 声明类型）\n3. 模型在 reasoning 时陷入 loop\n4. retrieval 召回错误片段\n5. system prompt 与 user prompt 矛盾\n6. token rate limit 触发但没正确 backoff\n7. 调用外部 API 时没处理 timeout\n8. JSON parsing 失败（模型输出含 markdown fence）\n\n按可能性排序给诊断思路。",
    "tags": [
      "Agent",
      "Debug",
      "智能体"
    ],
    "desc_zh": "Agent 失败模式 13 项诊断清单",
    "category": "agent",
    "body_zh": "我的 {{agent_platform}} agent 在 {{task}} 上失败了：{{symptom}}\n\n按这 8 个常见失败模式排查：\n1. context window 溢出（input 太长）\n2. tool schema 错配（实际参数 vs 声明类型）\n3. 模型在 reasoning 时陷入 loop\n4. retrieval 召回错误片段\n5. system prompt 与 user prompt 矛盾\n6. token rate limit 触发但没正确 backoff\n7. 调用外部 API 时没处理 timeout\n8. JSON parsing 失败（模型输出含 markdown fence）\n\n按可能性排序给诊断思路。"
  },
  {
    "title": "Aider 单 commit 任务模板",
    "body": "/add {{files}}\n\n任务：{{task}}\n\n约束：\n- 一个 logical change，对应一个 commit\n- commit message 用 conventional commits（feat/fix/refactor/test/docs/chore）\n- 不顺手清理无关代码（即使诱人）\n- 完成后跑 {{test_cmd}} 确认\n\n/run pytest -xvs",
    "tags": [
      "Aider",
      "Coding-Agent"
    ],
    "desc_zh": "Aider 单 commit 任务标准模板",
    "category": "ai-coding",
    "body_zh": "/add {{files}}\n\n任务：{{task}}\n\n约束：\n- 一个 logical change，对应一个 commit\n- commit message 用 conventional commits（feat/fix/refactor/test/docs/chore）\n- 不顺手清理无关代码（即使诱人）\n- 完成后跑 {{test_cmd}} 确认\n\n/run pytest -xvs"
  },
  {
    "title": "Continue.dev 项目 system prompt",
    "body": "你是这个 {{language}} 项目的 pair programmer。\n\n上下文优先级（高 → 低）：\n1. .continueignore 之外的文件 + 当前打开 tab\n2. git diff（未提交改动）\n3. 同目录其他文件\n4. 项目 README\n\n回答风格：\n- 先 short summary\n- 后给完整代码块（标语言）\n- 最后一行：「需要我跑测试 / 解释这段 / 改某个细节吗？」",
    "tags": [
      "Continue.dev",
      "Coding-Agent"
    ],
    "desc_zh": "Continue.dev 项目 system prompt",
    "category": "ai-coding",
    "body_zh": "你是这个 {{language}} 项目的 pair programmer。\n\n上下文优先级（高 → 低）：\n1. .continueignore 之外的文件 + 当前打开 tab\n2. git diff（未提交改动）\n3. 同目录其他文件\n4. 项目 README\n\n回答风格：\n- 先 short summary\n- 后给完整代码块（标语言）\n- 最后一行：「需要我跑测试 / 解释这段 / 改某个细节吗？」"
  },
  {
    "title": "Trae / Qoder 国产 IDE agent prompt",
    "body": "你在 {{ide_name}} 中作为 AI 助手，主要服务中国大陆开发者。\n\n约束：\n- 默认中文回答；代码注释中文\n- 网络资源默认用国内镜像（npm 用 registry.npmmirror.com，pypi 用 pypi.tuna.tsinghua.edu.cn）\n- 涉及部署默认假设国内云（阿里云/腾讯云），除非用户明说海外\n- 不推荐已被国内屏蔽的服务（OpenAI / GitHub Codespaces 等），改推开源平替",
    "tags": [
      "Trae",
      "Qoder",
      "Coding-Agent",
      "国产工具"
    ],
    "desc_zh": "Trae / Qoder 国产 IDE agent prompt 模板",
    "category": "ai-coding",
    "body_zh": "你在 {{ide_name}} 中作为 AI 助手，主要服务中国大陆开发者。\n\n约束：\n- 默认中文回答；代码注释中文\n- 网络资源默认用国内镜像（npm 用 registry.npmmirror.com，pypi 用 pypi.tuna.tsinghua.edu.cn）\n- 涉及部署默认假设国内云（阿里云/腾讯云），除非用户明说海外\n- 不推荐已被国内屏蔽的服务（OpenAI / GitHub Codespaces 等），改推开源平替"
  },
  {
    "title": "AI 补全代码后的自我审查清单",
    "body": "我刚让 AI 补完了一段 {{language}} 代码（如下）。在我合入前，按这清单 review：\n\n1. 是否引入新的依赖 / import？是否必要？\n2. 错误处理：边界情况覆盖？还是只有 happy path？\n3. 命名是否符合本项目风格？\n4. 性能：有 O(n^2)+ 或不必要 IO？\n5. 安全：用户输入是否未校验直接拼接？\n6. 测试：哪些路径还未覆盖？\n7. 注释：是否有 AI 生成的废话注释（说\"return value\"之类）？\n\n代码：\n```\n{{code}}\n```",
    "tags": [
      "Coding-Agent",
      "Code Review",
      "AI助手"
    ],
    "desc_zh": "AI 写完代码后的自我审查 7 项清单",
    "category": "ai-coding",
    "body_zh": "我刚让 AI 补完了一段 {{language}} 代码（如下）。在我合入前，按这清单 review：\n\n1. 是否引入新的依赖 / import？是否必要？\n2. 错误处理：边界情况覆盖？还是只有 happy path？\n3. 命名是否符合本项目风格？\n4. 性能：有 O(n^2)+ 或不必要 IO？\n5. 安全：用户输入是否未校验直接拼接？\n6. 测试：哪些路径还未覆盖？\n7. 注释：是否有 AI 生成的废话注释（说\"return value\"之类）？\n\n代码：\n```\n{{code}}\n```"
  },
  {
    "title": "AI 内容创作流水线设计",
    "body": "我想做 {{niche}} 方向的 {{platform}} AI 内容账号。设计完整流水线：\n\n1. 选题：每周从哪取？（关键词 / 热搜 / 信息源 3 选 1）\n2. 撰稿：哪个 AI 写第一稿？{{writing_ai}}\n3. 配图：哪个 AI 出图？{{image_ai}}\n4. 校对：人工 + AI 双重\n5. 发布：每周几篇 / 哪个时间段\n6. 数据回收：3 周后总结点击率 / 涨粉 / 互动\n\n附：每个工具粗略时间成本和金钱成本。",
    "tags": [
      "AI副业",
      "Marketing",
      "内容创作"
    ],
    "desc_zh": "AI 内容创作流水线设计（idea → 发布）",
    "category": "biz-life",
    "body_zh": "我想做 {{niche}} 方向的 {{platform}} AI 内容账号。设计完整流水线：\n\n1. 选题：每周从哪取？（关键词 / 热搜 / 信息源 3 选 1）\n2. 撰稿：哪个 AI 写第一稿？{{writing_ai}}\n3. 配图：哪个 AI 出图？{{image_ai}}\n4. 校对：人工 + AI 双重\n5. 发布：每周几篇 / 哪个时间段\n6. 数据回收：3 周后总结点击率 / 涨粉 / 互动\n\n附：每个工具粗略时间成本和金钱成本。"
  },
  {
    "title": "ChatGPT 销售文案写作（带场景）",
    "body": "为 {{product}} 写销售文案：\n\n受众：{{audience_one_liner}}\n核心痛点：{{pain}}\n反差卖点（与竞品最大差异）：{{differentiator}}\n价格：{{price}}\n\n输出 3 个版本：\n1. 长版（300 字）适合官网\n2. 短版（80 字）适合朋友圈\n3. 一句话（≤ 20 字）适合标题/广告\n\n避免：「行业领先」「业内首创」「赋能」「闭环」「抓手」等管理黑话。",
    "tags": [
      "销售文案",
      "Marketing",
      "ChatGPT"
    ],
    "desc_zh": "ChatGPT 销售文案写作（带具体场景）",
    "category": "content",
    "body_zh": "为 {{product}} 写销售文案：\n\n受众：{{audience_one_liner}}\n核心痛点：{{pain}}\n反差卖点（与竞品最大差异）：{{differentiator}}\n价格：{{price}}\n\n输出 3 个版本：\n1. 长版（300 字）适合官网\n2. 短版（80 字）适合朋友圈\n3. 一句话（≤ 20 字）适合标题/广告\n\n避免：「行业领先」「业内首创」「赋能」「闭环」「抓手」等管理黑话。"
  },
  {
    "title": "AI 评测短文模板（小红书 / 即刻）",
    "body": "评测对象：{{tool_name}}\n核心场景：{{use_case}}\n\n按这个结构写 ~300 字测评：\n1. 一句钩子：「{{tool_name}} 真的能 X 吗？我试了 {{n}} 次」\n2. 测试条件（公平起见说明：版本号 / 价格 / 提示词）\n3. 强项：1-2 个具体可复现的例子\n4. 弱点：1 个真实失败案例\n5. 结论：什么人值得用 / 什么人别浪费时间\n6. 末尾：留一个开放问题\n\n标签：#AI评测 #{{tool_name}} #小红书\n",
    "tags": [
      "AI评测",
      "小红书",
      "Marketing"
    ],
    "desc_zh": "AI 评测短文模板（小红书 / 即刻 风格）",
    "category": "content",
    "body_zh": "评测对象：{{tool_name}}\n核心场景：{{use_case}}\n\n按这个结构写 ~300 字测评：\n1. 一句钩子：「{{tool_name}} 真的能 X 吗？我试了 {{n}} 次」\n2. 测试条件（公平起见说明：版本号 / 价格 / 提示词）\n3. 强项：1-2 个具体可复现的例子\n4. 弱点：1 个真实失败案例\n5. 结论：什么人值得用 / 什么人别浪费时间\n6. 末尾：留一个开放问题\n\n标签：#AI评测 #{{tool_name}} #小红书\n"
  },
  {
    "title": "AI 生成会议纪要（带 action items）",
    "body": "下面是会议录音转写。请整理成会议纪要：\n\n1. 一行参会人和角色\n2. 决定事项（每条带决策人）\n3. **Action items**：每条 = [负责人] + [事项] + [截止日期]，截止日期没说就标 \"未定\"\n4. 悬而未决：列出会议没解决的关键问题\n5. 一句话总结这场会的产出\n\n转写：\n{{transcript}}",
    "tags": [
      "效率",
      "会议纪要",
      "AI助手"
    ],
    "desc_zh": "AI 生成会议纪要（含 action items）",
    "category": "work",
    "body_zh": "下面是会议录音转写。请整理成会议纪要：\n\n1. 一行参会人和角色\n2. 决定事项（每条带决策人）\n3. **Action items**：每条 = [负责人] + [事项] + [截止日期]，截止日期没说就标 \"未定\"\n4. 悬而未决：列出会议没解决的关键问题\n5. 一句话总结这场会的产出\n\n转写：\n{{transcript}}"
  },
  {
    "title": "ChatGPT/Claude 写邮件回复",
    "body": "对方邮件：\n{{their_email}}\n\n我想达成的目的：{{my_intent}}\n\n回复要求：\n- 长度 ≤ 120 字\n- 第一句直接回应他们最在意的点\n- 我的 ask 只有一个，明确\n- 语气：{{tone}}（professional / warm / firm）\n- 不写 \"hope you're doing well\" 这类 filler 开头",
    "tags": [
      "邮件",
      "Email",
      "Writing"
    ],
    "desc_zh": "ChatGPT/Claude 写邮件回复（保留语气）",
    "category": "work",
    "body_zh": "对方邮件：\n{{their_email}}\n\n我想达成的目的：{{my_intent}}\n\n回复要求：\n- 长度 ≤ 120 字\n- 第一句直接回应他们最在意的点\n- 我的 ask 只有一个，明确\n- 语气：{{tone}}（professional / warm / firm）\n- 不写 \"hope you're doing well\" 这类 filler 开头"
  },
  {
    "title": "AI 帮我吵架（理性版）",
    "body": "我跟 {{对方}} 在 {{话题}} 上有分歧。事实如下：\n{{facts}}\n\n请：\n1. 把我的观点按事实 + 推理拆出来（不要立场化）\n2. 把对方观点同样拆出来（要客观，不要稻草人化）\n3. 找出真正的核心分歧点（一句话）\n4. 列出 2 个我可以让步的、2 个对方可以让步的\n5. 建议一句话沟通话术，让对方不爆炸",
    "tags": [
      "沟通",
      "AI助手"
    ],
    "desc_zh": "用 AI 理性表达不满（替代吵架）",
    "category": "biz-life",
    "body_zh": "我跟 {{对方}} 在 {{话题}} 上有分歧。事实如下：\n{{facts}}\n\n请：\n1. 把我的观点按事实 + 推理拆出来（不要立场化）\n2. 把对方观点同样拆出来（要客观，不要稻草人化）\n3. 找出真正的核心分歧点（一句话）\n4. 列出 2 个我可以让步的、2 个对方可以让步的\n5. 建议一句话沟通话术，让对方不爆炸"
  },
  {
    "title": "AI 整理 PDF / 长文 → Anki 卡",
    "body": "下面是文本 / PDF 抽取内容。生成 Anki 卡片：\n\n规则：\n- 每张卡 question/answer 对\n- question 短、聚焦一个点（≤ 25 字）\n- answer 简洁（≤ 60 字），不复述背景\n- 出 8-15 张，不要太多\n- 跳过定义性死记硬背的，挑「容易考」的关键概念\n- 可加 cloze（{{c1::xxx}} 形式）\n\n文本：\n{{text}}",
    "tags": [
      "学习",
      "Anki",
      "笔记"
    ],
    "desc_zh": "AI 把 PDF / 长文整理成 Anki 卡（间隔重复）",
    "category": "learn",
    "body_zh": "下面是文本 / PDF 抽取内容。生成 Anki 卡片：\n\n规则：\n- 每张卡 question/answer 对\n- question 短、聚焦一个点（≤ 25 字）\n- answer 简洁（≤ 60 字），不复述背景\n- 出 8-15 张，不要太多\n- 跳过定义性死记硬背的，挑「容易考」的关键概念\n- 可加 cloze（{{c1::xxx}} 形式）\n\n文本：\n{{text}}"
  },
  {
    "title": "AI 重写 commit message（按 conventional）",
    "body": "把这条糟糕的 commit message 改成 conventional commits 格式：\n\n原文：{{raw_message}}\n\n输出：\n- 第一行：type(scope): subject（≤ 70 字符，subject 用祈使句）\n- 空行\n- body：解释 WHY（不是 WHAT，diff 已经说了 what）\n- 如果是 breaking change，加 BREAKING CHANGE: 段\n\n如果原文不够清晰，用 [需要补充] 标记，不编造细节。",
    "tags": [
      "Coding-Agent",
      "Git",
      "效率"
    ],
    "desc_zh": "AI 重写 commit message 按 conventional commits",
    "category": "ai-coding",
    "body_zh": "把这条糟糕的 commit message 改成 conventional commits 格式：\n\n原文：{{raw_message}}\n\n输出：\n- 第一行：type(scope): subject（≤ 70 字符，subject 用祈使句）\n- 空行\n- body：解释 WHY（不是 WHAT，diff 已经说了 what）\n- 如果是 breaking change，加 BREAKING CHANGE: 段\n\n如果原文不够清晰，用 [需要补充] 标记，不编造细节。"
  },
  {
    "title": "AI 生成 SQL（带安全检查）",
    "body": "需求：{{question}}\n表结构：\n{{schema}}\n\n输出：\n1. SQL 查询（{{dialect}}）\n2. 解释每个 join / 子查询的意图\n3. 警告（如适用）：\n   - 这个 query 可能扫多少行？\n   - 缺哪些索引会让它慢？\n   - 是否有可能被 SQL injection（如果 user input 拼）\n   - 数据量大时哪里要分页\n",
    "tags": [
      "SQL",
      "Coding-Agent",
      "数据"
    ],
    "desc_zh": "AI 生成 SQL（带安全检查 + 执行 plan）",
    "category": "ai-coding",
    "body_zh": "需求：{{question}}\n表结构：\n{{schema}}\n\n输出：\n1. SQL 查询（{{dialect}}）\n2. 解释每个 join / 子查询的意图\n3. 警告（如适用）：\n   - 这个 query 可能扫多少行？\n   - 缺哪些索引会让它慢？\n   - 是否有可能被 SQL injection（如果 user input 拼）\n   - 数据量大时哪里要分页\n"
  },
  {
    "title": "AI 起 PR / MR 描述",
    "body": "git diff 输出：\n```\n{{diff}}\n```\n\n生成 PR 描述：\n## What\n（1-2 句话讲改动）\n\n## Why\n（动机：解决什么问题/实现什么需求）\n\n## How\n（关键设计选择 / 取舍，≤ 4 条 bullet）\n\n## Test plan\n（- [ ] 列表，每条具体到「跑什么命令验证什么行为」）\n\n## Notes for reviewer\n（如有：哪个文件先看 / 哪个改动反直觉）",
    "tags": [
      "Git",
      "PR",
      "Coding-Agent"
    ],
    "desc_zh": "AI 起 PR / MR 描述（含变更摘要）",
    "category": "ai-coding",
    "body_zh": "git diff 输出：\n```\n{{diff}}\n```\n\n生成 PR 描述：\n## What\n（1-2 句话讲改动）\n\n## Why\n（动机：解决什么问题/实现什么需求）\n\n## How\n（关键设计选择 / 取舍，≤ 4 条 bullet）\n\n## Test plan\n（- [ ] 列表，每条具体到「跑什么命令验证什么行为」）\n\n## Notes for reviewer\n（如有：哪个文件先看 / 哪个改动反直觉）"
  },
  {
    "title": "AI 学习路径生成（30 天计划）",
    "body": "我想 30 天内入门 {{topic}}（当前水平 {{current_level}}）。每天 {{hours_per_day}} 小时。\n\n输出：\n- 每周一个里程碑（4 个里程碑）\n- 每天具体任务（任务名 + 时长 + 资源链接 if 公开）\n- 第 7/14/21/30 天的自检测验（≤ 5 题）\n- 容易卡住的 3 个点 + 卡住时怎么求助\n\n避免：列大堆视频让我看；要给可执行的小任务。",
    "tags": [
      "学习",
      "AI助手",
      "效率"
    ],
    "desc_zh": "AI 生成 30 天学习路径（含每日任务）",
    "category": "learn",
    "body_zh": "我想 30 天内入门 {{topic}}（当前水平 {{current_level}}）。每天 {{hours_per_day}} 小时。\n\n输出：\n- 每周一个里程碑（4 个里程碑）\n- 每天具体任务（任务名 + 时长 + 资源链接 if 公开）\n- 第 7/14/21/30 天的自检测验（≤ 5 题）\n- 容易卡住的 3 个点 + 卡住时怎么求助\n\n避免：列大堆视频让我看；要给可执行的小任务。"
  },
  {
    "title": "Feynman 笔记法 LLM 版",
    "body": "我学了 {{topic}}。请扮演 12 岁的人，对我用大白话讲这个主题的尝试提问。每轮 1 个问题，等我答完再下一题。\n\n规则：\n- 不要赞美我的回答；直击没讲清楚的点\n- 我说\"过\"才进入下一题\n- 每 3 题给我一次「你哪里讲不清」的反馈\n- 8 题后总结我哪些理解还有缺口",
    "tags": [
      "学习",
      "Feynman",
      "AI助手"
    ],
    "desc_zh": "Feynman 笔记法的 LLM 版本",
    "category": "learn",
    "body_zh": "我学了 {{topic}}。请扮演 12 岁的人，对我用大白话讲这个主题的尝试提问。每轮 1 个问题，等我答完再下一题。\n\n规则：\n- 不要赞美我的回答；直击没讲清楚的点\n- 我说\"过\"才进入下一题\n- 每 3 题给我一次「你哪里讲不清」的反馈\n- 8 题后总结我哪些理解还有缺口"
  },
  {
    "title": "知识点 → mermaid 图",
    "body": "把下面的知识点 / 概念关系，输出为 mermaid 图（flowchart 或 mindmap，自选合适的）。要求：\n- 节点名简洁（≤ 6 字）\n- 每条边带 label 说明关系\n- 复杂层级用 subgraph 分组\n- 末尾给 1 句话总结这张图想表达的核心\n\n知识点：{{points}}",
    "tags": [
      "学习",
      "可视化",
      "笔记"
    ],
    "desc_zh": "把知识点结构化成 mermaid 图（流程/思维）",
    "category": "learn",
    "body_zh": "把下面的知识点 / 概念关系，输出为 mermaid 图（flowchart 或 mindmap，自选合适的）。要求：\n- 节点名简洁（≤ 6 字）\n- 每条边带 label 说明关系\n- 复杂层级用 subgraph 分组\n- 末尾给 1 句话总结这张图想表达的核心\n\n知识点：{{points}}"
  },
  {
    "title": "自媒体选题挖掘 prompt",
    "body": "我要做 {{niche}} 方向的自媒体，平台 {{platform}}。基于：\n- 当前热点 {{trending}}\n- 我的差异化优势 {{my_edge}}\n\n生成 20 个潜在选题，每个：\n- 标题（≤ 18 字）\n- 钩子（一句话承诺读者能 take away 什么）\n- 工作量预估（轻 / 中 / 重）\n- 同质化风险（已有多少同类内容）\n\n按「钩子强度 - 工作量 - 同质化风险」综合分排序。",
    "tags": [
      "自媒体",
      "选题",
      "Marketing"
    ],
    "desc_zh": "自媒体选题挖掘 prompt（趋势 + 痛点）",
    "category": "content",
    "body_zh": "我要做 {{niche}} 方向的自媒体，平台 {{platform}}。基于：\n- 当前热点 {{trending}}\n- 我的差异化优势 {{my_edge}}\n\n生成 20 个潜在选题，每个：\n- 标题（≤ 18 字）\n- 钩子（一句话承诺读者能 take away 什么）\n- 工作量预估（轻 / 中 / 重）\n- 同质化风险（已有多少同类内容）\n\n按「钩子强度 - 工作量 - 同质化风险」综合分排序。"
  },
  {
    "title": "短视频脚本 Hook 测试",
    "body": "为这个内容生成 5 种不同的开场 hook（前 3 秒），目标：滑到的人忍不住停下。\n\n内容主题：{{theme}}\n受众：{{audience}}\n\n5 种 hook 风格：\n1. 反常识陈述\n2. 具体数字 + 对比\n3. 第一人称糟糕经历\n4. 直接挑战观众认知\n5. 神秘感（讲一半留悬念）\n\n每个 hook ≤ 20 字。",
    "tags": [
      "短视频",
      "Marketing",
      "Writing"
    ],
    "desc_zh": "短视频脚本 Hook 测试（多版本 A/B）",
    "category": "content",
    "body_zh": "为这个内容生成 5 种不同的开场 hook（前 3 秒），目标：滑到的人忍不住停下。\n\n内容主题：{{theme}}\n受众：{{audience}}\n\n5 种 hook 风格：\n1. 反常识陈述\n2. 具体数字 + 对比\n3. 第一人称糟糕经历\n4. 直接挑战观众认知\n5. 神秘感（讲一半留悬念）\n\n每个 hook ≤ 20 字。"
  },
  {
    "title": "公众号长文结构 outline",
    "body": "为下面的素材组织成一篇 2000-3000 字的公众号长文：\n\n素材：{{material}}\n核心论点：{{core_argument}}\n\n输出 outline：\n- 标题（≤ 25 字，避开关键词堆砌）\n- 开篇钩子 100 字\n- 正文 4-5 个段落（每段 1 个分论点 + 1 个具体例证）\n- 结尾 80 字（call to think，不是 call to action）\n- 末尾 3 个备选标题（不同角度）\n",
    "tags": [
      "公众号",
      "Writing",
      "Marketing"
    ],
    "desc_zh": "公众号长文结构 outline（钩子 + 干货 + CTA）",
    "category": "content",
    "body_zh": "为下面的素材组织成一篇 2000-3000 字的公众号长文：\n\n素材：{{material}}\n核心论点：{{core_argument}}\n\n输出 outline：\n- 标题（≤ 25 字，避开关键词堆砌）\n- 开篇钩子 100 字\n- 正文 4-5 个段落（每段 1 个分论点 + 1 个具体例证）\n- 结尾 80 字（call to think，不是 call to action）\n- 末尾 3 个备选标题（不同角度）\n"
  },
  {
    "title": "代码迁移 prompt（语言 / 框架）",
    "body": "把这段 {{from_lang}} 代码迁移到 {{to_lang}}。\n\n```\n{{code}}\n```\n\n要求：\n1. 保持语义等价；不重构\n2. 保留原注释（翻译成 {{to_lang}} 习惯用法）\n3. 标准库 / 第三方库映射用 {{to_lang}} 生态主流的（不要冷门）\n4. 边界情况：原代码没显式处理的，新代码也别加（保持等价）\n5. 末尾列出 3 个值得人类 review 的语义微妙点",
    "tags": [
      "编程",
      "迁移",
      "Coding-Agent"
    ],
    "desc_zh": "代码语言/框架迁移 prompt（含 diff）",
    "category": "ai-coding",
    "body_zh": "把这段 {{from_lang}} 代码迁移到 {{to_lang}}。\n\n```\n{{code}}\n```\n\n要求：\n1. 保持语义等价；不重构\n2. 保留原注释（翻译成 {{to_lang}} 习惯用法）\n3. 标准库 / 第三方库映射用 {{to_lang}} 生态主流的（不要冷门）\n4. 边界情况：原代码没显式处理的，新代码也别加（保持等价）\n5. 末尾列出 3 个值得人类 review 的语义微妙点"
  },
  {
    "title": "API 设计 review",
    "body": "Review 这个 API 设计草稿。重点关注：\n\n1. RESTful 一致性（资源命名、HTTP 动词使用）\n2. 错误响应：4xx vs 5xx 划分对吗？错误体 schema 一致吗？\n3. 幂等性：哪些端点应该 idempotent，是否做到\n4. 分页：cursor-based 还是 offset？是否一致\n5. 版本管理（URL vs Header）\n6. 认证：哪些端点缺 auth？\n7. 返回字段 deprecation 策略\n\n设计：\n{{api_spec}}",
    "tags": [
      "API",
      "Code Review",
      "Coding-Agent"
    ],
    "desc_zh": "API 设计 review（REST/GraphQL/gRPC）",
    "category": "ai-coding",
    "body_zh": "Review 这个 API 设计草稿。重点关注：\n\n1. RESTful 一致性（资源命名、HTTP 动词使用）\n2. 错误响应：4xx vs 5xx 划分对吗？错误体 schema 一致吗？\n3. 幂等性：哪些端点应该 idempotent，是否做到\n4. 分页：cursor-based 还是 offset？是否一致\n5. 版本管理（URL vs Header）\n6. 认证：哪些端点缺 auth？\n7. 返回字段 deprecation 策略\n\n设计：\n{{api_spec}}"
  },
  {
    "title": "数据库 schema 演进 prompt",
    "body": "我有这个 {{db_dialect}} schema：\n```\n{{current_schema}}\n```\n\n需要支持新需求：{{requirement}}\n\n输出：\n1. 推荐 schema 改动（DDL）\n2. 数据迁移 SQL（生产安全的：分批、index 先建后删等）\n3. 是否需要 application code 改动同步\n4. 回滚方案\n5. 性能影响估计（哪些 query 变慢/变快）\n6. 建议的索引",
    "tags": [
      "数据库",
      "SQL",
      "Coding-Agent"
    ],
    "desc_zh": "数据库 schema 演进 prompt（zero-downtime）",
    "category": "ai-coding",
    "body_zh": "我有这个 {{db_dialect}} schema：\n```\n{{current_schema}}\n```\n\n需要支持新需求：{{requirement}}\n\n输出：\n1. 推荐 schema 改动（DDL）\n2. 数据迁移 SQL（生产安全的：分批、index 先建后删等）\n3. 是否需要 application code 改动同步\n4. 回滚方案\n5. 性能影响估计（哪些 query 变慢/变快）\n6. 建议的索引"
  },
  {
    "title": "性能瓶颈定位 prompt",
    "body": "下面是性能 profile / log 输出：\n\n```\n{{profile}}\n```\n\n应用类型：{{app_type}}（web/CLI/iOS/...）\n问题症状：{{symptom}}\n\n分析：\n1. 最可疑的 3 个瓶颈（按概率排序）\n2. 每个瓶颈：怎么进一步验证？怎么修？\n3. 不要的：CPU 100% 这种总览描述；要具体函数 / SQL / 网络调用\n4. 末尾：低 risk 的 quick win 1 个 + 高 leverage 但需要重写的 1 个",
    "tags": [
      "性能",
      "Debug",
      "Coding-Agent"
    ],
    "desc_zh": "性能瓶颈定位 prompt（含 profiling 指引）",
    "category": "ai-coding",
    "body_zh": "下面是性能 profile / log 输出：\n\n```\n{{profile}}\n```\n\n应用类型：{{app_type}}（web/CLI/iOS/...）\n问题症状：{{symptom}}\n\n分析：\n1. 最可疑的 3 个瓶颈（按概率排序）\n2. 每个瓶颈：怎么进一步验证？怎么修？\n3. 不要的：CPU 100% 这种总览描述；要具体函数 / SQL / 网络调用\n4. 末尾：低 risk 的 quick win 1 个 + 高 leverage 但需要重写的 1 个"
  },
  {
    "title": "商业模式画布快速填",
    "body": "为「{{idea_one_liner}}」填 Business Model Canvas 9 格：\n\n1. Customer Segments\n2. Value Propositions\n3. Channels\n4. Customer Relationships\n5. Revenue Streams\n6. Key Resources\n7. Key Activities\n8. Key Partnerships\n9. Cost Structure\n\n每格 ≤ 50 字。空着的格子直接说\"未确定\"，不要硬填。\n末尾：1 句话指出哪一格是这个 idea 的最大风险。",
    "tags": [
      "创业",
      "决策",
      "商业模式"
    ],
    "desc_zh": "商业模式画布 9 格快速填",
    "category": "biz-life",
    "body_zh": "为「{{idea_one_liner}}」填 Business Model Canvas 9 格：\n\n1. Customer Segments\n2. Value Propositions\n3. Channels\n4. Customer Relationships\n5. Revenue Streams\n6. Key Resources\n7. Key Activities\n8. Key Partnerships\n9. Cost Structure\n\n每格 ≤ 50 字。空着的格子直接说\"未确定\"，不要硬填。\n末尾：1 句话指出哪一格是这个 idea 的最大风险。"
  },
  {
    "title": "AI 分析竞品",
    "body": "竞品：{{competitor}}\n我的产品：{{my_product}}\n相似维度：{{similarity}}\n差异维度：{{differentiator}}\n\n分析：\n1. 它的核心增长引擎是什么（推荐 / SEO / 销售 / 网络效应）\n2. 它最强的 3 个能力 + 最弱的 3 个\n3. 我可以「正面打」的点 vs 必须绕开的点\n4. 它最近 6 个月的动作（公开信息）\n5. 我应该模仿 / 参考 / 远离的具体做法各 2 条",
    "tags": [
      "竞品分析",
      "调研",
      "决策"
    ],
    "desc_zh": "AI 分析竞品（5 维度 + 差异化建议）",
    "category": "biz-life",
    "body_zh": "竞品：{{competitor}}\n我的产品：{{my_product}}\n相似维度：{{similarity}}\n差异维度：{{differentiator}}\n\n分析：\n1. 它的核心增长引擎是什么（推荐 / SEO / 销售 / 网络效应）\n2. 它最强的 3 个能力 + 最弱的 3 个\n3. 我可以「正面打」的点 vs 必须绕开的点\n4. 它最近 6 个月的动作（公开信息）\n5. 我应该模仿 / 参考 / 远离的具体做法各 2 条"
  },
  {
    "title": "用户访谈半结构化模板",
    "body": "为 {{product_or_idea}} 设计用户访谈剧本。半结构化（≤ 30 分钟）。\n\n输出：\n- 暖场 3 分钟：让对方放松的开场（与产品无关）\n- 背景挖掘 5 分钟：他在 {{problem_space}} 里现有的工作流是怎样的\n- 核心 15 分钟：3-4 个开放问题，每个有 follow-up 提示\n- 反向问 5 分钟：让对方教我没想到的\n- 收尾 2 分钟\n\n问题原则：用 \"上次你 X 是什么时候？讲讲那次\" 而不是 \"你会 X 吗？\"",
    "tags": [
      "用户研究",
      "调研",
      "决策"
    ],
    "desc_zh": "用户访谈半结构化模板（暖场 + 5 主问 + 收尾）",
    "category": "biz-life",
    "body_zh": "为 {{product_or_idea}} 设计用户访谈剧本。半结构化（≤ 30 分钟）。\n\n输出：\n- 暖场 3 分钟：让对方放松的开场（与产品无关）\n- 背景挖掘 5 分钟：他在 {{problem_space}} 里现有的工作流是怎样的\n- 核心 15 分钟：3-4 个开放问题，每个有 follow-up 提示\n- 反向问 5 分钟：让对方教我没想到的\n- 收尾 2 分钟\n\n问题原则：用 \"上次你 X 是什么时候？讲讲那次\" 而不是 \"你会 X 吗？\""
  },
  {
    "title": "AI 帮我做菜单（按冰箱）",
    "body": "我冰箱有：{{ingredients}}\n餐厅倾向：{{cuisine}}\n几个人吃：{{servings}}\n做菜时间预算：{{minutes}} 分钟\n\n推荐 3 个菜，按「时间 - 难度 - 营养」综合排。每个：\n- 菜名\n- 缺哪些原料需要买（如果要买的话）\n- 总耗时（含洗切）\n- 关键步骤（≤ 5 步）\n- 替代方案（如果某个原料没有）",
    "tags": [
      "生活",
      "美食"
    ],
    "desc_zh": "AI 按冰箱食材生成菜单（中式 / 一周）",
    "category": "biz-life",
    "body_zh": "我冰箱有：{{ingredients}}\n餐厅倾向：{{cuisine}}\n几个人吃：{{servings}}\n做菜时间预算：{{minutes}} 分钟\n\n推荐 3 个菜，按「时间 - 难度 - 营养」综合排。每个：\n- 菜名\n- 缺哪些原料需要买（如果要买的话）\n- 总耗时（含洗切）\n- 关键步骤（≤ 5 步）\n- 替代方案（如果某个原料没有）"
  },
  {
    "title": "AI 旅行规划器",
    "body": "目的地：{{destination}}\n时间：{{date}} 起 {{days}} 天\n预算：{{budget}}\n人数：{{travelers}}\n偏好：{{preferences}}（自然/美食/历史/购物 等）\n\n规划：\n1. Day-by-day 行程（每天 3-4 活动 + 餐 + 交通）\n2. 必订（机票 / 关键景点门票 / 热门餐厅）\n3. 不要去（坑 / 已经过气 / 性价比低）\n4. 当地特别提示（不为人知的小经验）\n5. 应急联系（领事馆 / 翻译 app）\n\n避免：千篇一律的「打卡景点」清单。",
    "tags": [
      "生活",
      "旅行"
    ],
    "desc_zh": "AI 旅行规划器（含交通 + 住宿 + 备选）",
    "category": "biz-life",
    "body_zh": "目的地：{{destination}}\n时间：{{date}} 起 {{days}} 天\n预算：{{budget}}\n人数：{{travelers}}\n偏好：{{preferences}}（自然/美食/历史/购物 等）\n\n规划：\n1. Day-by-day 行程（每天 3-4 活动 + 餐 + 交通）\n2. 必订（机票 / 关键景点门票 / 热门餐厅）\n3. 不要去（坑 / 已经过气 / 性价比低）\n4. 当地特别提示（不为人知的小经验）\n5. 应急联系（领事馆 / 翻译 app）\n\n避免：千篇一律的「打卡景点」清单。"
  },
  {
    "title": "AI 健身计划生成",
    "body": "目标：{{goal}}（增肌 / 减脂 / 塑形 / 维持）\n现状：身高 {{height}} 体重 {{weight}} 体脂 {{bf_pct}}\n训练经验：{{experience}}\n频率：每周 {{days_per_week}} 天，每次 {{minutes}} 分钟\n场地：{{location}}（家 / 健身房 / 户外）\n限制：{{limitations}}（伤病 / 设备）\n\n输出：\n- 4 周渐进计划（每周 split）\n- 每个训练日的 4-6 个动作 + 组数 + 次数\n- 渐进过载怎么调（每 2 周）\n- 配套饮食建议（不细节，给方向 + 蛋白质 / 总热量目标）\n- 红色警告（什么征兆要立刻停）",
    "tags": [
      "生活",
      "健身"
    ],
    "desc_zh": "AI 健身计划生成（按目标 + 设备）",
    "category": "biz-life",
    "body_zh": "目标：{{goal}}（增肌 / 减脂 / 塑形 / 维持）\n现状：身高 {{height}} 体重 {{weight}} 体脂 {{bf_pct}}\n训练经验：{{experience}}\n频率：每周 {{days_per_week}} 天，每次 {{minutes}} 分钟\n场地：{{location}}（家 / 健身房 / 户外）\n限制：{{limitations}}（伤病 / 设备）\n\n输出：\n- 4 周渐进计划（每周 split）\n- 每个训练日的 4-6 个动作 + 组数 + 次数\n- 渐进过载怎么调（每 2 周）\n- 配套饮食建议（不细节，给方向 + 蛋白质 / 总热量目标）\n- 红色警告（什么征兆要立刻停）"
  },
  {
    "title": "合同条款风险排查 prompt",
    "body": "下面是合同条款。我是 {{my_role}}（甲方/乙方/作者/被授权方等）。\n\n审查重点：\n1. 单方面对我不利的条款（标黄）\n2. 模糊措辞（容易扯皮的）\n3. 缺失保护我的条款（应有但没写）\n4. 过度宽泛的责任 / 赔偿 / 知识产权归属\n5. 终止条款的对称性\n\n要求：每条标出原文位置 + 风险描述 + 修改建议。不要给一般性\"建议找律师\"的废话。\n\n合同：\n{{contract}}",
    "tags": [
      "法律",
      "合同",
      "决策"
    ],
    "desc_zh": "合同条款风险排查 prompt（不替代律师）",
    "category": "biz-life",
    "body_zh": "下面是合同条款。我是 {{my_role}}（甲方/乙方/作者/被授权方等）。\n\n审查重点：\n1. 单方面对我不利的条款（标黄）\n2. 模糊措辞（容易扯皮的）\n3. 缺失保护我的条款（应有但没写）\n4. 过度宽泛的责任 / 赔偿 / 知识产权归属\n5. 终止条款的对称性\n\n要求：每条标出原文位置 + 风险描述 + 修改建议。不要给一般性\"建议找律师\"的废话。\n\n合同：\n{{contract}}"
  },
  {
    "title": "App 隐私政策 + 用户协议生成",
    "body": "为 {{app_name}}（{{app_type}}）生成隐私政策 + 用户协议。\n\n核心信息：\n- 收集数据类型：{{data_collected}}\n- 是否使用第三方 SDK：{{sdks}}\n- 用户权限请求：{{permissions}}\n- 法律辖区：{{jurisdictions}}\n- 是否面向 13 岁以下：{{coppa}}\n\n要求：\n- 中英双语对照\n- 符合 GDPR / CCPA / 中国个保法\n- 普通用户能读懂（不要纯法律语言）\n- 标明 last updated 日期变量\n- 给出联系方式占位符",
    "tags": [
      "法律",
      "隐私",
      "合规"
    ],
    "desc_zh": "App 隐私政策 + 用户协议生成（含 GDPR）",
    "category": "biz-life",
    "body_zh": "为 {{app_name}}（{{app_type}}）生成隐私政策 + 用户协议。\n\n核心信息：\n- 收集数据类型：{{data_collected}}\n- 是否使用第三方 SDK：{{sdks}}\n- 用户权限请求：{{permissions}}\n- 法律辖区：{{jurisdictions}}\n- 是否面向 13 岁以下：{{coppa}}\n\n要求：\n- 中英双语对照\n- 符合 GDPR / CCPA / 中国个保法\n- 普通用户能读懂（不要纯法律语言）\n- 标明 last updated 日期变量\n- 给出联系方式占位符"
  },
  {
    "title": "App Store description 重写（按转化）",
    "body": "原描述：\n{{original_description}}\n\n重写优化转化率：\n- 第一行必须是用户能秒懂的场景钩子\n- 「为什么这个 App 不一样」放第二段\n- bullet 列功能（≤ 6 条，每条 ≤ 12 字，开头是动词）\n- 末尾突出价格 + 隐私 + 一次性买断（如适用）\n- 总字数 ≤ 1500\n- 不要 \"is the best\"\"revolutionary\" 这种词；要具体的差异化",
    "tags": [
      "ASO",
      "App Store",
      "Marketing"
    ],
    "desc_zh": "App Store 描述按转化率重写",
    "category": "biz-life",
    "body_zh": "原描述：\n{{original_description}}\n\n重写优化转化率：\n- 第一行必须是用户能秒懂的场景钩子\n- 「为什么这个 App 不一样」放第二段\n- bullet 列功能（≤ 6 条，每条 ≤ 12 字，开头是动词）\n- 末尾突出价格 + 隐私 + 一次性买断（如适用）\n- 总字数 ≤ 1500\n- 不要 \"is the best\"\"revolutionary\" 这种词；要具体的差异化"
  },
  {
    "title": "AppStoreConnect 提审说明（review notes）",
    "body": "为 {{app_name}} 写 App Review notes（提审时给 reviewer 看的）。\n\n核心信息：\n- App 类型：{{type}}\n- 是否需登录：{{login_needed}}\n- IAP 列表：{{iap_list}}\n- 隐私 posture：{{privacy_stance}}\n- 是否完全离线：{{offline}}\n\n格式：\n1. 一段 elevator pitch（reviewer 30 秒看完知道这 App 干嘛）\n2. demo credentials（如需）或 \"无需登录\"\n3. IAP 测试说明（怎么触发 paywall 验证流程）\n4. 任何可能引发审核员困惑的 design choice 提前解释\n\n语气：合作而非对抗。",
    "tags": [
      "ASO",
      "App Store",
      "提审"
    ],
    "desc_zh": "AppStoreConnect 提审说明（review notes）",
    "category": "biz-life",
    "body_zh": "为 {{app_name}} 写 App Review notes（提审时给 reviewer 看的）。\n\n核心信息：\n- App 类型：{{type}}\n- 是否需登录：{{login_needed}}\n- IAP 列表：{{iap_list}}\n- 隐私 posture：{{privacy_stance}}\n- 是否完全离线：{{offline}}\n\n格式：\n1. 一段 elevator pitch（reviewer 30 秒看完知道这 App 干嘛）\n2. demo credentials（如需）或 \"无需登录\"\n3. IAP 测试说明（怎么触发 paywall 验证流程）\n4. 任何可能引发审核员困惑的 design choice 提前解释\n\n语气：合作而非对抗。"
  },
  {
    "title": "AI 校对（找问题不改风格）",
    "body": "校对下面文本。只标出问题，不改风格：\n\n要求：\n1. 错别字 / 标点 / 语法（明确性问题）\n2. 事实性可疑点（标注「需核实」）\n3. 自相矛盾的地方\n4. 引用 / 数字格式不统一\n5. 不要改动作者的口吻、词汇偏好、句长选择\n\n输出格式：\n- 行号 + 原文片段 + 问题分类 + 建议（如有显然修改）\n\n文本：\n{{text}}",
    "tags": [
      "写作",
      "校对"
    ],
    "desc_zh": "AI 校对：找问题不改风格（保留作者声音）",
    "category": "content",
    "body_zh": "校对下面文本。只标出问题，不改风格：\n\n要求：\n1. 错别字 / 标点 / 语法（明确性问题）\n2. 事实性可疑点（标注「需核实」）\n3. 自相矛盾的地方\n4. 引用 / 数字格式不统一\n5. 不要改动作者的口吻、词汇偏好、句长选择\n\n输出格式：\n- 行号 + 原文片段 + 问题分类 + 建议（如有显然修改）\n\n文本：\n{{text}}"
  },
  {
    "title": "AI 改写为「读起来不累」版",
    "body": "下面这段文字读起来很累（长句、术语多、抽象）。改写让它顺畅但保留信息密度：\n\n规则：\n- 长句拆短\n- 抽象词换具象例子\n- 主动语态优先\n- 删冗余转折词（\"然而\"\"因此\"\"事实上\"）\n- 不要简化掉关键技术术语\n- 段落保持原结构\n\n原文：\n{{text}}",
    "tags": [
      "写作",
      "Editing"
    ],
    "desc_zh": "AI 把硬文改写成读起来不累的版本",
    "category": "content",
    "body_zh": "下面这段文字读起来很累（长句、术语多、抽象）。改写让它顺畅但保留信息密度：\n\n规则：\n- 长句拆短\n- 抽象词换具象例子\n- 主动语态优先\n- 删冗余转折词（\"然而\"\"因此\"\"事实上\"）\n- 不要简化掉关键技术术语\n- 段落保持原结构\n\n原文：\n{{text}}"
  },
  {
    "title": "AI 把照片转成可发圈的文案",
    "body": "我刚拍了 {{photo_subject}}（{{location}}, {{date}}）。生成 3 个版本朋友圈文案：\n\n1. 简洁文艺型（≤ 20 字）\n2. 自嘲幽默型（≤ 30 字）\n3. 引发共鸣型（≤ 50 字 + 一个开放性问题）\n\n避免：「岁月静好」「人间值得」这类被用烂的词。",
    "tags": [
      "生活",
      "Writing",
      "Marketing"
    ],
    "desc_zh": "AI 把照片转成可发朋友圈/小红书的文案",
    "category": "content",
    "body_zh": "我刚拍了 {{photo_subject}}（{{location}}, {{date}}）。生成 3 个版本朋友圈文案：\n\n1. 简洁文艺型（≤ 20 字）\n2. 自嘲幽默型（≤ 30 字）\n3. 引发共鸣型（≤ 50 字 + 一个开放性问题）\n\n避免：「岁月静好」「人间值得」这类被用烂的词。"
  },
  {
    "title": "AI 起读书笔记（带行动项）",
    "body": "我刚读完 {{book_title}}（{{author}}）。整理读书笔记：\n\n1. 一句话核心论点\n2. 3 个最反常识的观点（带页码 if 知道）\n3. 我可以应用到 {{my_context}} 的 3 个具体动作\n4. 我不同意 / 觉得过时的 1-2 处\n5. 推荐继续读什么书（同主题深入 / 反方观点）\n\n输入笔记原文：\n{{my_notes}}",
    "tags": [
      "学习",
      "读书"
    ],
    "desc_zh": "AI 起读书笔记（含行动项 + 引用）",
    "category": "learn",
    "body_zh": "我刚读完 {{book_title}}（{{author}}）。整理读书笔记：\n\n1. 一句话核心论点\n2. 3 个最反常识的观点（带页码 if 知道）\n3. 我可以应用到 {{my_context}} 的 3 个具体动作\n4. 我不同意 / 觉得过时的 1-2 处\n5. 推荐继续读什么书（同主题深入 / 反方观点）\n\n输入笔记原文：\n{{my_notes}}"
  },
  {
    "title": "AI 帮我写求职信（cover letter）",
    "body": "公司：{{company}}\n岗位：{{position}}\n岗位 JD：{{jd}}\n我的背景：{{my_background}}\n\n写求职信：\n- 第一段：为什么是这家公司（基于公开信息，不空洞）\n- 第二段：我的 1 个最相关经历 + 量化结果\n- 第三段：我能解决他们最近遇到的 X 问题（基于公开信息推测）\n- 末段：specific 接下来一步\n\n约束：\n- ≤ 250 字\n- 不写 \"hardworking\" \"team player\" 这种空话\n- 不抄 JD 原文",
    "tags": [
      "求职",
      "Writing"
    ],
    "desc_zh": "AI 帮你写求职信 cover letter（个性化）",
    "category": "biz-life",
    "body_zh": "公司：{{company}}\n岗位：{{position}}\n岗位 JD：{{jd}}\n我的背景：{{my_background}}\n\n写求职信：\n- 第一段：为什么是这家公司（基于公开信息，不空洞）\n- 第二段：我的 1 个最相关经历 + 量化结果\n- 第三段：我能解决他们最近遇到的 X 问题（基于公开信息推测）\n- 末段：specific 接下来一步\n\n约束：\n- ≤ 250 字\n- 不写 \"hardworking\" \"team player\" 这种空话\n- 不抄 JD 原文"
  },
  {
    "title": "AI 给我做选择（用启发式）",
    "body": "我面前两条路：\nA: {{option_a}}\nB: {{option_b}}\n\n用这些启发式分析：\n1. **10/10/10 法则**：10 分钟后 / 10 个月后 / 10 年后我会怎么看？\n2. **可逆性**：哪个选错可逆 / 不可逆？\n3. **机会成本**：选 A 时 B 还能晚点选吗？反之？\n4. **后悔最小化**：哪个选错我会更后悔？\n5. **能量场**：哪个让我兴奋（不是\"应该做\"的责任感）\n\n末尾给一句话推荐 + 一句话反对该推荐的最强反驳。",
    "tags": [
      "决策",
      "AI助手"
    ],
    "desc_zh": "AI 给你做选择（用启发式 + 元决策）",
    "category": "biz-life",
    "body_zh": "我面前两条路：\nA: {{option_a}}\nB: {{option_b}}\n\n用这些启发式分析：\n1. **10/10/10 法则**：10 分钟后 / 10 个月后 / 10 年后我会怎么看？\n2. **可逆性**：哪个选错可逆 / 不可逆？\n3. **机会成本**：选 A 时 B 还能晚点选吗？反之？\n4. **后悔最小化**：哪个选错我会更后悔？\n5. **能量场**：哪个让我兴奋（不是\"应该做\"的责任感）\n\n末尾给一句话推荐 + 一句话反对该推荐的最强反驳。"
  },
  {
    "title": "AI 解读图表 / 数据",
    "body": "下面是数据 / 图表描述：\n\n{{data}}\n\n分析：\n1. 三个最显著的 trend\n2. 三个反常 / outlier 数据点 + 可能原因\n3. 哪些断言能从数据直接推出 vs 哪些需要更多数据\n4. 一个值得继续追问的子问题\n5. 容易误读的地方（warning）",
    "tags": [
      "数据",
      "调研"
    ],
    "desc_zh": "AI 解读图表 / 数据（找规律 + 异常）",
    "category": "work",
    "body_zh": "下面是数据 / 图表描述：\n\n{{data}}\n\n分析：\n1. 三个最显著的 trend\n2. 三个反常 / outlier 数据点 + 可能原因\n3. 哪些断言能从数据直接推出 vs 哪些需要更多数据\n4. 一个值得继续追问的子问题\n5. 容易误读的地方（warning）"
  },
  {
    "title": "Excel 公式 / 函数生成",
    "body": "数据描述：{{data_shape}}\n要做的事：{{task}}\n\n生成：\n1. 推荐函数（{{platform}}: Excel / Google Sheets / Numbers）\n2. 一个具体公式示例（用 A1 / B2 等占位）\n3. 公式逐部分解释\n4. 边界情况（空值 / 错误值 / 重复值）怎么处理\n5. 替代写法（如果有更现代的：FILTER / LET / LAMBDA）\n",
    "tags": [
      "Excel",
      "数据"
    ],
    "desc_zh": "AI 生成 Excel 公式 / 函数（含说明）",
    "category": "work",
    "body_zh": "数据描述：{{data_shape}}\n要做的事：{{task}}\n\n生成：\n1. 推荐函数（{{platform}}: Excel / Google Sheets / Numbers）\n2. 一个具体公式示例（用 A1 / B2 等占位）\n3. 公式逐部分解释\n4. 边界情况（空值 / 错误值 / 重复值）怎么处理\n5. 替代写法（如果有更现代的：FILTER / LET / LAMBDA）\n"
  },
  {
    "title": "AI 写日语商务邮件",
    "body": "状況：{{situation}}\n相手：{{recipient}}（取引先 / 上司 / お客様）\n達成したいこと：{{goal}}\n\n要件：\n- 適切な敬語レベル（{{level}}：丁寧/尊敬/謙譲）\n- 200 字以内\n- 件名 + 本文 + 結びの挨拶\n- 「お世話になっております」は最初の１行のみ\n\n避ける：曖昧表現が「Yes/No」を判断できない場合は質問する形に。",
    "tags": [
      "日语",
      "邮件"
    ],
    "desc_zh": "AI 写日语商务邮件（敬语合规）",
    "category": "biz-life",
    "body_zh": "状況：{{situation}}\n相手：{{recipient}}（取引先 / 上司 / お客様）\n達成したいこと：{{goal}}\n\n要件：\n- 適切な敬語レベル（{{level}}：丁寧/尊敬/謙譲）\n- 200 字以内\n- 件名 + 本文 + 結びの挨拶\n- 「お世話になっております」は最初の１行のみ\n\n避ける：曖昧表現が「Yes/No」を判断できない場合は質問する形に。"
  },
  {
    "title": "AI 翻译保留语气（non-literal）",
    "body": "翻译这段 {{source_lang}} → {{target_lang}}。\n\n要求：\n- 不要逐字翻译；译出原文的「感觉」\n- 习语 / 俚语用目标语言对应表达\n- 文化背景词保留原文 + 简短解释（如「年功序列 (seniority-based pay)」）\n- 语气强度匹配（讽刺仍讽刺、平静仍平静）\n- 末尾给 3 个翻译选择（保守 / 平衡 / 大胆）\n\n原文：\n{{text}}",
    "tags": [
      "翻译",
      "AI助手"
    ],
    "desc_zh": "AI 翻译保留原作者语气（不机翻不直译）",
    "category": "content",
    "body_zh": "翻译这段 {{source_lang}} → {{target_lang}}。\n\n要求：\n- 不要逐字翻译；译出原文的「感觉」\n- 习语 / 俚语用目标语言对应表达\n- 文化背景词保留原文 + 简短解释（如「年功序列 (seniority-based pay)」）\n- 语气强度匹配（讽刺仍讽刺、平静仍平静）\n- 末尾给 3 个翻译选择（保守 / 平衡 / 大胆）\n\n原文：\n{{text}}"
  },
  {
    "title": "Sora 2 商用短视频脚本",
    "body": "Generate a Sora 2 commercial video script for {{product}}. Requirements:\n- Length: 6-10 seconds\n- Camera: dynamic, multiple angles\n- Mood: {{mood}}\n- Audio: synced ambient sound\n- Output 1 main + 2 alt prompts",
    "body_zh": "为 {{product}} 生成 Sora 2 商用短视频脚本。要求：\n- 时长 6-10 秒\n- 镜头：动态多角度\n- 情绪：{{mood}}\n- 音轨：同步环境音\n- 输出 1 个主版 + 2 个备选 prompt",
    "tags": [
      "Sora",
      "商用视频",
      "AI 视频"
    ],
    "desc_zh": "Sora 2 商用 6-10 秒短视频 prompt（主+备选）",
    "category": "ai-video"
  },
  {
    "title": "Runway Gen-3 角色一致性",
    "body": "用 Runway Gen-3 生成 {{character}} 在 5 个场景的连续镜头。要求：\n- 用 reference image lock 角色\n- 每段 4-5 秒\n- 场景: 办公室 / 户外 / 室内特写 / 远景 / 动作\n- 保持服装/发型/比例完全一致",
    "tags": [
      "Runway",
      "Gen-3",
      "AI 视频"
    ],
    "desc_zh": "Runway Gen-3 角色 5 场景一致性视频生成",
    "category": "ai-video",
    "body_zh": "用 Runway Gen-3 生成 {{character}} 在 5 个场景的连续镜头。要求：\n- 用 reference image lock 角色\n- 每段 4-5 秒\n- 场景: 办公室 / 户外 / 室内特写 / 远景 / 动作\n- 保持服装/发型/比例完全一致"
  },
  {
    "title": "Pika 1.5 短动画 prompt",
    "body": "用 Pika 1.5 做一段 {{duration}} 秒短动画：\n- 风格：{{style}}（如 anime / Pixar / 水彩）\n- 主体：{{subject}}\n- 动作：{{action}}\n- 镜头运动：缓慢 push-in\n- Negative: blurry, distorted, extra limbs",
    "tags": [
      "Pika",
      "AI 动画",
      "AI 视频"
    ],
    "desc_zh": "Pika 1.5 风格化短动画完整 prompt",
    "category": "ai-video",
    "body_zh": "用 Pika 1.5 做一段 {{duration}} 秒短动画：\n- 风格：{{style}}（如 anime / Pixar / 水彩）\n- 主体：{{subject}}\n- 动作：{{action}}\n- 镜头运动：缓慢 push-in\n- Negative: blurry, distorted, extra limbs"
  },
  {
    "title": "AI 数字人讲解视频",
    "body": "做一段 {{duration}} 秒 AI 数字人讲解视频，主题 {{topic}}。\n- 形象：{{persona}}（如知识博主/老师/记者）\n- 语速：1.0x\n- 镜头：正面 + 偶尔切到 B-roll\n- 背景音乐：低音量 ambient\n- 字幕：双语（中 + 英）\n- 关键词强调：每 15 秒高亮 1-2 个关键词",
    "tags": [
      "数字人",
      "讲解视频",
      "AI 视频"
    ],
    "desc_zh": "AI 数字人主播讲解视频完整制作 brief",
    "category": "ai-video",
    "body_zh": "做一段 {{duration}} 秒 AI 数字人讲解视频，主题 {{topic}}。\n- 形象：{{persona}}（如知识博主/老师/记者）\n- 语速：1.0x\n- 镜头：正面 + 偶尔切到 B-roll\n- 背景音乐：低音量 ambient\n- 字幕：双语（中 + 英）\n- 关键词强调：每 15 秒高亮 1-2 个关键词"
  },
  {
    "title": "抖音 AI 短剧分集 prompt",
    "body": "策划一部 {{episodes}} 集 AI 全自动短剧，每集 60 秒。\n- 主题：{{theme}}\n- 主角：{{protagonist}}\n- 钩子：第 1 集前 3 秒必须抓住\n- 反转：每集结尾留悬念\n- 输出每集 storyboard：开场 / 冲突 / 高潮 / 钩子",
    "tags": [
      "短剧",
      "抖音",
      "AI 视频"
    ],
    "desc_zh": "抖音 AI 全自动短剧多集 storyboard 策划",
    "category": "ai-video",
    "body_zh": "策划一部 {{episodes}} 集 AI 全自动短剧，每集 60 秒。\n- 主题：{{theme}}\n- 主角：{{protagonist}}\n- 钩子：第 1 集前 3 秒必须抓住\n- 反转：每集结尾留悬念\n- 输出每集 storyboard：开场 / 冲突 / 高潮 / 钩子"
  },
  {
    "title": "AI 视频配音 prompt（ElevenLabs）",
    "body": "为这段视频脚本生成 ElevenLabs 配音 prompt：\n\n脚本：{{script}}\n\n要求：\n- 声音：{{voice_type}}（专业讲解/温暖叙事/活泼俏皮）\n- 情绪曲线：开头平稳 → 中段激动 → 结尾温和\n- 关键词重音标记 [高亮]\n- 停顿点 [pause:0.5s]\n- 输出 ElevenLabs API 调用参数 JSON",
    "tags": [
      "ElevenLabs",
      "配音",
      "AI 视频"
    ],
    "desc_zh": "ElevenLabs 视频配音 prompt + API 参数",
    "category": "ai-video",
    "body_zh": "为这段视频脚本生成 ElevenLabs 配音 prompt：\n\n脚本：{{script}}\n\n要求：\n- 声音：{{voice_type}}（专业讲解/温暖叙事/活泼俏皮）\n- 情绪曲线：开头平稳 → 中段激动 → 结尾温和\n- 关键词重音标记 [高亮]\n- 停顿点 [pause:0.5s]\n- 输出 ElevenLabs API 调用参数 JSON"
  },
  {
    "title": "AI 视频字幕优化 prompt",
    "body": "我有一段视频字幕 {{transcript}}。帮我：\n1. 修语病和错别字\n2. 加情绪标签 [strong] [pause]\n3. 拆成 1-2 行短句（每行 ≤ 12 字符）\n4. 关键词高亮（粗体或彩色标注）\n5. 输出 SRT 格式 + 备注哪里加 emoji 加分",
    "tags": [
      "字幕",
      "视频后期",
      "AI 视频"
    ],
    "desc_zh": "AI 优化视频字幕（SRT 格式输出）",
    "category": "ai-video",
    "body_zh": "我有一段视频字幕 {{transcript}}。帮我：\n1. 修语病和错别字\n2. 加情绪标签 [strong] [pause]\n3. 拆成 1-2 行短句（每行 ≤ 12 字符）\n4. 关键词高亮（粗体或彩色标注）\n5. 输出 SRT 格式 + 备注哪里加 emoji 加分"
  },
  {
    "title": "Veo 3 + 同步音轨高级 prompt",
    "body": "用 Veo 3 生成 {{duration}} 秒电影质感视频。\n\n场景：{{scene_description}}\n\n要求：\n- 镜头：{{camera_movement}}\n- 光线：{{lighting}}\n- 同步音轨：{{audio_sync}}（如海浪+风声+海鸥）\n- 物理：真实重力 + 光影反射\n- 调色：{{color_grade}}（如 Wes Anderson 风/赛博朋克霓虹）\n\n输出主 prompt + 3 个 style variants",
    "tags": [
      "Veo",
      "电影质感",
      "AI 视频"
    ],
    "desc_zh": "Veo 3 电影质感长 prompt（含同步音轨）",
    "category": "ai-video",
    "body_zh": "用 Veo 3 生成 {{duration}} 秒电影质感视频。\n\n场景：{{scene_description}}\n\n要求：\n- 镜头：{{camera_movement}}\n- 光线：{{lighting}}\n- 同步音轨：{{audio_sync}}（如海浪+风声+海鸥）\n- 物理：真实重力 + 光影反射\n- 调色：{{color_grade}}（如 Wes Anderson 风/赛博朋克霓虹）\n\n输出主 prompt + 3 个 style variants"
  },
  {
    "title": "MCP server 完整骨架（含工具调用）",
    "body": "Generate a complete MCP server skeleton for {{purpose}}. Requirements:\n- Tools: {{tool_list}}\n- Resources: {{resource_list}}\n- Prompts: {{prompt_list}}\n- TypeScript + @modelcontextprotocol/sdk\n- Include error handling + input validation\n- Output: server.ts, tsconfig.json, package.json",
    "body_zh": "为 {{purpose}} 生成完整 MCP server 骨架。要求：\n- Tools: {{tool_list}}\n- Resources: {{resource_list}}\n- Prompts: {{prompt_list}}\n- TypeScript + @modelcontextprotocol/sdk\n- 含错误处理 + 输入验证\n- 输出 server.ts / tsconfig.json / package.json",
    "tags": [
      "MCP",
      "智能体",
      "TypeScript"
    ],
    "desc_zh": "完整可运行 MCP server 项目骨架",
    "category": "agent"
  },
  {
    "title": "Anthropic Computer Use 任务自动化",
    "body": "用 Anthropic Computer Use 完成 {{task}}。\n\n任务分解：\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\n要求：\n- 每步前截屏验证状态\n- 失败时 retry 3 次再 fallback\n- 输出每步 click/type 的精确坐标\n- 最终生成可执行 Python 脚本",
    "tags": [
      "Computer Use",
      "自动化",
      "智能体"
    ],
    "desc_zh": "Anthropic Computer Use 任务自动化完整脚本",
    "category": "agent",
    "body_zh": "用 Anthropic Computer Use 完成 {{task}}。\n\n任务分解：\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\n要求：\n- 每步前截屏验证状态\n- 失败时 retry 3 次再 fallback\n- 输出每步 click/type 的精确坐标\n- 最终生成可执行 Python 脚本"
  },
  {
    "title": "多 Agent 协作 brief（CrewAI / LangGraph）",
    "body": "用 CrewAI 设计一个多 agent 系统完成 {{goal}}。\n\n角色分配：\n- Researcher: 收集 + 验证信息\n- Writer: 起草内容\n- Reviewer: 审校 + 提建议\n- Coordinator: 任务分发 + 集成\n\n输出：\n- 各角色 system prompt\n- task delegation 流程图\n- 失败 retry 策略\n- 最终 deliverable 格式",
    "tags": [
      "CrewAI",
      "LangGraph",
      "多 Agent"
    ],
    "desc_zh": "多 agent 协作系统设计 (CrewAI / LangGraph)",
    "category": "agent",
    "body_zh": "用 CrewAI 设计一个多 agent 系统完成 {{goal}}。\n\n角色分配：\n- Researcher: 收集 + 验证信息\n- Writer: 起草内容\n- Reviewer: 审校 + 提建议\n- Coordinator: 任务分发 + 集成\n\n输出：\n- 各角色 system prompt\n- task delegation 流程图\n- 失败 retry 策略\n- 最终 deliverable 格式"
  },
  {
    "title": "Agent 自我反思 + 修正 prompt",
    "body": "我是 AI agent 正在执行任务 {{task}}。当前输出：\n\n{{current_output}}\n\n请用 self-reflection 评估：\n1. 输出是否完整满足任务？\n2. 有哪些隐藏假设可能错？\n3. 边界情况是否考虑？\n4. 改进版应该怎么写？\n\n输出修正后的最终 v2 + 改进点列表。",
    "tags": [
      "self-reflection",
      "智能体",
      "修正"
    ],
    "desc_zh": "Agent 自我反思 + v2 修正 prompt",
    "category": "agent",
    "body_zh": "我是 AI agent 正在执行任务 {{task}}。当前输出：\n\n{{current_output}}\n\n请用 self-reflection 评估：\n1. 输出是否完整满足任务？\n2. 有哪些隐藏假设可能错？\n3. 边界情况是否考虑？\n4. 改进版应该怎么写？\n\n输出修正后的最终 v2 + 改进点列表。"
  },
  {
    "title": "Agent 决策树构建",
    "body": "为 agent 设计 {{scenario}} 场景下的决策树。\n\n输入信号：{{inputs}}\n可能动作：{{actions}}\n\n要求：\n- 每个 branch 写明触发条件\n- 输出 mermaid 流程图\n- 标注 high-risk 决策点（需人工 review）\n- 失败 fallback 路径\n- LLM 不确定时的 escalation 策略",
    "tags": [
      "决策树",
      "智能体",
      "mermaid"
    ],
    "desc_zh": "Agent 场景决策树（mermaid 图）",
    "category": "agent",
    "body_zh": "为 agent 设计 {{scenario}} 场景下的决策树。\n\n输入信号：{{inputs}}\n可能动作：{{actions}}\n\n要求：\n- 每个 branch 写明触发条件\n- 输出 mermaid 流程图\n- 标注 high-risk 决策点（需人工 review）\n- 失败 fallback 路径\n- LLM 不确定时的 escalation 策略"
  },
  {
    "title": "Agent 工具调用错误恢复",
    "body": "我的 agent 调用工具失败：\n\n工具: {{tool_name}}\n错误: {{error_msg}}\n输入: {{input_data}}\n\n请：\n1. 诊断错误根因（输入格式/权限/超时/服务挂）\n2. 给出 3 种 retry 策略\n3. 如果重试都失败，fallback 该用什么替代工具\n4. 怎么 log 给开发者排查",
    "tags": [
      "错误恢复",
      "智能体",
      "调试"
    ],
    "desc_zh": "Agent 工具调用失败诊断 + 3 种 retry",
    "category": "agent",
    "body_zh": "我的 agent 调用工具失败：\n\n工具: {{tool_name}}\n错误: {{error_msg}}\n输入: {{input_data}}\n\n请：\n1. 诊断错误根因（输入格式/权限/超时/服务挂）\n2. 给出 3 种 retry 策略\n3. 如果重试都失败，fallback 该用什么替代工具\n4. 怎么 log 给开发者排查"
  },
  {
    "title": "AI 学术论文快速精读",
    "body": "我要快速理解这篇 {{field}} 领域的论文：{{paper_title}}\n\n请：\n1. 用 5 句话概括核心贡献\n2. 列 3 个最重要 figure / 公式\n3. 解释作者的关键 insight（用普通人能懂的话）\n4. 跟我说哪个段落值得深读\n5. 类比另一个我可能熟悉的领域帮我理解",
    "tags": [
      "论文",
      "学术",
      "学习"
    ],
    "desc_zh": "学术论文 5 步精读法（核心贡献+关键 insight）",
    "category": "learn",
    "body_zh": "我要快速理解这篇 {{field}} 领域的论文：{{paper_title}}\n\n请：\n1. 用 5 句话概括核心贡献\n2. 列 3 个最重要 figure / 公式\n3. 解释作者的关键 insight（用普通人能懂的话）\n4. 跟我说哪个段落值得深读\n5. 类比另一个我可能熟悉的领域帮我理解"
  },
  {
    "title": "AI 错题分析 + 知识漏洞定位",
    "body": "我做了 {{subject}} 的题，下面是错题：\n\n{{wrong_answers}}\n\n请：\n1. 归类错题类型（概念混淆 / 计算 / 粗心 / 知识缺失）\n2. 定位每题反映的具体知识点漏洞\n3. 推荐每个漏洞 3 个针对性训练（题目 / 视频 / 文章）\n4. 出 5 道类似题让我练习\n5. 给我下次怎么避免同类错的 1 句话提醒",
    "tags": [
      "错题",
      "学习",
      "知识漏洞"
    ],
    "desc_zh": "AI 错题归类 + 漏洞定位 + 针对性训练",
    "category": "learn",
    "body_zh": "我做了 {{subject}} 的题，下面是错题：\n\n{{wrong_answers}}\n\n请：\n1. 归类错题类型（概念混淆 / 计算 / 粗心 / 知识缺失）\n2. 定位每题反映的具体知识点漏洞\n3. 推荐每个漏洞 3 个针对性训练（题目 / 视频 / 文章）\n4. 出 5 道类似题让我练习\n5. 给我下次怎么避免同类错的 1 句话提醒"
  },
  {
    "title": "AI 复习计划生成",
    "body": "我在 {{deadline}} 前要复习 {{subject}}，有 {{hours_per_day}} 小时/天。\n\n现状：\n- 已掌握：{{mastered}}\n- 不熟练：{{weak}}\n- 完全不会：{{unknown}}\n\n请生成：\n1. 按周拆分的复习计划\n2. 每天具体任务（含休息时间）\n3. 间隔重复（spaced repetition）触发节点\n4. 模拟考时间安排\n5. 心态调节建议",
    "tags": [
      "复习",
      "学习计划",
      "spaced repetition"
    ],
    "desc_zh": "AI 周度复习计划（含间隔重复 + 心态）",
    "category": "learn",
    "body_zh": "我在 {{deadline}} 前要复习 {{subject}}，有 {{hours_per_day}} 小时/天。\n\n现状：\n- 已掌握：{{mastered}}\n- 不熟练：{{weak}}\n- 完全不会：{{unknown}}\n\n请生成：\n1. 按周拆分的复习计划\n2. 每天具体任务（含休息时间）\n3. 间隔重复（spaced repetition）触发节点\n4. 模拟考时间安排\n5. 心态调节建议"
  },
  {
    "title": "AI 知识图谱构建",
    "body": "把 {{topic}} 这个主题构建成知识图谱：\n\n要求：\n1. 列 10-15 个核心概念\n2. 用 mermaid graph 画概念间的关系（依赖 / 因果 / 包含 / 类比）\n3. 标注每个概念的「难度（1-5）」和「重要性（1-5）」\n4. 推荐学习顺序（拓扑排序）\n5. 每个概念给 1 句话定义 + 1 个具体例子",
    "tags": [
      "知识图谱",
      "mermaid",
      "学习"
    ],
    "desc_zh": "主题知识图谱（mermaid + 学习顺序）",
    "category": "learn",
    "body_zh": "把 {{topic}} 这个主题构建成知识图谱：\n\n要求：\n1. 列 10-15 个核心概念\n2. 用 mermaid graph 画概念间的关系（依赖 / 因果 / 包含 / 类比）\n3. 标注每个概念的「难度（1-5）」和「重要性（1-5）」\n4. 推荐学习顺序（拓扑排序）\n5. 每个概念给 1 句话定义 + 1 个具体例子"
  },
  {
    "title": "AI 概念解释 5 层渐进",
    "body": "解释概念 {{concept}}，用 5 层渐进方式：\n\n1. **5 岁懂**：用比喻 + 简单生活例子\n2. **15 岁懂**：用基础学科知识 + 1 个例子\n3. **大学生懂**：用形式化定义 + 推导\n4. **从业者懂**：用实战场景 + 边界情况\n5. **专家懂**：用前沿争议 / 未解问题\n\n每层 50-100 字。",
    "tags": [
      "概念",
      "渐进解释",
      "学习"
    ],
    "desc_zh": "概念 5 层渐进解释（5 岁→专家）",
    "category": "learn",
    "body_zh": "解释概念 {{concept}}，用 5 层渐进方式：\n\n1. **5 岁懂**：用比喻 + 简单生活例子\n2. **15 岁懂**：用基础学科知识 + 1 个例子\n3. **大学生懂**：用形式化定义 + 推导\n4. **从业者懂**：用实战场景 + 边界情况\n5. **专家懂**：用前沿争议 / 未解问题\n\n每层 50-100 字。"
  },
  {
    "title": "AI 副业 ROI 评估",
    "body": "我考虑做副业 {{side_business}}。\n\n请帮我评估：\n1. 真实启动成本（含时间）\n2. 第 1 笔收入预期时间\n3. 月入天花板 + 中位\n4. 风险 + 主要竞争\n5. 跟我现有资源（{{my_resources}}）的契合度\n6. 失败 fallback 方案\n7. 给我 0-10 推荐分数",
    "tags": [
      "副业",
      "ROI",
      "评估"
    ],
    "desc_zh": "副业方向 7 维度 ROI 评估 + 推荐分",
    "category": "biz-life",
    "body_zh": "我考虑做副业 {{side_business}}。\n\n请帮我评估：\n1. 真实启动成本（含时间）\n2. 第 1 笔收入预期时间\n3. 月入天花板 + 中位\n4. 风险 + 主要竞争\n5. 跟我现有资源（{{my_resources}}）的契合度\n6. 失败 fallback 方案\n7. 给我 0-10 推荐分数"
  },
  {
    "title": "AI 广告投放 brief 生成",
    "body": "我要在 {{platform}}（如抖音/小红书/B站）投广告，预算 {{budget}}。\n\n产品：{{product}}\n目标受众：{{target}}\n\n生成完整 brief：\n1. 3 套创意脚本（各 30 秒）\n2. 关键词 + 标签建议\n3. 出价策略（CPC/CPM/oCPM 选择）\n4. 时段 + 地域 + 兴趣定向\n5. A/B test 矩阵\n6. ROI 预期 + 何时停",
    "tags": [
      "广告",
      "投放",
      "Marketing"
    ],
    "desc_zh": "AI 广告投放完整 brief（创意+定向+ROI）",
    "category": "biz-life",
    "body_zh": "我要在 {{platform}}（如抖音/小红书/B站）投广告，预算 {{budget}}。\n\n产品：{{product}}\n目标受众：{{target}}\n\n生成完整 brief：\n1. 3 套创意脚本（各 30 秒）\n2. 关键词 + 标签建议\n3. 出价策略（CPC/CPM/oCPM 选择）\n4. 时段 + 地域 + 兴趣定向\n5. A/B test 矩阵\n6. ROI 预期 + 何时停"
  },
  {
    "title": "AI 业务数据深度分析",
    "body": "我有这份 {{data_type}} 数据：\n\n{{data}}\n\n请：\n1. 找出 3 个最反常的趋势\n2. 用同期/环比/RFM 分类\n3. 推断背后的业务原因\n4. 给 5 个可执行的优化建议（按 ROI 排序）\n5. 哪些需要进一步数据验证\n6. 输出可直接给老板看的 1 页摘要",
    "tags": [
      "数据分析",
      "业务",
      "决策"
    ],
    "desc_zh": "业务数据 6 维度深度分析（含老板摘要）",
    "category": "biz-life",
    "body_zh": "我有这份 {{data_type}} 数据：\n\n{{data}}\n\n请：\n1. 找出 3 个最反常的趋势\n2. 用同期/环比/RFM 分类\n3. 推断背后的业务原因\n4. 给 5 个可执行的优化建议（按 ROI 排序）\n5. 哪些需要进一步数据验证\n6. 输出可直接给老板看的 1 页摘要"
  },
  {
    "title": "AI 用户画像生成（基于真实数据）",
    "body": "我有这些用户数据样本：\n\n{{user_data}}\n\n请：\n1. 聚类成 3-5 个典型 persona\n2. 每个 persona 起名字 + 一句话定位\n3. 列每个 persona 的：年龄/职业/痛点/触媒/购买力/触发场景\n4. 标注哪个 persona ROI 最高\n5. 给每个 persona 1 句话产品定位",
    "tags": [
      "用户画像",
      "persona",
      "营销"
    ],
    "desc_zh": "AI 用户画像聚类 + 每个 persona 定位",
    "category": "biz-life",
    "body_zh": "我有这些用户数据样本：\n\n{{user_data}}\n\n请：\n1. 聚类成 3-5 个典型 persona\n2. 每个 persona 起名字 + 一句话定位\n3. 列每个 persona 的：年龄/职业/痛点/触媒/购买力/触发场景\n4. 标注哪个 persona ROI 最高\n5. 给每个 persona 1 句话产品定位"
  },
  {
    "title": "AI 增长 hack 头脑风暴",
    "body": "我的产品 {{product}} 当前 {{stage}} 阶段，目标 {{growth_goal}}。\n\n请头脑风暴：\n1. 10 个 zero-budget 增长策略\n2. 5 个 paid 增长（按 CAC 排序）\n3. 3 个 viral 钩子设计\n4. 2 个反共识的增长路径\n5. 每个策略：预期 ROI + 试错成本 + 时间窗\n6. 推荐第 1 个先试什么 + 为什么",
    "tags": [
      "增长",
      "Growth Hack",
      "营销"
    ],
    "desc_zh": "AI 增长策略头脑风暴（20 路径 + 试错排序）",
    "category": "biz-life",
    "body_zh": "我的产品 {{product}} 当前 {{stage}} 阶段，目标 {{growth_goal}}。\n\n请头脑风暴：\n1. 10 个 zero-budget 增长策略\n2. 5 个 paid 增长（按 CAC 排序）\n3. 3 个 viral 钩子设计\n4. 2 个反共识的增长路径\n5. 每个策略：预期 ROI + 试错成本 + 时间窗\n6. 推荐第 1 个先试什么 + 为什么"
  },
  {
    "title": "Cursor Composer 新功能 multi-file edit",
    "body": "用 Cursor Composer 做这个 multi-file change：\n\n变更：{{change_description}}\n影响文件：{{files}}\n\n要求：\n1. 跨文件保持 type 一致\n2. 更新所有 caller\n3. migration 脚本（如有 schema 变化）\n4. 单测覆盖新 path\n5. commit message 用 conventional commits\n输出 git diff 格式",
    "tags": [
      "Cursor",
      "Composer",
      "编程"
    ],
    "desc_zh": "Cursor Composer multi-file 重构标准模板",
    "category": "ai-coding",
    "body_zh": "用 Cursor Composer 做这个 multi-file change：\n\n变更：{{change_description}}\n影响文件：{{files}}\n\n要求：\n1. 跨文件保持 type 一致\n2. 更新所有 caller\n3. migration 脚本（如有 schema 变化）\n4. 单测覆盖新 path\n5. commit message 用 conventional commits\n输出 git diff 格式"
  },
  {
    "title": "Windsurf Cascade 多步任务",
    "body": "Use Windsurf Cascade to execute this multi-step task: {{task}}\n\nSteps:\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\nRequirements:\n- Each step verify before proceeding\n- If any step fails, halt and ask\n- Summarize what changed at end\n- Generate test cases for new code",
    "body_zh": "用 Windsurf Cascade 执行多步任务: {{task}}\n\n步骤:\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\n要求:\n- 每步验证后再继续\n- 任何步骤失败时停下来问\n- 末尾总结改了什么\n- 为新代码生成测试用例",
    "tags": [
      "Windsurf",
      "Cascade",
      "编程"
    ],
    "desc_zh": "Windsurf Cascade 多步任务标准模板",
    "category": "ai-coding"
  },
  {
    "title": "Cline (Claude Dev) 项目 onboarding",
    "body": "Cline 第一次进我的项目 {{project_path}}，请：\n1. 扫描代码结构（输出 tree 至 3 层）\n2. 找 README / package.json / 入口文件\n3. 总结项目类型 + 技术栈 + 主要 feature\n4. 列 5 个我可能想问的事\n5. 推荐第 1 个 task（low-risk learning task）",
    "tags": [
      "Cline",
      "Claude Dev",
      "onboarding"
    ],
    "desc_zh": "Cline 项目首次 onboarding 标准 prompt",
    "category": "ai-coding",
    "body_zh": "Cline 第一次进我的项目 {{project_path}}，请：\n1. 扫描代码结构（输出 tree 至 3 层）\n2. 找 README / package.json / 入口文件\n3. 总结项目类型 + 技术栈 + 主要 feature\n4. 列 5 个我可能想问的事\n5. 推荐第 1 个 task（low-risk learning task）"
  },
  {
    "title": "AI 翻译保留风格（小说 / 散文）",
    "body": "把下面这段 {{source_lang}} 翻译成 {{target_lang}}：\n\n{{text}}\n\n要求：\n- 保留作者语气（如严肃/俏皮/沉郁）\n- 保留比喻和修辞\n- 不机翻，意译为主\n- 保留专有名词（人名/地名）原文 + 中文音译\n- 输出 3 个版本：直译 / 意译 / 文学化",
    "tags": [
      "翻译",
      "文学",
      "风格保留"
    ],
    "desc_zh": "文学风格翻译（3 版本：直译/意译/文学化）",
    "category": "content",
    "body_zh": "把下面这段 {{source_lang}} 翻译成 {{target_lang}}：\n\n{{text}}\n\n要求：\n- 保留作者语气（如严肃/俏皮/沉郁）\n- 保留比喻和修辞\n- 不机翻，意译为主\n- 保留专有名词（人名/地名）原文 + 中文音译\n- 输出 3 个版本：直译 / 意译 / 文学化"
  },
  {
    "title": "AI 生成 SEO 元数据（title + description）",
    "body": "为这个页面生成 SEO 元数据：\n\nURL: {{url}}\n内容: {{content_summary}}\n\n请：\n1. Title (60 字符内, 含主关键词)\n2. Description (160 字符内, 1 句吸引点击)\n3. 5 个长尾关键词 (各 2-4 词)\n4. 1 个 schema.org 结构化数据 (JSON-LD)\n5. Open Graph + Twitter Card 字段\n6. 输出 1 个完整 <head> 片段",
    "tags": [
      "SEO",
      "元数据",
      "Marketing"
    ],
    "desc_zh": "SEO 元数据完整套件（title+desc+schema+OG）",
    "category": "content",
    "body_zh": "为这个页面生成 SEO 元数据：\n\nURL: {{url}}\n内容: {{content_summary}}\n\n请：\n1. Title (60 字符内, 含主关键词)\n2. Description (160 字符内, 1 句吸引点击)\n3. 5 个长尾关键词 (各 2-4 词)\n4. 1 个 schema.org 结构化数据 (JSON-LD)\n5. Open Graph + Twitter Card 字段\n6. 输出 1 个完整 <head> 片段"
  },
  {
    "title": "AI 对话剧本（视频/podcast）",
    "body": "创作一段 {{duration}} 分钟的 {{format}}（podcast/视频）对话剧本，主题 {{topic}}。\n\n角色：\n- Host: {{host_persona}}\n- Guest: {{guest_persona}}\n\n要求：\n- 钩子前 30 秒抓住听众\n- 自然对话不像念稿\n- 1-2 个争议点 + 各自观点\n- 引用 1-2 个具体数据/案例\n- 结尾 CTA + 下期预告\n- 含 [pause] [emphasis] 标记",
    "tags": [
      "剧本",
      "对话",
      "podcast"
    ],
    "desc_zh": "podcast/视频对话剧本（钩子+争议+数据）",
    "category": "content",
    "body_zh": "创作一段 {{duration}} 分钟的 {{format}}（podcast/视频）对话剧本，主题 {{topic}}。\n\n角色：\n- Host: {{host_persona}}\n- Guest: {{guest_persona}}\n\n要求：\n- 钩子前 30 秒抓住听众\n- 自然对话不像念稿\n- 1-2 个争议点 + 各自观点\n- 引用 1-2 个具体数据/案例\n- 结尾 CTA + 下期预告\n- 含 [pause] [emphasis] 标记"
  }
];
