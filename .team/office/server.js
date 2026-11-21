// Agent office: live view of the team. Run: node .team/office/server.js  ->  http://localhost:4747
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'status');
const PORT = 4747;

function snapshot() {
  const agents = {};
  let feed = [];
  try {
    for (const f of fs.readdirSync(DIR)) {
      if (f.endsWith('.json')) {
        try { const r = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); agents[r.agent] = r; } catch (e) {}
      }
    }
    const lines = fs.readFileSync(path.join(DIR, 'feed.jsonl'), 'utf8').trim().split('\n').slice(-120);
    feed = lines.map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
  } catch (e) {}
  return { agents, feed, now: Date.now() };
}

http.createServer((req, res) => {
  if (req.url.startsWith('/api')) {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    return res.end(JSON.stringify(snapshot()));
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
  fs.createReadStream(path.join(__dirname, 'office.html')).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log('Agent office on http://localhost:' + PORT));
