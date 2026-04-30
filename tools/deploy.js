// deploy.js — 全自动上传 PromptVault 微信小程序
//
// 用法:
//   node tools/deploy.js [--version 1.0.0] [--desc "更新内容"] [--preview]
//
// --preview 模式：生成体验二维码（不算 release）
// 默认模式：上传体验版（在小程序后台 → 版本管理 → 开发版本 看到）
//
// 用户做的事：
//   1. 关掉公众平台 IP 白名单（一次性，30 秒）
//      https://mp.weixin.qq.com → 开发管理 → 开发设置 → 小程序代码上传 → 关
//      OR 把这台机器 IP 加白名单
//   2. 下载 .key 文件（一次性，5 秒）
//      同一页面 → 生成密钥 → 下载到 .secrets/wechat-mp-private.key
//   3. 让 CC 跑这个脚本（CC 自动 commit + 上传）
//   4. 在公众平台 → 开发管理 → 版本管理 → 开发版本里点 "提交审核"（API 不开放，必人工 1 click）
//   5. 审核通过后 → 同页 → 点 "发布"（同样必人工 1 click）
//
// 后续每次更新只需 (3) (4) (5) 三步 — 其中 (3) 也由 CC 自动跑。

const ci = require('miniprogram-ci');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
function getArg(name, defaultVal) {
  const idx = args.indexOf('--' + name);
  return idx >= 0 ? args[idx + 1] : defaultVal;
}
function hasFlag(name) {
  return args.includes('--' + name);
}

const APPID = process.env.WECHAT_APPID || 'wx5e6385594acd4f7e';
const KEY_PATH = process.env.WECHAT_KEY_PATH ||
  path.resolve(__dirname, '../../.secrets/wechat-mp-private.key');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const VERSION = getArg('version', getDefaultVersion());
const DESC = getArg('desc', `Auto-deploy ${new Date().toISOString().slice(0, 10)}`);
const PREVIEW = hasFlag('preview');

function getDefaultVersion() {
  // Auto-bump patch version based on current date
  const d = new Date();
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

async function main() {
  console.log('🚀 PromptVault 微信小程序自动部署');
  console.log('   AppID:', APPID);
  console.log('   Version:', VERSION);
  console.log('   Desc:', DESC);
  console.log('   Mode:', PREVIEW ? 'Preview (体验码)' : 'Upload (体验版)');
  console.log('   Project:', PROJECT_ROOT);
  console.log();

  if (!fs.existsSync(KEY_PATH)) {
    console.error('❌ 找不到私钥文件:', KEY_PATH);
    console.error('');
    console.error('请：');
    console.error('1. 浏览器打开 https://mp.weixin.qq.com');
    console.error('2. 登录后 → 开发管理 → 开发设置');
    console.error('3. 找到「小程序代码上传」模块 → 点「生成」');
    console.error('4. 下载 .key 文件 → 保存到:', KEY_PATH);
    console.error('5. 同页面把「IP 白名单」关掉（或加你的 IP）');
    console.error('6. 重新跑这个脚本');
    process.exit(1);
  }

  const project = new ci.Project({
    appid: APPID,
    type: 'miniProgram',
    projectPath: PROJECT_ROOT,
    privateKeyPath: KEY_PATH,
    ignores: ['node_modules/**/*', '.secrets/**/*', 'tools/**/*'],
  });

  if (PREVIEW) {
    // Preview 模式：生成体验二维码
    const qrPath = path.resolve(__dirname, '../preview-qr.jpg');
    const result = await ci.preview({
      project,
      desc: DESC,
      setting: {
        es6: true,
        es7: true,
        minify: true,
        autoPrefixWXSS: true,
      },
      qrcodeFormat: 'image',
      qrcodeOutputDest: qrPath,
      onProgressUpdate: console.log,
    });
    console.log();
    console.log('✅ 预览二维码生成成功:', qrPath);
    console.log('   微信扫一扫即可体验');
    console.log('   subPackageInfo:', JSON.stringify(result.subPackageInfo || []));
  } else {
    // Upload 模式：正式上传体验版
    const result = await ci.upload({
      project,
      version: VERSION,
      desc: DESC,
      setting: {
        es6: true,
        es7: true,
        minify: true,
        autoPrefixWXSS: true,
      },
      onProgressUpdate: console.log,
    });
    console.log();
    console.log('✅ 上传成功！');
    console.log('   subPackageInfo:', JSON.stringify(result.subPackageInfo || []));
    console.log();
    console.log('=== 你接下来 2 步操作（必须人工，API 不开放）===');
    console.log('1. https://mp.weixin.qq.com → 管理 → 版本管理 → 开发版本');
    console.log('   找到刚上传的版本 → 点「提交审核」（填 1 行备注）');
    console.log('2. 审核通过后（1-3 天）→ 同页面 → 点「发布」');
    console.log();
    console.log('每次重新跑这个脚本 = 跳过手动开 IDE + 手动选项目 + 手动点上传。');
  }
}

main().catch(err => {
  console.error('❌ 部署失败:', err.message || err);
  if (err.errCode) console.error('   errCode:', err.errCode);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
