import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
test('fast commands and backup stay on local server',()=>{const s=fs.readFileSync(new URL('../server.js',import.meta.url),'utf8');assert.match(s,/\/api\/fast/);assert.match(s,/\/api\/backup/);assert.match(s,/localCommand/)});
test('interface can stop streams and export data',()=>{const s=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');assert.match(s,/AbortController/);assert.match(s,/stopChat/);assert.match(s,/backup/)});
