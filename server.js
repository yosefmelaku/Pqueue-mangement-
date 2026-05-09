const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Remove trailing slash except for root
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Route mapping for clean URLs
  const routes = {
    '/': '/index.html',
    '/home': '/index.html',
    '/dashboard': '/index.html',
    '/register': '/registration.html',
    '/registration': '/registration.html',
    '/queue': '/Queue.html',
    '/status': '/Queue.html',
    '/contact': '/contact.html',
    '/support': '/contact.html'
  };

  // Check if it's a defined route
  if (routes[pathname]) {
    pathname = routes[pathname];
  }

  // Try to serve the exact path first
  let filePath = path.join(__dirname, pathname);
  
  // If file doesn't exist, try adding .html extension
  if (!fs.existsSync(filePath) && !path.extname(pathname)) {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
      pathname = pathname + '.html';
    }
  }

  // If still not found, check if it's a page route and serve index.html (SPA behavior)
  if (!fs.existsSync(filePath)) {
    const pageRoutes = ['/dashboard', '/register', '/registration', '/queue', '/status', '/contact', '/support'];
    if (pageRoutes.some(route => pathname.startsWith(route))) {
      filePath = path.join(__dirname, '/index.html');
    }
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>404 - Page Not Found</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #d9534f; }
            a { color: #0056b3; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested page could not be found.</p>
          <p><a href="/">Return to Home</a></p>
        </body>
      </html>
    `);
    return;
  }

  // Get file extension and corresponding MIME type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // Set appropriate headers
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });

  // Create read stream and pipe to response
  const readStream = fs.createReadStream(filePath);
  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  readStream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`🚀 Smart PQMS Server running at http://localhost:${PORT}`);
  console.log(`📊 Healthcare Queue Management System`);
  console.log(`👨‍💻 Developed by: Yosef Melaku`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = server;