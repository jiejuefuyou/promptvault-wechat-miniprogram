'use strict';

const VARIABLE_PATTERN = /\{\{\s*([^}]+?)\s*\}\}/g;
const ALLOWED_TYPES = { string: true, int: true, multiline: true };
const LIMITS = Object.freeze({
  title: 120,
  body: 12000,
  tags: 12,
  tag: 40,
});

function text(value) {
  return value === undefined || value === null ? '' : String(value);
}

function normalizeText(value) {
  const source = text(value);
  const normalized = typeof source.normalize === 'function' ? source.normalize('NFKD') : source;
  return normalized
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function hashString(value) {
  let hash = 0x811c9dc5;
  const source = text(value);
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

function validId(value) {
  return /^[a-z0-9][a-z0-9._-]{5,95}$/i.test(text(value));
}

function normalizeTags(rawTags) {
  const tags = Array.isArray(rawTags) ? rawTags : [];
  const seen = {};
  const result = [];
  for (let index = 0; index < tags.length; index += 1) {
    const tag = text(tags[index]).trim();
    if (!tag || tag.length > LIMITS.tag || seen[tag]) continue;
    seen[tag] = true;
    result.push(tag);
    if (result.length >= LIMITS.tags) break;
  }
  return result;
}

function normalizedPrompt(raw, options) {
  const source = options && options.source === 'custom' ? 'custom' : 'builtin';
  const index = options && Number.isInteger(options.index) ? options.index : 0;
  const title = text(raw && raw.title).trim();
  const body = text(raw && raw.body).trim();
  if (!title || !body) throw new TypeError(`Prompt ${index + 1} 缺少标题或正文。`);
  if (title.length > LIMITS.title) throw new RangeError(`Prompt ${index + 1} 标题过长。`);
  if (body.length > LIMITS.body) throw new RangeError(`Prompt ${index + 1} 正文过长。`);

  const bodyZh = text(raw && raw.body_zh).trim();
  if (bodyZh.length > LIMITS.body) throw new RangeError(`Prompt ${index + 1} 中文正文过长。`);
  const existingId = raw && validId(raw.id) ? String(raw.id) : '';
  const fingerprint = `${title}\u0000${body}\u0000${bodyZh}`;
  const id = existingId || `${source}-${hashString(fingerprint)}`;

  return Object.freeze({
    id,
    title,
    body,
    body_zh: bodyZh || '',
    tags: Object.freeze(normalizeTags(raw && raw.tags)),
    desc_zh: text(raw && raw.desc_zh).trim().slice(0, 240),
    category: text(raw && raw.category).trim() || 'biz-life',
    createdAt: Number.isFinite(Number(raw && raw.createdAt)) ? Number(raw.createdAt) : 0,
    _custom: source === 'custom',
    _starter: Boolean(raw && raw._starter),
  });
}

function normalizeLibrary(rawPrompts, source) {
  if (!Array.isArray(rawPrompts)) throw new TypeError('Prompt 数据必须是数组。');
  const seenIds = {};
  return Object.freeze(rawPrompts.map((raw, index) => {
    const prompt = normalizedPrompt(raw, { source, index });
    if (seenIds[prompt.id]) throw new Error(`Prompt ID 重复：${prompt.id}`);
    seenIds[prompt.id] = true;
    return prompt;
  }));
}

function createCustomPrompt(input, now, nonce) {
  const timestamp = Number.isFinite(Number(now)) ? Number(now) : Date.now();
  const randomPart = text(nonce) || Math.random().toString(36).slice(2, 10);
  const title = text(input && input.title).trim();
  const body = text(input && input.body).trim();
  const id = `custom-${timestamp.toString(36)}-${hashString(`${randomPart}\u0000${title}\u0000${body}`)}`;
  return normalizedPrompt({
    id,
    title,
    body,
    tags: input && input.tags,
    desc_zh: input && input.desc_zh,
    category: input && input.category,
    createdAt: timestamp,
    _starter: Boolean(input && input._starter),
  }, { source: 'custom', index: 0 });
}

function mergeLibraries(builtins, customs) {
  const result = [];
  const seen = {};
  [builtins || [], customs || []].forEach((group) => {
    group.forEach((prompt) => {
      if (seen[prompt.id]) return;
      seen[prompt.id] = true;
      result.push(prompt);
    });
  });
  return result;
}

function findPrompt(prompts, id) {
  const target = text(id);
  return (prompts || []).find((prompt) => prompt.id === target) || null;
}

function parseVariableToken(rawToken) {
  const raw = text(rawToken).trim();
  const colon = raw.indexOf(':');
  const name = (colon >= 0 ? raw.slice(0, colon) : raw).trim();
  if (!name) return null;

  let type = 'string';
  let defaultValue = null;
  if (colon >= 0) {
    const descriptor = raw.slice(colon + 1).trim();
    const equals = descriptor.indexOf('=');
    const requested = (equals >= 0 ? descriptor.slice(0, equals) : descriptor).trim();
    type = ALLOWED_TYPES[requested] ? requested : 'string';
    if (equals >= 0) defaultValue = descriptor.slice(equals + 1);
  }
  return { name, type, defaultValue, raw };
}

function parseVariables(body) {
  const source = text(body);
  const seen = {};
  const result = [];
  VARIABLE_PATTERN.lastIndex = 0;
  let match;
  while ((match = VARIABLE_PATTERN.exec(source)) !== null) {
    const variable = parseVariableToken(match[1]);
    if (!variable || seen[variable.name]) continue;
    seen[variable.name] = true;
    result.push({
      name: variable.name,
      type: variable.type,
      defaultValue: variable.defaultValue,
      value: variable.defaultValue === null ? '' : variable.defaultValue,
      index: result.length,
    });
  }
  return result;
}

function valuesFromVariables(variables) {
  const values = {};
  (variables || []).forEach((variable) => {
    values[variable.name] = text(variable.value);
  });
  return values;
}

function renderPrompt(body, values) {
  const source = text(body);
  const suppliedValues = values || {};
  VARIABLE_PATTERN.lastIndex = 0;
  return source.replace(VARIABLE_PATTERN, (placeholder, token) => {
    const variable = parseVariableToken(token);
    if (!variable) return placeholder;
    const supplied = Object.prototype.hasOwnProperty.call(suppliedValues, variable.name)
      ? text(suppliedValues[variable.name])
      : '';
    if (supplied.length > 0) {
      return variable.type === 'multiline' ? supplied.replace(/\\n/g, '\n') : supplied;
    }
    if (variable.defaultValue !== null) return variable.defaultValue;
    return placeholder;
  });
}

function bodyForLanguage(prompt, language) {
  if (language === 'zh' && prompt && prompt.body_zh) return prompt.body_zh;
  return prompt ? prompt.body : '';
}

function variablesForLanguage(prompt, language, previousVariables) {
  const previous = valuesFromVariables(previousVariables || []);
  return parseVariables(bodyForLanguage(prompt, language)).map((variable) => ({
    ...variable,
    value: Object.prototype.hasOwnProperty.call(previous, variable.name)
      ? previous[variable.name]
      : variable.value,
  }));
}

function searchPrompts(prompts, query) {
  const normalized = normalizeText(query);
  if (!normalized) return (prompts || []).slice();
  const terms = normalized.split(' ').filter(Boolean);
  return (prompts || []).filter((prompt) => {
    const document = normalizeText([
      prompt.title,
      prompt.desc_zh,
      prompt.body,
      prompt.body_zh,
      (prompt.tags || []).join(' '),
    ].join(' '));
    return terms.every((term) => document.indexOf(term) >= 0);
  });
}

function duplicateContent(prompts, candidate, exceptId) {
  const title = normalizeText(candidate.title);
  const body = normalizeText(candidate.body);
  return (prompts || []).some((prompt) =>
    prompt.id !== exceptId
      && normalizeText(prompt.title) === title
      && normalizeText(prompt.body) === body
  );
}

module.exports = Object.freeze({
  LIMITS,
  bodyForLanguage,
  createCustomPrompt,
  duplicateContent,
  findPrompt,
  hashString,
  mergeLibraries,
  normalizeLibrary,
  normalizeText,
  normalizedPrompt,
  parseVariableToken,
  parseVariables,
  renderPrompt,
  searchPrompts,
  valuesFromVariables,
  variablesForLanguage,
});
