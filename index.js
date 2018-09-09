const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/exam')));

app.all('*', (req, res) => res.sendFile(path.join(__dirname + '/dist/exam/index.html')));

const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running...'));

