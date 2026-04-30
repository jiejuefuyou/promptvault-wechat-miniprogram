"""
add_desc_zh.py
给 113 个 prompt 加 desc_zh 中文一句话说明。
跑一次，输出新 prompts.js。
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# 读现有 prompts.js
js_text = Path('prompts.js').read_text(encoding='utf-8')
# 提取 module.exports = [...] 中的数组
m = re.search(r'module\.exports\s*=\s*(\[.*\]);?\s*$', js_text, re.DOTALL)
data = json.loads(m.group(1))

# 113 个 1-行中文描述（按 prompt 顺序，与 prompts.js 一致）
DESCRIPTIONS = [
    "把英文段落改写成自然口语化英文，适合给 native speaker 看",
    "把英文/混合内容翻译成口语化中文，保留专业术语",
    "把长文章压缩成 5 个要点 + 1 句总结",
    "逐行用大白话解释代码，并指出隐藏 bug",
    "重构代码提高可读性，行为不变，输出新代码",
    "为函数写单测：正常路径 + 2 边界 + 1 错误",
    "用资深工程师视角做 code review，指出真问题",
    "中文需求 → SD/Midjourney 出图英文 prompt",
    "ComfyUI 工作流报错排查模板",
    "拍摄文案 → 短视频脚本（含分镜 + 字幕）",
    "DeepSeek/Claude 通用 system prompt 起手模板",
    "起草专业语气英文邮件",
    "起草中文商务邮件（合规、得体）",
    "围绕一个 idea 头脑风暴 10 个不同角度",
    "JD 描述 → resume 简历要点（量化）",
    "面试官视角生成可能问到的问题",
    "晨会站会 helper：今天做啥/昨天做了啥",
    "基于 git log 自动生成周报（中文）",
    "把模糊目标拆成 OKR（O + 3 KR）",
    "Pros/Cons + 推荐 + 决策依据 完整决策框架",
    "用 5 岁小孩能懂的方式解释复杂概念",
    "Feynman 学习法：用自己的话教一遍",
    "把长 PDF / 长文分块总结，最后合并",
    "对比 N 个同类产品的优缺点 + 推荐场景",
    "App Store 描述按 ASO 规则优化",
    "ASO 关键词调研：竞品 + 长尾词挖掘",
    "Reddit 'Show & Tell' 帖子套路（不被 ban）",
    "Twitter/X thread 8-10 条结构化内容",
    "Product Hunt launch 文案（标题+描述+评论）",
    "Coze/Dify 智能体 system prompt 起手骨架",
    "Claude Code 项目根 system prompt（决定 agent 风格）",
    "Claude Code 修 bug 标准输入模板（含上下文）",
    "Cursor / Claude Code 实施新功能的标准模板",
    "Senior peer 视角的代码审查（找设计 + 边界 bug）",
    "Claude Code skill: 从 git log 自动生成 changelog",
    "Cursor 项目 .cursorrules 起手模板",
    "Gemini Antigravity 工作流起手模板",
    "Nano Banana 人物换装 prompt（保持脸型）",
    "Nano Banana 多图融合（背景换人）",
    "Nano Banana 产品摄影 prompt（电商风格）",
    "ComfyUI 工作流文档化 + 复用 brief",
    "图片反推 prompt（图 → 文字描述）",
    "Coze 智能体起手 system prompt（含工具调用）",
    "Dify 工作流 + RAG 检索增强 agent prompt",
    "n8n + LLM 工作流自动化 prompt 模板",
    "browser-use / Computer Use 任务自动化模板",
    "海螺 / Kling 等中文 AI 视频脚本 prompt",
    "Sora 2 短视频脚本（叙事型，含运镜）",
    "面试现场速答 LLM 面试题模板",
    "用户视角对比两个大模型（实测对比）",
    "本地部署大模型选型 brief（硬件 + 模型）",
    "AI 工具体验测评模板（小红书风格）",
    "评估 AI 副业方向（市场 + 竞争 + 难度）",
    "AI 教程视频结构（钩子 + 内容 + 收尾）",
    "解读 DeepSeek-R1 的 thinking 区块",
    "把碎片笔记整理成结构化文档",
    "AI 生成小红书爆款标题（多 hook 测试）",
    "Midjourney 一致性人物 prompt（不同场景）",
    "SD WebUI / Forge 通用 prompt 结构（高质量）",
    "AI 生成社媒头像（多风格选择）",
    "AI 生成手机锁屏壁纸（高分辨率）",
    "ControlNet OpenPose 控制人物动作 prompt",
    "可灵 1.6 中文视频 prompt（运镜 + 物理）",
    "即梦 4.0 视频脚本模板",
    "Veo 3 长 prompt（含同步音轨）",
    "MCP server 设计模板（工具 + 资源 + prompt）",
    "FastGPT / MaxKB 知识库 prompt 起手",
    "MetaGPT 多 agent 协作 brief（角色分工）",
    "Agent 失败模式 13 项诊断清单",
    "Aider 单 commit 任务标准模板",
    "Continue.dev 项目 system prompt",
    "Trae / Qoder 国产 IDE agent prompt 模板",
    "AI 写完代码后的自我审查 7 项清单",
    "AI 内容创作流水线设计（idea → 发布）",
    "ChatGPT 销售文案写作（带具体场景）",
    "AI 评测短文模板（小红书 / 即刻 风格）",
    "AI 生成会议纪要（含 action items）",
    "ChatGPT/Claude 写邮件回复（保留语气）",
    "用 AI 理性表达不满（替代吵架）",
    "AI 把 PDF / 长文整理成 Anki 卡（间隔重复）",
    "AI 重写 commit message 按 conventional commits",
    "AI 生成 SQL（带安全检查 + 执行 plan）",
    "AI 起 PR / MR 描述（含变更摘要）",
    "AI 生成 30 天学习路径（含每日任务）",
    "Feynman 笔记法的 LLM 版本",
    "把知识点结构化成 mermaid 图（流程/思维）",
    "自媒体选题挖掘 prompt（趋势 + 痛点）",
    "短视频脚本 Hook 测试（多版本 A/B）",
    "公众号长文结构 outline（钩子 + 干货 + CTA）",
    "代码语言/框架迁移 prompt（含 diff）",
    "API 设计 review（REST/GraphQL/gRPC）",
    "数据库 schema 演进 prompt（zero-downtime）",
    "性能瓶颈定位 prompt（含 profiling 指引）",
    "商业模式画布 9 格快速填",
    "AI 分析竞品（5 维度 + 差异化建议）",
    "用户访谈半结构化模板（暖场 + 5 主问 + 收尾）",
    "AI 按冰箱食材生成菜单（中式 / 一周）",
    "AI 旅行规划器（含交通 + 住宿 + 备选）",
    "AI 健身计划生成（按目标 + 设备）",
    "合同条款风险排查 prompt（不替代律师）",
    "App 隐私政策 + 用户协议生成（含 GDPR）",
    "App Store 描述按转化率重写",
    "AppStoreConnect 提审说明（review notes）",
    "AI 校对：找问题不改风格（保留作者声音）",
    "AI 把硬文改写成读起来不累的版本",
    "AI 把照片转成可发朋友圈/小红书的文案",
    "AI 起读书笔记（含行动项 + 引用）",
    "AI 帮你写求职信 cover letter（个性化）",
    "AI 给你做选择（用启发式 + 元决策）",
    "AI 解读图表 / 数据（找规律 + 异常）",
    "AI 生成 Excel 公式 / 函数（含说明）",
    "AI 写日语商务邮件（敬语合规）",
    "AI 翻译保留原作者语气（不机翻不直译）",
]

assert len(DESCRIPTIONS) == len(data), f"Mismatch: {len(DESCRIPTIONS)} desc vs {len(data)} prompts"

# 加 desc_zh 字段
for i, prompt in enumerate(data):
    prompt['desc_zh'] = DESCRIPTIONS[i]

# 写回 prompts.js
out = 'module.exports = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
Path('prompts.js').write_text(out, encoding='utf-8')
print(f"✅ Updated prompts.js with {len(DESCRIPTIONS)} desc_zh entries")
print(f"   File size: {len(out)} chars")
