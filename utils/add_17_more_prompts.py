"""
add_17_more_prompts.py - 加 17 条 (143→160) — 重 SMB 工作场景 + AI 副业
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

NEW_PROMPTS = [
    # === 工作效率 5 条 (12→17) ===
    {
        "title": "AI 自动写跨部门 RFP 回复",
        "body": "我要回复一份 RFP（招标书 / 合作邀约）。\n\n甲方需求摘要: {{requirements}}\n我方优势: {{our_strengths}}\n禁忌: {{taboos}}\n\n请生成:\n1. 抓住对方核心痛点的 1 段开场（200 字内）\n2. 我方解决方案 5 个点（每个 50 字）\n3. 时间 + 报价 + 团队介绍\n4. 1 段「为什么是我们」\n5. 2 个 follow-up 问题反问甲方",
        "tags": ["RFP", "商务", "工作效率"],
        "desc_zh": "AI 起草 RFP / 招标 / 合作邀约回复",
        "category": "work"
    },
    {
        "title": "AI 1-on-1 反馈起草（员工 review）",
        "body": "我要给员工 {{name}} 做季度 review。\n\n员工概况: {{role}} / 在职 {{tenure}}\n本季度产出: {{achievements}}\n问题: {{issues}}\n\n请起草 review 文稿:\n1. 本季亮点 2-3 条具体（非空话）\n2. 改进建议 1-2 条（带具体例子）\n3. 下季 SMART 目标 3 条\n4. 需要公司提供的支持\n5. 整体评级 + 简短评语\n\n语气: 直接但温暖, 不要套路话.",
        "tags": ["1-on-1", "review", "管理"],
        "desc_zh": "AI 起员工季度 review 反馈（直接但温暖）",
        "category": "work"
    },
    {
        "title": "AI 起家长沟通话术（教育 / 咨询）",
        "body": "我要跟 {{student_name}} 家长沟通。\n\n场景: {{scenario}} (如「成绩下滑」「上课走神」「不想学」)\n学生情况: {{student_situation}}\n家长性格: {{parent_type}} (如「焦虑型」「放任型」「权威型」)\n\n生成 3 段话术:\n1. 开场 (避免直接说坏消息)\n2. 客观陈述事实 + 数据\n3. 建议方案 + 家长可做的具体动作\n\n语气: 同理 + 专业 + 不指责.",
        "tags": ["家长沟通", "教育", "管理"],
        "desc_zh": "AI 教育场景家长沟通话术（3 段式）",
        "category": "work"
    },
    {
        "title": "AI 跨时区会议时间协调",
        "body": "我要约一个会议，参与者:\n{{participants}}\n\n每人时区 + 偏好:\n{{timezones_prefs}}\n\n请:\n1. 算出 3 个所有人都在工作时间的时间窗\n2. 标记每个时间窗对每人的舒适度\n3. 推荐最优 1 个 + 备选 2 个\n4. 用各人本地时间显示\n5. 起一封 calendar invite 邮件",
        "tags": ["会议", "时区", "协调"],
        "desc_zh": "AI 跨时区会议时间协调 + invite 邮件",
        "category": "work"
    },
    {
        "title": "AI 起 Slack / 飞书 团队公告",
        "body": "公司有重要事项要发团队公告: {{event}}\n\n受众: {{audience}} (全员 / 某部门 / 某 level)\n敏感度: {{sensitivity}} (低 / 中 / 高)\n核心信息: {{key_message}}\n\n请生成:\n1. 标题 (吸引但不夸张)\n2. TL;DR 1 句\n3. 详细解释 (按 audience 调整深度)\n4. 你的 expectation (员工要做什么)\n5. Q&A 链接 / 时段\n6. 合规 + 礼貌 footer\n\n语气: 透明 + 尊重 + 行动导向.",
        "tags": ["公告", "Slack", "飞书"],
        "desc_zh": "AI 起团队公告（标题+TL;DR+解释+Q&A）",
        "category": "work"
    },

    # === 商业生活 4 条 (26→30) ===
    {
        "title": "AI 副业每周节奏规划",
        "body": "我有 {{weekly_hours}} 小时/周可投副业 {{side_project}}。\n\n现状: {{current_stage}}\n90 天目标: {{goal}}\n\n请帮我:\n1. 拆 13 周计划 (每周 2-3 个 SMART task)\n2. 每周 hour 分配 (production / marketing / admin)\n3. 每月里程碑 (3 个)\n4. 失败 fallback (如果 30/60/90 天数据低于预期)\n5. 我可以放弃的 5 个 nice-to-have",
        "tags": ["副业", "规划", "13 周"],
        "desc_zh": "AI 副业 13 周完整节奏 + fallback",
        "category": "biz-life"
    },
    {
        "title": "AI 起独立开发者每月财务报表",
        "body": "我是独立开发者，本月数据:\n\n收入: {{income_breakdown}} (按 source)\n支出: {{expenses}}\n时间投入: {{hours_per_project}}\n\n请生成:\n1. 1 页月报 (收入/支出/利润/小时单价)\n2. 跟上月对比 (% 变化)\n3. 高 ROI / 低 ROI 项目识别\n4. 下月 3 个具体优化建议\n5. 是否值得继续 vs 砍掉的项目判断",
        "tags": ["财务", "独立开发", "月报"],
        "desc_zh": "AI 独立开发者月度财务 + 项目 ROI 决策",
        "category": "biz-life"
    },
    {
        "title": "AI 起社群运营月度 SOP",
        "body": "我运营一个 {{community_type}} 社群 ({{member_count}} 人, {{community_topic}})。\n\n当前问题: {{current_issues}}\n\n请生成月度 SOP:\n1. 每天动作 (5-15 min)\n2. 每周动作 (1-2 hr)\n3. 每月动作 (~5 hr)\n4. 续费节点 (如付费社群)\n5. 失活用户挽回 trigger\n6. 内容更新节奏\n7. 高活跃用户激励 mechanism",
        "tags": ["社群", "运营", "SOP"],
        "desc_zh": "AI 社群运营月度 SOP（日/周/月）",
        "category": "biz-life"
    },
    {
        "title": "AI 房贷 / 信用卡 / 投资决策",
        "body": "我面临财务决策: {{decision_type}}\n\n选项:\nA: {{option_a}}\nB: {{option_b}}\n\n我的现状: 收入 {{income}}, 支出 {{expenses}}, 储蓄 {{savings}}, 风险偏好 {{risk}}\n\n请用决策框架分析:\n1. 5 年 / 10 年财务影响 (3 种情景)\n2. 隐性成本 (机会成本 / 流动性 / 心理负担)\n3. 反对每个选项的 3 个理由\n4. 数据 / 假设 sensitivity 分析\n5. 推荐 + 推理过程\n\n声明: 仅供参考非专业财务建议.",
        "tags": ["财务决策", "投资", "生活"],
        "desc_zh": "AI 财务决策 5 年/10 年情景分析（仅参考）",
        "category": "biz-life"
    },

    # === AI 编程 4 条 (27→31) ===
    {
        "title": "AI 修生产环境 P0 bug",
        "body": "生产环境出现 P0 bug:\n\n错误信息: {{error_msg}}\n影响范围: {{impact}}\n复现条件: {{repro}}\n相关代码片段: {{code_snippet}}\n最近变更: {{recent_changes}}\n\n请用 senior on-call 思维:\n1. 5 分钟内可做的 mitigate (止血)\n2. 30 分钟内可做的 root cause 推测\n3. 推荐的 fix 顺序 (临时 hotfix vs 完整 fix)\n4. 测试 checklist\n5. postmortem 关键问题 (我们怎么避免再犯)\n6. 是否需要 rollback",
        "tags": ["P0 bug", "on-call", "生产"],
        "desc_zh": "AI senior on-call 思维修 P0 bug",
        "category": "ai-coding"
    },
    {
        "title": "AI 起 PR description（含 risk + rollback）",
        "body": "我即将提交 PR:\n\n变更: {{change_description}}\n影响文件: {{files}}\n动机: {{motivation}}\n\n请生成完整 PR description:\n1. ## What — 1 句核心\n2. ## Why — 业务 + 技术\n3. ## How — 3-5 个关键设计决策\n4. ## Risk — 这个改动会 break 什么\n5. ## Rollback plan — 出问题怎么回滚\n6. ## Testing — 已做 + 待做\n7. ## Reviewer focus — 最值得 review 的 3 处\n\n用 conventional commits style 起 commit msg.",
        "tags": ["PR", "代码 review", "rollback"],
        "desc_zh": "AI 起完整 PR description (含 risk + rollback)",
        "category": "ai-coding"
    },
    {
        "title": "AI 数据库 query 性能优化",
        "body": "我有这条 SQL 跑很慢:\n\n```sql\n{{slow_query}}\n```\n\n表结构: {{schema}}\n数据量: {{row_count}}\nDB 引擎: {{db_engine}}\nEXPLAIN 输出: {{explain_output}}\n\n请:\n1. 找出 3 个性能瓶颈 (用 EXPLAIN 数据 backed)\n2. 改写 query 给 3 个优化版本 (各自 trade-off)\n3. 推荐应该加的 index (含可能的 downside)\n4. 是否考虑 schema 调整 / 缓存层\n5. 测试方法 (怎么验证优化生效)",
        "tags": ["SQL", "性能", "数据库"],
        "desc_zh": "AI SQL 性能瓶颈分析 + 3 优化版本",
        "category": "ai-coding"
    },
    {
        "title": "AI 起 deployment runbook",
        "body": "我要部署 {{service}} 到 production。\n\n变更: {{deployment_changes}}\n依赖服务: {{dependencies}}\n\n请生成完整 deployment runbook:\n1. **Pre-deploy checklist** (10-15 项)\n2. **Deploy 步骤** (含每步预期时间 + 验证)\n3. **Verification** (deploy 后 5 min / 30 min / 24h 检查)\n4. **Rollback procedure** (准确 step + 时间)\n5. **Smoke test commands**\n6. **Monitoring dashboard 链接 + 关键指标**\n7. **On-call 通知 template**\n8. **Post-deploy retro questions**",
        "tags": ["deployment", "runbook", "DevOps"],
        "desc_zh": "AI 起完整 deployment runbook (8 段)",
        "category": "ai-coding"
    },

    # === 智能体 2 条 (15→17) ===
    {
        "title": "AI agent 任务 escalation 决策",
        "body": "我的 agent 在执行 {{task}} 中遇到不确定情况:\n\n现状: {{current_state}}\nAI 判断不确定的部分: {{uncertainty}}\n\n请帮判断:\n1. 这个不确定性是 low / mid / high stakes?\n2. 是否需要 escalate 给人工?\n3. 如果 escalate，应该 ping 谁? (按 RACI)\n4. 不 escalate 而 agent 自决，最坏情况是什么?\n5. 决策 framework: when in doubt, escalate?\n6. 输出 1 句决策结论 + 推理过程",
        "tags": ["escalation", "智能体", "决策"],
        "desc_zh": "AI agent 不确定时是否 escalate 给人工",
        "category": "agent"
    },
    {
        "title": "AI agent A/B 测试 prompt 优化",
        "body": "我有 2 个 prompt 版本要 A/B 测试:\n\nVersion A: {{prompt_a}}\nVersion B: {{prompt_b}}\n测试场景: {{test_scenarios}}\n\n请帮我:\n1. 设计 5-10 个 test case (各 case 的 input + 期望 output)\n2. 评分 rubric (准确度 / 简洁度 / 一致性 / 边界处理 / 安全)\n3. 用每个 case 跑 A vs B (你直接运行)\n4. 输出对比表 + 推荐胜出版本\n5. 给胜出版本提 v3 改进建议",
        "tags": ["A/B 测试", "prompt 优化", "智能体"],
        "desc_zh": "AI agent prompt A/B 测试 + 评分 rubric",
        "category": "agent"
    },

    # === 内容创作 2 条 (21→23) ===
    {
        "title": "AI 起社交媒体 1 周内容 batch",
        "body": "我要为 {{platform}} 生成 1 周内容:\n\n个人定位: {{positioning}}\n核心主题: {{themes}}\n受众: {{audience}}\n语气: {{tone}}\n\n请生成 7 天每天 1 篇 (共 7 篇):\n1. 每篇钩子 + body + 1 行 CTA\n2. 风格不重样 (科普 / 反共识 / 翻车 / 数据 / 故事 / 资源 / 提问)\n3. 每篇配图建议 (画面描述, 适合 Midjourney 出图)\n4. hashtag 建议 (各篇 3-5 个)\n5. 发布最佳时段 (按平台特性)",
        "tags": ["社交媒体", "1 周 batch", "内容"],
        "desc_zh": "AI 1 周 7 篇社交媒体内容 batch",
        "category": "content"
    },
    {
        "title": "AI 起视频脚本（5 分钟讲解型）",
        "body": "我要做一个 5 分钟视频，主题 {{topic}}。\n\n受众: {{audience}}\n核心 takeaway: {{key_message}}\n个人风格: {{my_style}}\n\n请生成完整脚本:\n0:00-0:15 钩子 (前 15 秒决定留存率)\n0:15-1:00 问题陈述 + 共鸣\n1:00-3:30 干货核心 (3 个 sub-section)\n3:30-4:30 case + 应用\n4:30-5:00 CTA + 下集预告\n\n每段标注:\n- 镜头 (近 / 中 / 远)\n- 关键词强调点\n- B-roll 建议",
        "tags": ["视频脚本", "5 分钟", "讲解"],
        "desc_zh": "AI 5 分钟讲解视频完整脚本（带镜头标注）",
        "category": "content"
    },
]

assert len(NEW_PROMPTS) == 17, f"need 17, got {len(NEW_PROMPTS)}"

text = Path('prompts.js').read_text(encoding='utf-8')
m = re.search(r'module\.exports\s*=\s*(\[.*\]);?\s*$', text, re.DOTALL)
data = json.loads(m.group(1))
print(f"Loaded {len(data)} existing prompts")

# 加 body_zh fallback
for p in NEW_PROMPTS:
    if 'body_zh' not in p:
        p['body_zh'] = p['body']

# 验证 category
valid_cats = {'ai-coding', 'ai-art', 'ai-video', 'content', 'agent', 'work', 'learn', 'biz-life'}
invalid = [p['title'] for p in NEW_PROMPTS if p['category'] not in valid_cats]
if invalid:
    print(f"ERROR: invalid: {invalid}")
    sys.exit(1)

# 检查 title 重复
existing_titles = {p['title'] for p in data}
dups = [p['title'] for p in NEW_PROMPTS if p['title'] in existing_titles]
if dups:
    print(f"ERROR: duplicates: {dups}")
    sys.exit(1)

data.extend(NEW_PROMPTS)
out = 'module.exports = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
Path('prompts.js').write_text(out, encoding='utf-8')

from collections import Counter
counts = Counter(p['category'] for p in data)
print(f"\n✅ Total: {len(data)} (+{len(NEW_PROMPTS)})\n")
for cat, cnt in sorted(counts.items(), key=lambda x: -x[1]):
    print(f"  {cat:12s}: {cnt}")
