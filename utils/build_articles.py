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
        "title": "AI 商业化的图穷匕见周",
        "summary": "GitHub Copilot 改按用量计费 + MSFT-OpenAI 分手 + 开源社区一周 3 个 Claude Code 替代方案登 trending — 一周看完",
        "date": "2026-04-30",
        "tags": ["周报", "AI 商业化", "Claude Code"],
        "category": "industry",
    },
    {
        "id": "zhihu-1",
        "type": "deep-dive",
        "file": "zhihu-1-web-edition-zh.md",
        "title": "iOS 等审核 36 小时，我用 90 分钟做了网页版",
        "summary": "iOS 审核 ≠ 停下来。多 surface 出货策略实战 — 同一份数据 5 个壳。",
        "date": "2026-04-30",
        "tags": ["独立开发", "Multi-surface", "iOS"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-2",
        "type": "deep-dive",
        "file": "zhihu-2-state-yml-zh.md",
        "title": "state.yml — 让 AI agent 不失忆的关键文件",
        "summary": "150 行 state.yml 让 agent 跨 5 小时 token window 重新进来时 ~500 token 拉满 context。",
        "date": "2026-04-30",
        "tags": ["AI Agent", "Claude Code", "Productivity"],
        "category": "ai-agent",
    },
    {
        "id": "zhihu-3",
        "type": "deep-dive",
        "file": "zhihu-3-memory-layers-zh.md",
        "title": "Claude Code memory layer 实战",
        "summary": "4 个 markdown 文件让 AI agent 跨 session 不失忆。每天省 1+ 小时人时间。",
        "date": "2026-04-30",
        "tags": ["AI Agent", "Memory", "Productivity"],
        "category": "ai-agent",
    },
    {
        "id": "zhihu-4",
        "type": "deep-dive",
        "file": "zhihu-4-decisions-md-zh.md",
        "title": "decisions.md 取代 Linear ticket",
        "summary": "单人/小团队为什么 Linear 是 over-engineering。append-only markdown 的反共识方法论。",
        "date": "2026-04-30",
        "tags": ["Productivity", "Solo dev"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-5",
        "type": "deep-dive",
        "file": "zhihu-5-verify-all-zh.md",
        "title": "200 行 bash 帮我抓住 32 项 Apple 上架前的坑",
        "summary": "iOS 独立开发者的提交前 lint。每年节省 4-24 小时。",
        "date": "2026-04-30",
        "tags": ["iOS", "fastlane", "ASC"],
        "category": "indie-dev",
    },
    {
        "id": "zhihu-6",
        "type": "deep-dive",
        "file": "zhihu-6-xhs-sniff-zh.md",
        "title": "90 秒抓出小红书收藏：browser-as-signer 反直觉路径",
        "summary": "3 次失败 + 1 次成功。Playwright + page.evaluate 让浏览器替你签名。",
        "date": "2026-04-30",
        "tags": ["Scraping", "Playwright", "API"],
        "category": "engineering",
    },
    {
        "id": "zhihu-7",
        "type": "deep-dive",
        "file": "zhihu-7-data-as-product-zh.md",
        "title": "你的产品其实是 data 文件，App 只是壳",
        "summary": "多 surface 出货的底层心智模型。一份 50KB JSON 跑 5 个 surface 的实证。",
        "date": "2026-04-30",
        "tags": ["产品", "架构", "Multi-surface"],
        "category": "indie-dev",
    },
]

# 4 大类 article category
ARTICLE_CATS = [
    {"id": "all",         "icon": "📰", "name": "全部"},
    {"id": "industry",    "icon": "📊", "name": "行业周报"},
    {"id": "indie-dev",   "icon": "🚀", "name": "独立开发"},
    {"id": "ai-agent",    "icon": "🤖", "name": "AI Agent"},
    {"id": "engineering", "icon": "⚙️", "name": "工程实战"},
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
