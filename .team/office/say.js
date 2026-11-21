#!/usr/bin/env node
// Usage: node .team/office/say.js <agent> <state> "<message>"
// state: assigned | thinking | reading | working | testing | waiting | done | blocked
// "assigned" also stores the message as the agent's current task.
const fs = require('fs');
const path = require('path');
const [agent, state, ...rest] = process.argv.slice(2);
if (!agent || !state) { console.error('usage: say.js <agent> <state> "<message>"'); process.exit(1); }
const msg = rest.join(' ');
const dir = path.join(__dirname, '..', 'status');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, agent.toLowerCase() + '.json');
let prev = {};
try { prev = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) {}
const now = Date.now();
const rec = {
  agent: agent.toLowerCase(),
  state,
  msg,
  task: state === 'assigned' ? msg : (prev.task || ''),
  since: prev.state === state ? (prev.since || now) : now,
  ts: now,
  steps: (prev.steps || 0) + 1,
};
fs.writeFileSync(file, JSON.stringify(rec));
fs.appendFileSync(path.join(dir, 'feed.jsonl'), JSON.stringify({ agent: rec.agent, state, msg, ts: now }) + '\n');
console.log('ok');
