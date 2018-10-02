const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/exam')));
app.use(requireHTTPS);

app.all('*', (req, res) => res.sendFile(path.join(__dirname + '/dist/exam/index.html')));

const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running...'));

function requireHTTPS(req, res, next) {
  if (!req.secure) {
    //FYI this should work for local development as well
    // console.log(`host: ${req.get('host')}, url: ${req.url}`);
    // return res.redirect('https://' + req.get('host') + req.url);
    return res.redirect('https://' + req.get('host'));
  }
  next();
}
