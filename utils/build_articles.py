"""
build_articles.py - 把 reports/ 下的 8 篇文章提取成 articles.js
用户:在 wechat-miniprogram/utils/ 下跑
"""
import json
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

REPORTS = Path(__file__).resolve().parent.parent.parent / "reports"
print(f"读取 reports from: {REPORTS}")
assert REPORTS.exists(), f"找不到 {REPORTS}"

# 8 篇文章配置（每篇手写元数据）
ARTICLES_META = [
    {
        "id": "newsletter-1",
        "type": "newsletter",
        "file": "newsletter-zh-issue-1-2026-04-30.md",
        "title": "这一周 AI 圈三件大事，你 5 分钟看完",
        "summary": "GitHub Copilot 改按用量收钱了 / 微软 OpenAI 撕了 / 开源社区一周冒出 3 个 Claude Code 替代品。背后到底什么信号？给你 5 条对策。",
        "date": "2026-04-30",
        "tags": ["周报", "AI 商业化", "Claude Code"],
        "category": "industry",
    },
    {
        "id": "zhihu-1",
        "type": "deep-dive",
        "file": "zhihu-1-web-edition-zh.md",
        "title": "等 Apple 审核太慢？我 90 分钟搞了个网页版",
        "summary": "iOS 审核要等 36 小时，我没干等——把同一个 App 直接铺到了 5 个端：iOS / 网页 / Chrome / VSCode / 微信小程序。怎么做到的？",
        "date": "2026-04-30",
        "tags": ["独立开发", "Multi-surface", "iOS"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-2",
        "type": "deep-dive",
        "file": "zhihu-2-state-yml-zh.md",
        "title": "让 AI 不失忆的 1 个文件：state.yml",
        "summary": "Claude Code 每次开新 session 都把你当陌生人？150 行 yml 文件让它 5 秒拉满上下文。AI 长期协作的关键 trick。",
        "date": "2026-04-30",
        "tags": ["AI Agent", "Claude Code", "Productivity"],
        "category": "ai-agent",
    },
    {
        "id": "zhihu-3",
        "type": "deep-dive",
        "file": "zhihu-3-memory-layers-zh.md",
        "title": "用 4 个 md 文件，让你的 AI 助手有记忆",
        "summary": "你天天和 ChatGPT/Claude 重复教它你是谁？这套 memory layer 让它跨 session 记住你。每天省 1 小时不夸张。",
        "date": "2026-04-30",
        "tags": ["AI Agent", "Memory", "Productivity"],
        "category": "ai-agent",
    },
    {
        "id": "zhihu-4",
        "type": "deep-dive",
        "file": "zhihu-4-decisions-md-zh.md",
        "title": "我把 Linear 卸了，换成 1 个 markdown 文件",
        "summary": "单人/小团队用 Linear 真不如 append-only markdown。3 个月后看自己的代码不再问'当时为啥这么写'。反共识但好用。",
        "date": "2026-04-30",
        "tags": ["Productivity", "Solo dev"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-5",
        "type": "deep-dive",
        "file": "zhihu-5-verify-all-zh.md",
        "title": "App 提审前总踩坑？200 行脚本帮你查 32 项",
        "summary": "fastlane 上传 12 分钟才告诉你 keywords 超长……写个 bash 一次跑完所有 ASC 检查。一年帮我省 4-24 小时不冤枉。",
        "date": "2026-04-30",
        "tags": ["iOS", "fastlane", "ASC"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-6",
        "type": "deep-dive",
        "file": "zhihu-6-xhs-sniff-zh.md",
        "title": "90 秒搞定小红书收藏抓取，最后那招特别绝",
        "summary": "试了 3 种方法都被签名挡住，最后想通了：让浏览器自己替我签！代码也就 80 行。这个路子还能用在抖音/B 站。",
        "date": "2026-04-30",
        "tags": ["Scraping", "Playwright", "API"],
        "category": "engineering",
    },
    {
        "id": "zhihu-7",
        "type": "deep-dive",
        "file": "zhihu-7-data-as-product-zh.md",
        "title": "你以为在做 App，其实你的产品是那个 JSON 文件",
        "summary": "我做 PromptVault 的最大顿悟：113 条 prompt 才是产品，App 只是 5 个壳之一。这个心智模型让多 surface 出货成本接近 0。",
        "date": "2026-04-30",
        "tags": ["产品", "架构", "Multi-surface"],
        "category": "indie-dev",
    },
]

# 4 大类 article category
ARTICLE_CATS = [
    {"id": "all",         "icon": "📰", "name": "全部"},
    {"id": "industry",    "icon": "📊", "name": "圈内事"},
    {"id": "indie-dev",   "icon": "🚀", "name": "我自己折腾"},
    {"id": "ai-agent",    "icon": "🤖", "name": "AI 帮干活"},
    {"id": "engineering", "icon": "⚙️", "name": "技术骚操作"},
]


def extract_body(md_path: Path, max_chars: int = 6000) -> str:
    """提取 markdown 正文（去 frontmatter / 截断）"""
    text = md_path.read_text(encoding="utf-8")
    # 移除前置 H1 标题（articles.wxml 已用 article.title）
    text = re.sub(r'^#\s+.+\n', '', text, count=1, flags=re.MULTILINE)
    text = text.strip()
    if len(text) > max_chars:
        text = text[:max_chars] + "\n\n... (内容过长截断，完整版见 GitHub: jiejuefuyou/autoapp-toolkit)"
    return text


def main():
    articles = []
    for meta in ARTICLES_META:
        md_path = REPORTS / meta["file"]
        if not md_path.exists():
            print(f"⚠️  跳过 {meta['file']} (找不到)")
            continue
        body = extract_body(md_path)
        articles.append({
            "id": meta["id"],
            "type": meta["type"],
            "title": meta["title"],
            "summary": meta["summary"],
            "body": body,
            "date": meta["date"],
            "tags": meta["tags"],
            "category": meta["category"],
        })
        print(f"✅ {meta['id']}: {meta['title']} ({len(body)} chars)")

    out = "module.exports = " + json.dumps({
        "categories": ARTICLE_CATS,
        "articles": articles,
    }, ensure_ascii=False, indent=2) + ";\n"
    (Path(__file__).parent / "articles.js").write_text(out, encoding="utf-8")
    total_size = sum(len(a["body"]) for a in articles)
    print(f"\n✅ Wrote articles.js")
    print(f"   {len(articles)} articles · {total_size} body chars · file ~{len(out)//1024} KB")


if __name__ == "__main__":
    main()
