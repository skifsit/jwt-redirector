const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-var-requires
const http = require('http'); // eslint-disable-line @typescript-eslint/no-var-requires

const favicon = fs.readFileSync('./favicon.ico');
const indexHTML = fs.readFileSync('./index.html', 'utf8');
const bundleJS = fs.readFileSync('./dist/bundle.js', 'utf8');
const port = process.env.PORT || 6776;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const requestHandler = (req, res) => {
  if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon; binary');
    return res.end(favicon);
  }
  if (req.url === '/bundle.js') {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    return res.end(bundleJS);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(indexHTML);
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
