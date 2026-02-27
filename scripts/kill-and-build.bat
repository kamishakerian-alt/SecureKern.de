@echo off
REM Killt node/http-server/serve (löst Locks), dann clean + eleventy. Nur Windows.
taskkill /F /IM node.exe 2>nul
taskkill /F /IM http-server.exe 2>nul
taskkill /F /IM serve.exe 2>nul
node scripts/clean.mjs
npx @11ty/eleventy
