var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/header.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'header.png'));
});

app.get('/ui/develop.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'develop.png'));
});
app.get('/ui/design.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'design.png'));
});

app.get('/ui/circle2.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'circle2.png'));
});

app.get('/ui/boy.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'boy.png'));
});

app.get('/ui/thatsall.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'thatsall.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
