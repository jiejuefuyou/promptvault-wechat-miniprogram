@echo off
REM PromptVault 微信小程序自动部署 (Windows)
REM 用法：
REM   deploy.bat                          → 上传体验版（默认）
REM   deploy.bat --preview                → 生成预览二维码
REM   deploy.bat --version 2026.5.1       → 指定版本号
REM   deploy.bat --desc "修复 bug X"      → 指定备注

cd /d "%~dp0"
node deploy.js %*
