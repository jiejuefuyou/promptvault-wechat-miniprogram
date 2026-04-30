#!/usr/bin/env bash
# PromptVault 微信小程序自动部署 (Mac/Linux/Git Bash)
# 用法:
#   bash deploy.sh                          → 上传体验版
#   bash deploy.sh --preview                → 生成预览二维码
#   bash deploy.sh --version 2026.5.1
#   bash deploy.sh --desc "修复 bug X"

set -e
cd "$(dirname "$0")"

# 加载 .env (如果存在 .secrets/wechat-miniprogram.env)
ENV_FILE="$(realpath ../../.secrets/wechat-miniprogram.env 2>/dev/null || true)"
if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
fi

node deploy.js "$@"
