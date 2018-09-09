// https://stackoverflow.com/questions/31495743/node-angular-app-uncaught-syntaxerror-unexpected-token

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

/*
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

const port = process.env.PORT || '5000';

app.use(express.static(__dirname, '/dist/c'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log('Running...'));
*/
