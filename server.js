var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={      // This variable holds all the common part of all the articles
  'articleOne' :{
    title: 'Article One',
    date: 'Nov 9 2016',
    content: `<p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>`
  },
  'articleTwo' :{
      title: 'Article Two',
      date: 'Nov 10 2016',
      content: `<p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>`
    }
};


function CreateTemplate(data) {   // This function renders the template
  var title= data.title;
  var date= data.date;          // The first three variables are just placeholders for the fourth one
  var content= data.content;
  var template=`<html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <head>
      <h2>${title}</h2>
      <p>
        ${date}
      </p>
    </head>

    <hr>

    <body>
      ${content}
    </body>

    <hr>
  </html>`;
  return template;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {                       // counter end-point
  counter = counter + 1;
  res.send(counter.toString())
});

app.get('/:NameOfArticle', function (req, res) {
  var NameOfArticle=req.params.NameOfArticle;        //It is used to extract the name of article into a variable so that we can use to index the correct article.
  res.send(CreateTemplate(articles[NameOfArticle]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
