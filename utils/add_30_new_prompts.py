"""
add_30_new_prompts.py - 加 30 条精选 prompt 把库从 113 → 143
重点补：AI 视频 / 智能体 / 学习成长 / 商业生活 + 2026 新工具
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# 30 条新 prompt（每条手写）
NEW_PROMPTS = [
    # === AI 视频 8 条 ===
    {
        "title": "Sora 2 商用短视频脚本",
        "body": "Generate a Sora 2 commercial video script for {{product}}. Requirements:\n- Length: 6-10 seconds\n- Camera: dynamic, multiple angles\n- Mood: {{mood}}\n- Audio: synced ambient sound\n- Output 1 main + 2 alt prompts",
        "body_zh": "为 {{product}} 生成 Sora 2 商用短视频脚本。要求：\n- 时长 6-10 秒\n- 镜头：动态多角度\n- 情绪：{{mood}}\n- 音轨：同步环境音\n- 输出 1 个主版 + 2 个备选 prompt",
        "tags": ["Sora", "商用视频", "AI 视频"],
        "desc_zh": "Sora 2 商用 6-10 秒短视频 prompt（主+备选）",
        "category": "ai-video"
    },
    {
        "title": "Runway Gen-3 角色一致性",
        "body": "用 Runway Gen-3 生成 {{character}} 在 5 个场景的连续镜头。要求：\n- 用 reference image lock 角色\n- 每段 4-5 秒\n- 场景: 办公室 / 户外 / 室内特写 / 远景 / 动作\n- 保持服装/发型/比例完全一致",
        "tags": ["Runway", "Gen-3", "AI 视频"],
        "desc_zh": "Runway Gen-3 角色 5 场景一致性视频生成",
        "category": "ai-video"
    },
    {
        "title": "Pika 1.5 短动画 prompt",
        "body": "用 Pika 1.5 做一段 {{duration}} 秒短动画：\n- 风格：{{style}}（如 anime / Pixar / 水彩）\n- 主体：{{subject}}\n- 动作：{{action}}\n- 镜头运动：缓慢 push-in\n- Negative: blurry, distorted, extra limbs",
        "tags": ["Pika", "AI 动画", "AI 视频"],
        "desc_zh": "Pika 1.5 风格化短动画完整 prompt",
        "category": "ai-video"
    },
    {
        "title": "AI 数字人讲解视频",
        "body": "做一段 {{duration}} 秒 AI 数字人讲解视频，主题 {{topic}}。\n- 形象：{{persona}}（如知识博主/老师/记者）\n- 语速：1.0x\n- 镜头：正面 + 偶尔切到 B-roll\n- 背景音乐：低音量 ambient\n- 字幕：双语（中 + 英）\n- 关键词强调：每 15 秒高亮 1-2 个关键词",
        "tags": ["数字人", "讲解视频", "AI 视频"],
        "desc_zh": "AI 数字人主播讲解视频完整制作 brief",
        "category": "ai-video"
    },
    {
        "title": "抖音 AI 短剧分集 prompt",
        "body": "策划一部 {{episodes}} 集 AI 全自动短剧，每集 60 秒。\n- 主题：{{theme}}\n- 主角：{{protagonist}}\n- 钩子：第 1 集前 3 秒必须抓住\n- 反转：每集结尾留悬念\n- 输出每集 storyboard：开场 / 冲突 / 高潮 / 钩子",
        "tags": ["短剧", "抖音", "AI 视频"],
        "desc_zh": "抖音 AI 全自动短剧多集 storyboard 策划",
        "category": "ai-video"
    },
    {
        "title": "AI 视频配音 prompt（ElevenLabs）",
        "body": "为这段视频脚本生成 ElevenLabs 配音 prompt：\n\n脚本：{{script}}\n\n要求：\n- 声音：{{voice_type}}（专业讲解/温暖叙事/活泼俏皮）\n- 情绪曲线：开头平稳 → 中段激动 → 结尾温和\n- 关键词重音标记 [高亮]\n- 停顿点 [pause:0.5s]\n- 输出 ElevenLabs API 调用参数 JSON",
        "tags": ["ElevenLabs", "配音", "AI 视频"],
        "desc_zh": "ElevenLabs 视频配音 prompt + API 参数",
        "category": "ai-video"
    },
    {
        "title": "AI 视频字幕优化 prompt",
        "body": "我有一段视频字幕 {{transcript}}。帮我：\n1. 修语病和错别字\n2. 加情绪标签 [strong] [pause]\n3. 拆成 1-2 行短句（每行 ≤ 12 字符）\n4. 关键词高亮（粗体或彩色标注）\n5. 输出 SRT 格式 + 备注哪里加 emoji 加分",
        "tags": ["字幕", "视频后期", "AI 视频"],
        "desc_zh": "AI 优化视频字幕（SRT 格式输出）",
        "category": "ai-video"
    },
    {
        "title": "Veo 3 + 同步音轨高级 prompt",
        "body": "用 Veo 3 生成 {{duration}} 秒电影质感视频。\n\n场景：{{scene_description}}\n\n要求：\n- 镜头：{{camera_movement}}\n- 光线：{{lighting}}\n- 同步音轨：{{audio_sync}}（如海浪+风声+海鸥）\n- 物理：真实重力 + 光影反射\n- 调色：{{color_grade}}（如 Wes Anderson 风/赛博朋克霓虹）\n\n输出主 prompt + 3 个 style variants",
        "tags": ["Veo", "电影质感", "AI 视频"],
        "desc_zh": "Veo 3 电影质感长 prompt（含同步音轨）",
        "category": "ai-video"
    },

    # === 智能体 6 条 ===
    {
        "title": "MCP server 完整骨架（含工具调用）",
        "body": "Generate a complete MCP server skeleton for {{purpose}}. Requirements:\n- Tools: {{tool_list}}\n- Resources: {{resource_list}}\n- Prompts: {{prompt_list}}\n- TypeScript + @modelcontextprotocol/sdk\n- Include error handling + input validation\n- Output: server.ts, tsconfig.json, package.json",
        "body_zh": "为 {{purpose}} 生成完整 MCP server 骨架。要求：\n- Tools: {{tool_list}}\n- Resources: {{resource_list}}\n- Prompts: {{prompt_list}}\n- TypeScript + @modelcontextprotocol/sdk\n- 含错误处理 + 输入验证\n- 输出 server.ts / tsconfig.json / package.json",
        "tags": ["MCP", "智能体", "TypeScript"],
        "desc_zh": "完整可运行 MCP server 项目骨架",
        "category": "agent"
    },
    {
        "title": "Anthropic Computer Use 任务自动化",
        "body": "用 Anthropic Computer Use 完成 {{task}}。\n\n任务分解：\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\n要求：\n- 每步前截屏验证状态\n- 失败时 retry 3 次再 fallback\n- 输出每步 click/type 的精确坐标\n- 最终生成可执行 Python 脚本",
        "tags": ["Computer Use", "自动化", "智能体"],
        "desc_zh": "Anthropic Computer Use 任务自动化完整脚本",
        "category": "agent"
    },
    {
        "title": "多 Agent 协作 brief（CrewAI / LangGraph）",
        "body": "用 CrewAI 设计一个多 agent 系统完成 {{goal}}。\n\n角色分配：\n- Researcher: 收集 + 验证信息\n- Writer: 起草内容\n- Reviewer: 审校 + 提建议\n- Coordinator: 任务分发 + 集成\n\n输出：\n- 各角色 system prompt\n- task delegation 流程图\n- 失败 retry 策略\n- 最终 deliverable 格式",
        "tags": ["CrewAI", "LangGraph", "多 Agent"],
        "desc_zh": "多 agent 协作系统设计 (CrewAI / LangGraph)",
        "category": "agent"
    },
    {
        "title": "Agent 自我反思 + 修正 prompt",
        "body": "我是 AI agent 正在执行任务 {{task}}。当前输出：\n\n{{current_output}}\n\n请用 self-reflection 评估：\n1. 输出是否完整满足任务？\n2. 有哪些隐藏假设可能错？\n3. 边界情况是否考虑？\n4. 改进版应该怎么写？\n\n输出修正后的最终 v2 + 改进点列表。",
        "tags": ["self-reflection", "智能体", "修正"],
        "desc_zh": "Agent 自我反思 + v2 修正 prompt",
        "category": "agent"
    },
    {
        "title": "Agent 决策树构建",
        "body": "为 agent 设计 {{scenario}} 场景下的决策树。\n\n输入信号：{{inputs}}\n可能动作：{{actions}}\n\n要求：\n- 每个 branch 写明触发条件\n- 输出 mermaid 流程图\n- 标注 high-risk 决策点（需人工 review）\n- 失败 fallback 路径\n- LLM 不确定时的 escalation 策略",
        "tags": ["决策树", "智能体", "mermaid"],
        "desc_zh": "Agent 场景决策树（mermaid 图）",
        "category": "agent"
    },
    {
        "title": "Agent 工具调用错误恢复",
        "body": "我的 agent 调用工具失败：\n\n工具: {{tool_name}}\n错误: {{error_msg}}\n输入: {{input_data}}\n\n请：\n1. 诊断错误根因（输入格式/权限/超时/服务挂）\n2. 给出 3 种 retry 策略\n3. 如果重试都失败，fallback 该用什么替代工具\n4. 怎么 log 给开发者排查",
        "tags": ["错误恢复", "智能体", "调试"],
        "desc_zh": "Agent 工具调用失败诊断 + 3 种 retry",
        "category": "agent"
    },

    # === 学习成长 5 条 ===
    {
        "title": "AI 学术论文快速精读",
        "body": "我要快速理解这篇 {{field}} 领域的论文：{{paper_title}}\n\n请：\n1. 用 5 句话概括核心贡献\n2. 列 3 个最重要 figure / 公式\n3. 解释作者的关键 insight（用普通人能懂的话）\n4. 跟我说哪个段落值得深读\n5. 类比另一个我可能熟悉的领域帮我理解",
        "tags": ["论文", "学术", "学习"],
        "desc_zh": "学术论文 5 步精读法（核心贡献+关键 insight）",
        "category": "learn"
    },
    {
        "title": "AI 错题分析 + 知识漏洞定位",
        "body": "我做了 {{subject}} 的题，下面是错题：\n\n{{wrong_answers}}\n\n请：\n1. 归类错题类型（概念混淆 / 计算 / 粗心 / 知识缺失）\n2. 定位每题反映的具体知识点漏洞\n3. 推荐每个漏洞 3 个针对性训练（题目 / 视频 / 文章）\n4. 出 5 道类似题让我练习\n5. 给我下次怎么避免同类错的 1 句话提醒",
        "tags": ["错题", "学习", "知识漏洞"],
        "desc_zh": "AI 错题归类 + 漏洞定位 + 针对性训练",
        "category": "learn"
    },
    {
        "title": "AI 复习计划生成",
        "body": "我在 {{deadline}} 前要复习 {{subject}}，有 {{hours_per_day}} 小时/天。\n\n现状：\n- 已掌握：{{mastered}}\n- 不熟练：{{weak}}\n- 完全不会：{{unknown}}\n\n请生成：\n1. 按周拆分的复习计划\n2. 每天具体任务（含休息时间）\n3. 间隔重复（spaced repetition）触发节点\n4. 模拟考时间安排\n5. 心态调节建议",
        "tags": ["复习", "学习计划", "spaced repetition"],
        "desc_zh": "AI 周度复习计划（含间隔重复 + 心态）",
        "category": "learn"
    },
    {
        "title": "AI 知识图谱构建",
        "body": "把 {{topic}} 这个主题构建成知识图谱：\n\n要求：\n1. 列 10-15 个核心概念\n2. 用 mermaid graph 画概念间的关系（依赖 / 因果 / 包含 / 类比）\n3. 标注每个概念的「难度（1-5）」和「重要性（1-5）」\n4. 推荐学习顺序（拓扑排序）\n5. 每个概念给 1 句话定义 + 1 个具体例子",
        "tags": ["知识图谱", "mermaid", "学习"],
        "desc_zh": "主题知识图谱（mermaid + 学习顺序）",
        "category": "learn"
    },
    {
        "title": "AI 概念解释 5 层渐进",
        "body": "解释概念 {{concept}}，用 5 层渐进方式：\n\n1. **5 岁懂**：用比喻 + 简单生活例子\n2. **15 岁懂**：用基础学科知识 + 1 个例子\n3. **大学生懂**：用形式化定义 + 推导\n4. **从业者懂**：用实战场景 + 边界情况\n5. **专家懂**：用前沿争议 / 未解问题\n\n每层 50-100 字。",
        "tags": ["概念", "渐进解释", "学习"],
        "desc_zh": "概念 5 层渐进解释（5 岁→专家）",
        "category": "learn"
    },

    # === 商业生活 5 条 ===
    {
        "title": "AI 副业 ROI 评估",
        "body": "我考虑做副业 {{side_business}}。\n\n请帮我评估：\n1. 真实启动成本（含时间）\n2. 第 1 笔收入预期时间\n3. 月入天花板 + 中位\n4. 风险 + 主要竞争\n5. 跟我现有资源（{{my_resources}}）的契合度\n6. 失败 fallback 方案\n7. 给我 0-10 推荐分数",
        "tags": ["副业", "ROI", "评估"],
        "desc_zh": "副业方向 7 维度 ROI 评估 + 推荐分",
        "category": "biz-life"
    },
    {
        "title": "AI 广告投放 brief 生成",
        "body": "我要在 {{platform}}（如抖音/小红书/B站）投广告，预算 {{budget}}。\n\n产品：{{product}}\n目标受众：{{target}}\n\n生成完整 brief：\n1. 3 套创意脚本（各 30 秒）\n2. 关键词 + 标签建议\n3. 出价策略（CPC/CPM/oCPM 选择）\n4. 时段 + 地域 + 兴趣定向\n5. A/B test 矩阵\n6. ROI 预期 + 何时停",
        "tags": ["广告", "投放", "Marketing"],
        "desc_zh": "AI 广告投放完整 brief（创意+定向+ROI）",
        "category": "biz-life"
    },
    {
        "title": "AI 业务数据深度分析",
        "body": "我有这份 {{data_type}} 数据：\n\n{{data}}\n\n请：\n1. 找出 3 个最反常的趋势\n2. 用同期/环比/RFM 分类\n3. 推断背后的业务原因\n4. 给 5 个可执行的优化建议（按 ROI 排序）\n5. 哪些需要进一步数据验证\n6. 输出可直接给老板看的 1 页摘要",
        "tags": ["数据分析", "业务", "决策"],
        "desc_zh": "业务数据 6 维度深度分析（含老板摘要）",
        "category": "biz-life"
    },
    {
        "title": "AI 用户画像生成（基于真实数据）",
        "body": "我有这些用户数据样本：\n\n{{user_data}}\n\n请：\n1. 聚类成 3-5 个典型 persona\n2. 每个 persona 起名字 + 一句话定位\n3. 列每个 persona 的：年龄/职业/痛点/触媒/购买力/触发场景\n4. 标注哪个 persona ROI 最高\n5. 给每个 persona 1 句话产品定位",
        "tags": ["用户画像", "persona", "营销"],
        "desc_zh": "AI 用户画像聚类 + 每个 persona 定位",
        "category": "biz-life"
    },
    {
        "title": "AI 增长 hack 头脑风暴",
        "body": "我的产品 {{product}} 当前 {{stage}} 阶段，目标 {{growth_goal}}。\n\n请头脑风暴：\n1. 10 个 zero-budget 增长策略\n2. 5 个 paid 增长（按 CAC 排序）\n3. 3 个 viral 钩子设计\n4. 2 个反共识的增长路径\n5. 每个策略：预期 ROI + 试错成本 + 时间窗\n6. 推荐第 1 个先试什么 + 为什么",
        "tags": ["增长", "Growth Hack", "营销"],
        "desc_zh": "AI 增长策略头脑风暴（20 路径 + 试错排序）",
        "category": "biz-life"
    },

    # === AI 编程 3 条（2026 新工具） ===
    {
        "title": "Cursor Composer 新功能 multi-file edit",
        "body": "用 Cursor Composer 做这个 multi-file change：\n\n变更：{{change_description}}\n影响文件：{{files}}\n\n要求：\n1. 跨文件保持 type 一致\n2. 更新所有 caller\n3. migration 脚本（如有 schema 变化）\n4. 单测覆盖新 path\n5. commit message 用 conventional commits\n输出 git diff 格式",
        "tags": ["Cursor", "Composer", "编程"],
        "desc_zh": "Cursor Composer multi-file 重构标准模板",
        "category": "ai-coding"
    },
    {
        "title": "Windsurf Cascade 多步任务",
        "body": "Use Windsurf Cascade to execute this multi-step task: {{task}}\n\nSteps:\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\nRequirements:\n- Each step verify before proceeding\n- If any step fails, halt and ask\n- Summarize what changed at end\n- Generate test cases for new code",
        "body_zh": "用 Windsurf Cascade 执行多步任务: {{task}}\n\n步骤:\n1. {{step_1}}\n2. {{step_2}}\n3. {{step_3}}\n\n要求:\n- 每步验证后再继续\n- 任何步骤失败时停下来问\n- 末尾总结改了什么\n- 为新代码生成测试用例",
        "tags": ["Windsurf", "Cascade", "编程"],
        "desc_zh": "Windsurf Cascade 多步任务标准模板",
        "category": "ai-coding"
    },
    {
        "title": "Cline (Claude Dev) 项目 onboarding",
        "body": "Cline 第一次进我的项目 {{project_path}}，请：\n1. 扫描代码结构（输出 tree 至 3 层）\n2. 找 README / package.json / 入口文件\n3. 总结项目类型 + 技术栈 + 主要 feature\n4. 列 5 个我可能想问的事\n5. 推荐第 1 个 task（low-risk learning task）",
        "tags": ["Cline", "Claude Dev", "onboarding"],
        "desc_zh": "Cline 项目首次 onboarding 标准 prompt",
        "category": "ai-coding"
    },

    # === 内容创作 3 条 ===
    {
        "title": "AI 翻译保留风格（小说 / 散文）",
        "body": "把下面这段 {{source_lang}} 翻译成 {{target_lang}}：\n\n{{text}}\n\n要求：\n- 保留作者语气（如严肃/俏皮/沉郁）\n- 保留比喻和修辞\n- 不机翻，意译为主\n- 保留专有名词（人名/地名）原文 + 中文音译\n- 输出 3 个版本：直译 / 意译 / 文学化",
        "tags": ["翻译", "文学", "风格保留"],
        "desc_zh": "文学风格翻译（3 版本：直译/意译/文学化）",
        "category": "content"
    },
    {
        "title": "AI 生成 SEO 元数据（title + description）",
        "body": "为这个页面生成 SEO 元数据：\n\nURL: {{url}}\n内容: {{content_summary}}\n\n请：\n1. Title (60 字符内, 含主关键词)\n2. Description (160 字符内, 1 句吸引点击)\n3. 5 个长尾关键词 (各 2-4 词)\n4. 1 个 schema.org 结构化数据 (JSON-LD)\n5. Open Graph + Twitter Card 字段\n6. 输出 1 个完整 <head> 片段",
        "tags": ["SEO", "元数据", "Marketing"],
        "desc_zh": "SEO 元数据完整套件（title+desc+schema+OG）",
        "category": "content"
    },
    {
        "title": "AI 对话剧本（视频/podcast）",
        "body": "创作一段 {{duration}} 分钟的 {{format}}（podcast/视频）对话剧本，主题 {{topic}}。\n\n角色：\n- Host: {{host_persona}}\n- Guest: {{guest_persona}}\n\n要求：\n- 钩子前 30 秒抓住听众\n- 自然对话不像念稿\n- 1-2 个争议点 + 各自观点\n- 引用 1-2 个具体数据/案例\n- 结尾 CTA + 下期预告\n- 含 [pause] [emphasis] 标记",
        "tags": ["剧本", "对话", "podcast"],
        "desc_zh": "podcast/视频对话剧本（钩子+争议+数据）",
        "category": "content"
    },
]

assert len(NEW_PROMPTS) == 30, f"need 30, got {len(NEW_PROMPTS)}"

# 读现有 prompts.js
text = Path('prompts.js').read_text(encoding='utf-8')
m = re.search(r'module\.exports\s*=\s*(\[.*\]);?\s*$', text, re.DOTALL)
data = json.loads(m.group(1))
print(f"Loaded {len(data)} existing prompts")

# 检查 title 重复
existing_titles = {p['title'] for p in data}
duplicates = [p['title'] for p in NEW_PROMPTS if p['title'] in existing_titles]
if duplicates:
    print(f"WARN: title duplicates with existing: {duplicates}")

# 给新 prompt 加 body_zh 兜底（中文 body 时 body_zh = body）
for p in NEW_PROMPTS:
    if 'body_zh' not in p:
        p['body_zh'] = p['body']

# 合并
data.extend(NEW_PROMPTS)

# 验证 category 全合法
valid_cats = {'ai-coding', 'ai-art', 'ai-video', 'content', 'agent', 'work', 'learn', 'biz-life'}
invalid = [p['title'] for p in NEW_PROMPTS if p['category'] not in valid_cats]
if invalid:
    print(f"ERROR: invalid category: {invalid}")
    sys.exit(1)

# 写回
out = 'module.exports = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
Path('prompts.js').write_text(out, encoding='utf-8')

# 统计
from collections import Counter
counts = Counter(p['category'] for p in data)
print(f"\n✅ Total prompts now: {len(data)} (was 113, +{len(NEW_PROMPTS)})")
print(f"   File size: {len(out)} chars\n")
print("分类分布:")
for cat, cnt in sorted(counts.items(), key=lambda x: -x[1]):
    print(f"  {cat:12s}: {cnt}")
