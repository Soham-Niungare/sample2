const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const requestedUrl = req.url;

  if (requestedUrl === '/') {
    const htmlFilePath = path.join(__dirname, 'index.html');
    
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (requestedUrl.startsWith('/images/')) {
    // Serve images from an 'images' directory
    const imagePath = path.join(__dirname, requestedUrl);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        // Determine the appropriate content type based on the file extension
        const extension = path.extname(imagePath);
        const contentType = getContentType(extension);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function getContentType(extension) {
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'static/img/jpeg';
    case '.png':
      return 'static/img/png';
    case '.gif':
      return 'static/img/gif';
    default:
      return 'application/octet-stream';
  }
}

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
