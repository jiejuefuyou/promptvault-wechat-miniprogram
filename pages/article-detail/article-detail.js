// pages/article-detail/article-detail.js
Page({
  data: {
    article: null,
    sections: [],  // [{type: 'h2'|'h3'|'p'|'code'|'list'|'table-text', content: '...', }]
  },

  onLoad() {
    const article = wx.getStorageSync('currentArticle');
    if (!article) {
      wx.showToast({ title: '加载失败', icon: 'none' });
      return;
    }
    const sections = this.parseMarkdown(article.body);
    this.setData({ article, sections });
  },

  // 极简 markdown 解析（避免引入大型库 + 不支持复杂格式）
  parseMarkdown(md) {
    const lines = md.split('\n');
    const sections = [];
    let buf = [];
    let inCode = false;
    let codeBuf = [];

    const flushPara = () => {
      if (buf.length > 0) {
        const text = buf.join('\n').trim();
        if (text) sections.push({ type: 'p', content: text });
        buf = [];
      }
    };

    for (const line of lines) {
      // 代码块
      if (line.trim().startsWith('```')) {
        if (inCode) {
          sections.push({ type: 'code', content: codeBuf.join('\n') });
          codeBuf = [];
          inCode = false;
        } else {
          flushPara();
          inCode = true;
        }
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        continue;
      }

      // 标题
      if (line.startsWith('## ')) {
        flushPara();
        sections.push({ type: 'h2', content: line.slice(3).trim() });
        continue;
      }
      if (line.startsWith('### ')) {
        flushPara();
        sections.push({ type: 'h3', content: line.slice(4).trim() });
        continue;
      }
      if (line.startsWith('# ')) {
        flushPara();
        sections.push({ type: 'h1', content: line.slice(2).trim() });
        continue;
      }

      // 引用块
      if (line.startsWith('> ')) {
        flushPara();
        sections.push({ type: 'quote', content: line.slice(2).trim() });
        continue;
      }

      // 分隔线
      if (line.trim() === '---') {
        flushPara();
        sections.push({ type: 'hr', content: '' });
        continue;
      }

      // 表格（简化处理：把整段 table 当 monospace 文本）
      if (line.includes('|') && line.trim().startsWith('|')) {
        flushPara();
        // 跳过分隔行 | --- | --- |
        if (line.match(/^\|[\s-]+\|/)) continue;
        sections.push({ type: 'table-row', content: line.trim() });
        continue;
      }

      // 空行 → 段落分割
      if (line.trim() === '') {
        flushPara();
        continue;
      }

      buf.push(line);
    }
    flushPara();
    if (codeBuf.length > 0) sections.push({ type: 'code', content: codeBuf.join('\n') });

    return sections;
  },

  onShareAppMessage() {
    return {
      title: this.data.article ? `PromptVault: ${this.data.article.title}` : 'PromptVault',
      path: '/pages/articles/articles',
    };
  },
});
