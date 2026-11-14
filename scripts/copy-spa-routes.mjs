import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist/cafe_mokatta_frontend/browser');
const indexFile = resolve(distDir, 'index.html');

if (!existsSync(indexFile)) {
  console.error(`No se encontró ${indexFile}. Ejecuta primero el build de Angular.`);
  process.exit(1);
}

// Copia index.html a 404.html y a cada subruta Angular para que GitHub Pages responda HTTP 200 OK
const spaRoutes = [
  'login',
  'dashboard',
  'inventory',
  'products',
  'order',
  'reports',
  'users',
];

copyFileSync(indexFile, resolve(distDir, '404.html'));

for (const route of spaRoutes) {
  const routeDir = resolve(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexFile, resolve(routeDir, 'index.html'));
}

console.log(`Rutas SPA copiadas en ${distDir}: 404.html y ${spaRoutes.length} subrutas.`);
