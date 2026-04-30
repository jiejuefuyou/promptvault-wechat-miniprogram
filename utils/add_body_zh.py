"""
add_body_zh.py - 给纯英文 body 的 prompt 加 body_zh 中文版
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

def has_chinese(s):
    return any('一' <= c <= '鿿' for c in s)

# 读现有 prompts.js
text = Path('prompts.js').read_text(encoding='utf-8')
m = re.search(r'module\.exports\s*=\s*(\[.*\]);?\s*$', text, re.DOTALL)
data = json.loads(m.group(1))

# 25 条英文 body 的中文翻译（按 prompts.js 中出现顺序）
ZH_TRANSLATIONS = {
    "Translate to natural English": "把下面这段话翻译成自然流畅的英文，可以给 native speaker 看的那种。保留专业术语；任何让 native 听着别扭的句子都要重写。\n\n{{text}}",
    "Summarize a long article in 5 bullets": "把下面这篇文章总结成 5 个要点，结尾再写 1 句最重要的 takeaway。\n\n{{article}}",
    "Explain code in plain English": "用通俗易懂的中文解释这段代码，逐行讲，让初级工程师能看懂。然后列出你注意到的微妙 bug 或边界情况。\n\n```\n{{code}}\n```",
    "Refactor for readability": "重构这段代码让它更易读。行为保持不变。优先用命名清晰的函数代替注释。只输出重构后的代码；非显然的设计决策在代码后面用 1-2 行简短解释。\n\n```\n{{code}}\n```",
    "Write a unit test for this function": "用 {{language}} 给下面这个函数写单元测试。覆盖：正常路径 + 2 个边界情况 + 1 个错误情况。用项目现有的测试框架。\n\n```\n{{function}}\n```",
    "Code review like a senior": "用资深工程师的视角审查这段代码，找出真正的问题——不要鸡毛蒜皮的 lint。重点：设计 / 边界 bug / 性能 / 安全 / 可维护性。\n\n```\n{{code}}\n```",
    "ComfyUI workflow troubleshoot": "我的 ComfyUI 工作流报错了。错误信息：{{error}}。工作流截图描述：{{workflow_desc}}。可能原因？怎么定位？",
    "邮件起草（专业语气）": "起草一封专业语气的英文邮件。\n\n收件人: {{recipient}}\n场景: {{context}}\n核心诉求: {{ask}}\n语气: 专业 + 礼貌 + 不卑不亢\n\n输出 1 个完整邮件 (含 subject + greeting + body + sign-off)。",
    "Brainstorm 10 angles": "围绕这个想法头脑风暴 10 个完全不同的角度：{{idea}}。每个角度 1 句话，互相不重复。",
    "Job description → resume bullets": "把下面这段 JD 翻译成简历的成就要点（量化数字 + 强动词）：\n\n{{jd}}",
    "Daily standup helper": "帮我准备今天的晨会分享。\n\n昨天我做了：{{yesterday}}\n今天我打算做：{{today}}\n阻塞我的事：{{blockers}}\n\n输出 3 段简洁可口语化的英文。",
    "ELI5 — explain like I'm 5": "用 5 岁小孩能听懂的方式解释这个概念：{{concept}}。用类比，不用专业术语。",
    "ASO keyword research": "我有一款 App，描述如下：{{app_description}}。帮我找 10-20 个适合 ASO 优化的关键词，按搜索量 × 竞争度排序。",
    "Reddit Show & Tell post": "我做了一个产品：{{product}}。帮我写一个 Reddit r/SideProject 的 Show & Tell 帖子，要点：(1) 不像广告 (2) 真实开发故事 (3) 对其他 indie 有用 (4) 文末留个开放问题让人评论。",
    "Twitter/X thread builder": "把下面这个想法写成 Twitter thread (8-10 条)：{{topic}}。第 1 条是钩子，2-9 条干货，第 10 条 CTA。每条 240 字符内。",
    "Claude Code 项目根 system prompt": "我的项目是 {{project_type}}，技术栈 {{tech_stack}}，团队 {{team_size}} 人。帮我写一份 Claude Code 用的 CLAUDE.md 项目根 system prompt，覆盖：(1) 风格偏好 (2) 测试要求 (3) commit 规范 (4) 不要做的事。",
    "Nano Banana 人物换装": "用 Nano Banana 把图中人物换成 {{outfit}} 装扮。保持脸型、发型、姿势完全一致。背景：{{background}}。",
    "Nano Banana 多图融合（背景换人）": "用 Nano Banana：图 A 是背景（{{bg_desc}}），图 B 是人物（{{person_desc}}）。把人物自然融合到背景，光线匹配，比例合理。",
    "Nano Banana 产品摄影": "用 Nano Banana 给我的产品 {{product}} 出一组电商风格商业摄影。要求：白底 / 45 度俯角 / 柔光 / 突出材质。3 个不同角度。",
    "browser-use / Computer Use 任务模板": "用 browser-use（或 Anthropic Computer Use）让 AI 帮我完成这个任务：{{task}}。详细步骤分解：1. ... 2. ... 失败时如何 retry？需要哪些权限？",
    "Midjourney 一致性人物模板": "用 Midjourney 生成一个角色，特征：{{features}}（性别 / 年龄 / 发型 / 服装）。用 --cref 锁定人物，--cw 100。生成 6 个不同场景：办公室 / 户外 / 卧室 / 健身房 / 咖啡馆 / 海边。",
    "SD WebUI / Forge 通用 prompt 结构": "用 Stable Diffusion (WebUI / Forge) 出图。Positive prompt 结构：(主体 + 动作), (风格), (镜头 + 灯光), (画质强化词)。Negative prompt: low quality, blurry, deformed。Sampler: DPM++ 2M Karras, Steps 30。\n\n主体: {{subject}}\n风格: {{style}}",
    "AI 头像生成（社媒用）": "帮我生成 5 个适合 {{platform}}（如知乎/即刻/LinkedIn）的头像 prompt，风格：{{style}}（如简约/拟物/动漫）。每个 prompt 详细到可以直接喂 Midjourney/SD。",
    "AI 壁纸生成（手机锁屏）": "生成一张 {{theme}} 主题的手机锁屏壁纸 prompt。规格：竖屏 9:16, 4K, 适合 OLED 屏（深色为主以省电）, 中心留时间显示空间。",
    "Veo 3 长 prompt（含同步音轨）": "用 Veo 3 生成一段视频。\n\n场景: {{scene}}\n时长: {{duration}}\n运镜: {{camera}}\n音轨: 同步 {{audio_style}} (如「轻快电子乐 + 鸟叫」)\n物理: 真实物理（重力 / 光影）\n\n输出 1 个完整 prompt + 2 个备选风格变体。",
}

print(f"Translation dict has {len(ZH_TRANSLATIONS)} entries")

added = 0
skipped_already_zh = 0
not_found_in_dict = []

for prompt in data:
    if has_chinese(prompt['body']):
        # 中文 body：body_zh = body 本身
        prompt['body_zh'] = prompt['body']
        skipped_already_zh += 1
    else:
        # 纯英文 body：用字典找翻译
        if prompt['title'] in ZH_TRANSLATIONS:
            prompt['body_zh'] = ZH_TRANSLATIONS[prompt['title']]
            added += 1
        else:
            not_found_in_dict.append(prompt['title'])

print(f"✅ added body_zh translations: {added}")
print(f"   skipped (body already Chinese): {skipped_already_zh}")
if not_found_in_dict:
    print(f"⚠️  English body without translation:")
    for t in not_found_in_dict:
        print(f"     - {t[:60]}")

# 写回
out = 'module.exports = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
Path('prompts.js').write_text(out, encoding='utf-8')
print(f"\n✅ Wrote prompts.js ({len(out)} chars)")
