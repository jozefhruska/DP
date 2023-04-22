const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html>');
  res.write('<head><title>Request Headers</title></head>');
  res.write('<body>');
  res.write('<h1>Request Headers</h1>');
  res.write('<table>');
  for (const [name, value] of Object.entries(req.headers)) {
    res.write(`<tr><th>${name}</th><td>${value}</td></tr>`);
  }

  res.write('</table>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
