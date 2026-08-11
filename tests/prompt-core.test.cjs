const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../utils/prompt-core.js');

test('normalizes built-in and custom prompts with bounded tags', () => {
  const [builtIn] = core.normalizeLibrary([
    { title: ' A ', body: ' Body ', body_zh: ' 中文 ', tags: ['x', 'x', '', ' y '] },
  ], 'builtin');
  const custom = core.createCustomPrompt({ title: 'Mine', body: 'Text', tags: ['custom'] }, 1234, 'seed');

  assert.match(builtIn.id, /^builtin-/);
  assert.deepEqual(builtIn.tags, ['x', 'y']);
  assert.equal(builtIn.body_zh, '中文');
  assert.match(custom.id, /^custom-/);
  assert.equal(custom._custom, true);
  assert.equal(custom.createdAt, 1234);
});

test('rejects missing and oversized prompt content', () => {
  assert.throws(() => core.normalizeLibrary([{ title: '', body: 'x' }], 'builtin'), /缺少标题或正文/);
  assert.throws(() => core.createCustomPrompt({
    title: 'x',
    body: 'a'.repeat(core.LIMITS.body + 1),
  }, 1, 'x'), /正文过长/);
});

test('parses typed variables, defaults, whitespace, and first occurrence wins', () => {
  const variables = core.parseVariables('{{ count:int=5 }} {{notes:multiline=}} {{name:other=Sam}} {{count:string=8}}');
  assert.deepEqual(variables.map(({ name, type, defaultValue, value }) => ({ name, type, defaultValue, value })), [
    { name: 'count', type: 'int', defaultValue: '5', value: '5' },
    { name: 'notes', type: 'multiline', defaultValue: '', value: '' },
    { name: 'name', type: 'string', defaultValue: 'Sam', value: 'Sam' },
  ]);
});

test('renders by bare variable name and preserves unresolved placeholders', () => {
  const body = 'Count {{count:int=5}}\nTopic {{ topic }}\nNotes {{notes:multiline=}}';
  const rendered = core.renderPrompt(body, { count: '3', topic: '', notes: 'one\\ntwo' });
  assert.equal(rendered, 'Count 3\nTopic {{ topic }}\nNotes one\ntwo');
});

test('language switch recomputes variables and preserves shared values', () => {
  const [prompt] = core.normalizeLibrary([{
    title: 'Bilingual',
    body: 'English {{topic}} {{englishOnly}}',
    body_zh: '中文 {{topic}} {{count:int=2}}',
  }], 'builtin');
  const english = core.variablesForLanguage(prompt, 'en', []);
  english[0].value = 'cats';
  const chinese = core.variablesForLanguage(prompt, 'zh', english);

  assert.deepEqual(chinese.map((v) => [v.name, v.value]), [['topic', 'cats'], ['count', '2']]);
  assert.equal(core.renderPrompt(core.bodyForLanguage(prompt, 'zh'), core.valuesFromVariables(chinese)), '中文 cats 2');
});

test('search is multi-term, diacritic-insensitive and CJK-safe', () => {
  const prompts = core.normalizeLibrary([
    { title: 'Résumé review', body: 'Improve a CV', tags: ['Career'] },
    { title: '中文周报', body: '生成工作总结', tags: ['效率'] },
  ], 'builtin');

  assert.deepEqual(core.searchPrompts(prompts, 'resume career').map((p) => p.title), ['Résumé review']);
  assert.deepEqual(core.searchPrompts(prompts, '中文 效率').map((p) => p.title), ['中文周报']);
});

test('duplicateContent ignores the edited record but detects another exact prompt', () => {
  const first = core.createCustomPrompt({ title: 'Same', body: 'Body' }, 1, 'a');
  const second = core.createCustomPrompt({ title: 'Same', body: 'Body' }, 2, 'b');
  assert.equal(core.duplicateContent([first], first, first.id), false);
  assert.equal(core.duplicateContent([first], second, ''), true);
});
