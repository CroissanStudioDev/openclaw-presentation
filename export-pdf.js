const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9999;
const DIR = __dirname;

// Simple static server
const server = http.createServer((req, res) => {
  let filePath = path.join(DIR, req.url === '/' ? 'presentation.html' : req.url);
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
  };
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(content);
    }
  });
});

(async () => {
  server.listen(PORT);
  console.log(`Server on port ${PORT}`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`http://localhost:${PORT}/presentation.html?print-pdf`, { waitUntil: 'networkidle0' });
  
  // Wait for reveal.js to be ready
  await new Promise(r => setTimeout(r, 3000));
  
  await page.pdf({
    path: 'croissan-presentation.pdf',
    width: '1920px',
    height: '1080px',
    printBackground: true,
    preferCSSPageSize: true,
    landscape: true
  });
  
  console.log('PDF saved: croissan-presentation.pdf');
  
  await browser.close();
  server.close();
})();
