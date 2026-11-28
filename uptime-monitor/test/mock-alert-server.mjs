import http from 'node:http';
import fs from 'node:fs';
const out = process.argv[2];
http.createServer((req, res) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { fs.appendFileSync(out, new Date().toISOString() + ' ' + req.method + ' ' + b.replace(/"secret":"[^"]*"/, '"secret":"(hidden)"') + '\n'); res.end('{"ok":true}'); }); }).listen(8799);
