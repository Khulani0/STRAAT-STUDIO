// Tiny static server for dist/, used by the test scripts. Not part of the site.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
export function serve(port = 4399, root = 'dist') {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(root, p);
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); const n = path.join(root, '404.html'); return res.end(fs.existsSync(n) ? fs.readFileSync(n) : 'not found'); }
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}
export const pages = ['/', '/websites/', '/enquiry-system/', '/prices/', '/examples/', '/examples/fazilas-kitchen/', '/examples/thandeka-hair-studio/', '/examples/ndlovu-electrical/', '/how-it-works/', '/about/', '/contact/', '/websites-for-electricians/', '/websites-for-plumbers/', '/websites-for-salons/', '/websites-for-home-bakers/', '/privacy/', '/terms/', '/paia-manual/', '/404.html'];
export const chrome = '/usr/bin/google-chrome';
