var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'alkesh47',
  port: '5432',
  password: process.env.DB_PASSWORD,
  database: 'alkesh47',
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

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
  var comment= data.comment;
  var comment_box = data.comment_box;
  var template=`<html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <head>
      <h2>${title}</h2>
      <p>
        ${date.toDateString()}
      </p>
    </head>

    <hr>

    <body>
      ${content}
    </body>

    <hr>

    <body>
      <h3 id = 'nazi'>
        Comments
      </h3>

      <input type="text" id="name" value="input"></input>
      <br>
      <input type="submit" id="submitButton" value="Submit"></input>
      <ul id='nameList'>
      </ul>

      <hr>

    </body>
    <script type="text/javascript" src="/ui/main.js">
    </script>
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

app.get('/extra', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'extra.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {                       // counter end-point
  counter = counter + 1;
  res.send(counter.toString());

});

var pool = new Pool(config);
app.get('/test-db', function (req,res){
  //Make a query
  pool.query('SELECT * FROM test', function(err , result){
    if(err){
      res.status(500).send(err.toString());
    }

    else {
      res.send(JSON.stringify(result));
    }
  });
  //Return a response

});

var names = [];
app.get('/:NameOfArticle/submit-name', function(req,res){      // Old method of extracting parameter -->>  'submit-name/:name'
  //GET the names from the request
  var name = req.query.name;
  // add it to an array
  names.push(name);

  //Send the names back to the request
  res.send(JSON.stringify(names));
});

function hash(input, salt){
  var hashed = crypto.pbkdf2Sync(input , salt, 10000, 512, 'sha512');
  return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');111
}

app.get('/hash/:input', function(req,res){
  var hashedString = hash(req.params.input, 'random-string');
  res.send(hashedString);
});

app.post('/create-user', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  salt = crypto.randomBytes(128).toString('hex');
  var dbString = hash(password, salt);
  pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)', [username, dbString], function(err, result){
    if(err){
      res.status(500).send(err.toString());
    }

    else {
      res.send("User successfully created"+ username);
    }
  });
});

app.post('/login', function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  pool.query('SELECT * FROM "user" WHERE username=$1', [username], function(err, result){
    if(err){
      res.status(500).send(err.toString());
    }

    else {
        if(result.rows.length === 0){
            res.send(403).send("USername/Password is invalid");
        }
        else{
            var dbString = result.rows[0].password;
            var salt = dbString.split('$')[2];
            var hashedPassword = hash(password,salt);
            if(hashedPassword === dbString){
                res.send("Correct Credentials");    
            }
            else{
                res.send(403).send("USername/Password is invalid");
            }
               
        }
    }
  });
});

app.get('/articles/:NameOfArticle', function (req, res) {
   //It is used to extract the name of article into a variable so that we can use to index the correct article.
   //var NameOfArticle=req.params.NameOfArticle;

   pool.query("SELECT * FROM article WHERE title= $1",[req.params.NameOfArticle], function(err, result){
     if(err){
       res.status(500).send(err.toString());
     }
     else{
       if(result.rows.length === 0){
         res.sendStatus(404).send('Article not Found');
       }

       else {
         var articleData = result.rows[0];
         res.send(CreateTemplate(articleData));
       }
     }
   });
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
