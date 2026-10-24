import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('app assets and docs exist',()=>{for(const f of ['server.js','public/index.html','public/app.js','public/style.css','AGENTS.md','docs/ARCHITECTURE.md'])assert.ok(fs.existsSync(new URL('../'+f,import.meta.url)))});
test('private listener by default',()=>{const s=fs.readFileSync(new URL('../server.js',import.meta.url),'utf8');assert.match(s,/127\.0\.0\.1/);assert.match(s,/OLLAMA_URL/)});
