#!/usr/bin/env node
/** Build to Website_preview (unlocked folder) when Website/ is locked on Windows. */
import { execSync } from 'child_process';
process.env.ELEVENTY_OUTPUT = 'Website_preview';
const cwd = process.cwd();
execSync('node scripts/clean.mjs', { stdio: 'inherit', cwd, env: process.env });
execSync('npx @11ty/eleventy', { stdio: 'inherit', cwd, env: process.env });
console.log('\nServe preview: npx serve Website_preview -l 3000');
