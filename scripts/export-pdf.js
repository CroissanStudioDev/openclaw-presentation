#!/usr/bin/env node
/**
 * Export Reveal.js presentation to PDF using Decktape
 * 
 * Usage: node export-pdf.js <input.html> [output.pdf]
 * 
 * Requires: npm install -g decktape
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inputFile = args[0] || 'presentation.html';
const outputFile = args[1] || inputFile.replace('.html', '.pdf');

const PORT = 9876 + Math.floor(Math.random() * 100);
const DIR = process.cwd();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.json': 'application/json'
};

// Simple static file server
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  let filePath = path.join(DIR, url === '/' ? inputFile : url);
  const ext = path.extname(filePath).toLowerCase();
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

async function main() {
  // Check if decktape is installed
  const decktapePath = process.env.DECKTAPE_PATH || 'decktape';
  
  // Start server
  await new Promise((resolve, reject) => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      resolve();
    });
    server.on('error', reject);
  });
  
  const url = `http://localhost:${PORT}/${inputFile}`;
  const outputPath = path.resolve(outputFile);
  
  console.log(`Exporting: ${inputFile} → ${outputFile}`);
  console.log(`URL: ${url}`);
  
  // Run decktape
  const decktapeArgs = [
    'reveal',
    '--size', '1280x720',
    '--pause', '500',
    '--chrome-arg=--no-sandbox',
    '--chrome-arg=--disable-setuid-sandbox',
    '--chrome-arg=--disable-dev-shm-usage',
    '--pdf-author', 'Croissan Studio',
    url,
    outputPath
  ];
  
  console.log(`Running: decktape ${decktapeArgs.join(' ')}`);
  
  const decktape = spawn(decktapePath, decktapeArgs, {
    stdio: 'inherit'
  });
  
  await new Promise((resolve, reject) => {
    decktape.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Decktape exited with code ${code}`));
      }
    });
    decktape.on('error', (err) => {
      if (err.code === 'ENOENT') {
        console.error('\nError: decktape not found');
        console.error('Install it with: npm install -g decktape');
        reject(new Error('decktape not installed'));
      } else {
        reject(err);
      }
    });
  });
  
  // Check output
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`\n✓ PDF saved: ${outputFile} (${sizeMB} MB)`);
  }
  
  server.close();
}

main().catch(err => {
  console.error('Error:', err.message);
  server.close();
  process.exit(1);
});
