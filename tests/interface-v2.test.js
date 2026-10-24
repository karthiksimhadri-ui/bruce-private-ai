import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../public/index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../public/style.css',import.meta.url),'utf8');
test('wing emblem and accessible state controls exist',()=>{for(const id of ['coreFrame','responseState','previewListen','resetCore','waveform'])assert.match(html,new RegExp(`id="${id}"`));assert.match(html,/wingMark/)});
test('visual states are backed by chat and speech events',()=>{assert.match(js,/setCoreState\('thinking'\)/);assert.match(js,/u\.onstart=.*speaking/);assert.match(js,/u\.onend=.*idle/);assert.match(js,/Microphone recording locally/)});
test('reduced motion and responsive styles included',()=>{assert.match(css,/prefers-reduced-motion/);assert.match(css,/@media\(max-width:740px\)/)});
