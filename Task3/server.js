// Student Name: Pedro Paulo Macena Santos
// Student Number: L00161845

const http = require('http');

const boot = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

exports.boot = boot;
