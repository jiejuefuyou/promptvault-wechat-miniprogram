"""
add_category.py - 给 113 prompts 加 category 大类字段（8 类）
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# 8 大类定义（icon + name）
CATEGORIES = [
    {"id": "ai-coding",  "icon": "💻", "name": "AI 编程"},
    {"id": "ai-art",     "icon": "🎨", "name": "AI 绘画"},
    {"id": "ai-video",   "icon": "🎬", "name": "AI 视频"},
    {"id": "content",    "icon": "✍️", "name": "内容创作"},
    {"id": "agent",      "icon": "🤖", "name": "智能体"},
    {"id": "work",       "icon": "📊", "name": "工作效率"},
    {"id": "learn",      "icon": "📚", "name": "学习成长"},
    {"id": "biz-life",   "icon": "🎯", "name": "商业 / 生活"},
]

# 113 个 prompt 按顺序的 category 映射（与 prompts.js 完全一致顺序）
CAT_MAP = [
    "content",     # 1. Translate to natural English
    "content",     # 2. 翻译成简体中文
    "content",     # 3. Summarize a long article in 5 bullets
    "ai-coding",   # 4. Explain code in plain English
    "ai-coding",   # 5. Refactor for readability
    "ai-coding",   # 6. Write a unit test
    "ai-coding",   # 7. Code review like a senior
    "ai-art",      # 8. AI 绘画提示词
    "ai-art",      # 9. ComfyUI workflow troubleshoot
    "ai-video",    # 10. 拍摄文案 → 短视频脚本
    "ai-coding",   # 11. DeepSeek/Claude system prompt
    "work",        # 12. 邮件起草 (专业)
    "work",        # 13. 邮件起草 (中文商务)
    "work",        # 14. Brainstorm 10 angles
    "biz-life",    # 15. JD → resume bullets
    "biz-life",    # 16. 面试官提问准备
    "work",        # 17. Daily standup helper
    "work",        # 18. 周报生成
    "work",        # 19. OKR 拆解
    "work",        # 20. 决策框架
    "learn",       # 21. ELI5
    "learn",       # 22. Feynman 学习法
    "learn",       # 23. PDF chunked 总结
    "biz-life",    # 24. 对比同类产品
    "biz-life",    # 25. App Store description 优化
    "biz-life",    # 26. ASO keyword research
    "content",     # 27. Reddit Show & Tell post
    "content",     # 28. Twitter/X thread
    "content",     # 29. Product Hunt 文案
    "agent",       # 30. Coze/Dify 智能体 prompt 骨架
    "ai-coding",   # 31. Claude Code 项目根 system prompt
    "ai-coding",   # 32. Claude Code 修 bug
    "ai-coding",   # 33. Cursor/Claude Code 实施新功能
    "ai-coding",   # 34. Code review (senior peer)
    "ai-coding",   # 35. Claude Code skill: changelog
    "ai-coding",   # 36. Cursor .cursorrules
    "agent",       # 37. Gemini Antigravity
    "ai-art",      # 38. Nano Banana 人物换装
    "ai-art",      # 39. Nano Banana 多图融合
    "ai-art",      # 40. Nano Banana 产品摄影
    "ai-art",      # 41. ComfyUI 工作流复用
    "ai-art",      # 42. AI 出图反推 prompt
    "agent",       # 43. Coze 智能体起手
    "agent",       # 44. Dify RAG agent
    "agent",       # 45. n8n + LLM
    "agent",       # 46. browser-use / Computer Use
    "ai-video",    # 47. 海螺/Kling 视频脚本
    "ai-video",    # 48. Sora 2 短视频脚本
    "learn",       # 49. LLM 面试题速答
    "learn",       # 50. 对比两个大模型
    "learn",       # 51. 本地部署大模型选型
    "content",     # 52. AI 工具体验测评
    "biz-life",    # 53. AI 副业方向评估
    "content",     # 54. AI 教程视频结构
    "ai-coding",   # 55. DeepSeek-R1 thinking 解读
    "work",        # 56. AI 整理碎片笔记
    "content",     # 57. AI 生成小红书爆款标题
    "ai-art",      # 58. Midjourney 一致性人物
    "ai-art",      # 59. SD WebUI/Forge prompt 结构
    "ai-art",      # 60. AI 头像生成
    "ai-art",      # 61. AI 壁纸生成
    "ai-art",      # 62. ControlNet OpenPose
    "ai-video",    # 63. 可灵 Kling 1.6
    "ai-video",    # 64. 即梦 4.0
    "ai-video",    # 65. Veo 3 长 prompt
    "ai-coding",   # 66. MCP server 设计
    "agent",       # 67. FastGPT/MaxKB
    "agent",       # 68. MetaGPT 多 agent
    "agent",       # 69. Agent 失败模式诊断
    "ai-coding",   # 70. Aider 单 commit 任务
    "ai-coding",   # 71. Continue.dev system prompt
    "ai-coding",   # 72. Trae/Qoder 国产 IDE
    "ai-coding",   # 73. AI 补全代码自我审查
    "biz-life",    # 74. AI 内容创作流水线
    "content",     # 75. ChatGPT 销售文案
    "content",     # 76. AI 评测短文
    "work",        # 77. AI 生成会议纪要
    "work",        # 78. ChatGPT/Claude 写邮件回复
    "biz-life",    # 79. AI 帮我吵架
    "learn",       # 80. AI PDF/长文 → Anki 卡
    "ai-coding",   # 81. AI 重写 commit message
    "ai-coding",   # 82. AI 生成 SQL
    "ai-coding",   # 83. AI 起 PR/MR 描述
    "learn",       # 84. AI 学习路径生成
    "learn",       # 85. Feynman 笔记法 LLM
    "learn",       # 86. 知识点 → mermaid 图
    "content",     # 87. 自媒体选题挖掘
    "content",     # 88. 短视频脚本 Hook 测试
    "content",     # 89. 公众号长文 outline
    "ai-coding",   # 90. 代码迁移 prompt
    "ai-coding",   # 91. API 设计 review
    "ai-coding",   # 92. 数据库 schema 演进
    "ai-coding",   # 93. 性能瓶颈定位
    "biz-life",    # 94. 商业模式画布
    "biz-life",    # 95. AI 分析竞品
    "biz-life",    # 96. 用户访谈半结构化
    "biz-life",    # 97. AI 帮我做菜单
    "biz-life",    # 98. AI 旅行规划器
    "biz-life",    # 99. AI 健身计划
    "biz-life",    # 100. 合同条款风险排查
    "biz-life",    # 101. App 隐私政策
    "biz-life",    # 102. App Store description 重写
    "biz-life",    # 103. AppStoreConnect 提审说明
    "content",     # 104. AI 校对
    "content",     # 105. AI 改写为读起来不累
    "content",     # 106. AI 把照片转文案
    "learn",       # 107. AI 起读书笔记
    "biz-life",    # 108. AI 帮我写求职信
    "biz-life",    # 109. AI 给我做选择
    "work",        # 110. AI 解读图表/数据
    "work",        # 111. Excel 公式/函数
    "biz-life",    # 112. AI 写日语商务邮件
    "content",     # 113. AI 翻译保留语气
]

assert len(CAT_MAP) == 113, f"Need 113 mappings, got {len(CAT_MAP)}"

# 读现有 prompts.js
js_text = Path('prompts.js').read_text(encoding='utf-8')
m = re.search(r'module\.exports\s*=\s*(\[.*\]);?\s*$', js_text, re.DOTALL)
data = json.loads(m.group(1))

# 加 category 字段
for i, prompt in enumerate(data):
    prompt['category'] = CAT_MAP[i]

# 写出主 prompts.js
out = 'module.exports = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
Path('prompts.js').write_text(out, encoding='utf-8')

# 同时写出 categories.js（页面用）
cat_out = 'module.exports = ' + json.dumps(CATEGORIES, ensure_ascii=False, indent=2) + ';\n'
Path('categories.js').write_text(cat_out, encoding='utf-8')

# 统计
from collections import Counter
counts = Counter(CAT_MAP)
print("✅ Updated prompts.js (category field added to 113)")
print("✅ Wrote categories.js (8 大类定义)")
print()
print("分布统计:")
for cat in CATEGORIES:
    print(f"  {cat['icon']} {cat['name']:12s} {counts[cat['id']]:3d} prompts")
print(f"  TOTAL                {sum(counts.values()):3d}")
