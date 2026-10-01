import http from 'http';
import fs   from 'fs';
import path  from 'path';
import os    from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8080;
const FILE = path.join(__dirname, 'tv-display.html');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/tv-display.html') {
    fs.readFile(FILE, (err, data) => {
      if (err) { res.writeHead(404); res.end('No encontrado'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    res.writeHead(404); res.end('No encontrado');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = [];
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces) {
      if (iface.family === 'IPv4' && !iface.internal) ips.push(iface.address);
    }
  }

  console.log('\n\x1b[1m════════════════════════════════════════\x1b[0m');
  console.log('\x1b[1m  WOD TV — Servidor local activo\x1b[0m');
  console.log('\x1b[1m════════════════════════════════════════\x1b[0m');
  console.log('\n  Abre en el \x1b[1mmóvil\x1b[0m (misma WiFi):');
  ips.forEach(ip => console.log(`  \x1b[36m→ http://${ip}:${PORT}/tv-display.html\x1b[0m`));
  console.log('\n  Pulsa \x1b[1mCtrl+C\x1b[0m para detener');
  console.log('\x1b[1m════════════════════════════════════════\x1b[0m\n');
});
