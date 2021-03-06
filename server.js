var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require("express-session");
//var hbs = require('express-handlebars');

//app.engine('hbs', hbs({extname:'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/assets/layouts/'}));
//app.set('css',path.join(__dirname, 'css'));
//app.set('view engine','hbs');

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
app.use(session({
    secret: "someRandomSecretValue",
    cookie: {maxAge: 1000*60*60*24*30},
    resave: true,
    saveUninitialized: true
}));

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
  var template=`
    <!-- +++++ Posts Lists +++++ -->
  	<!-- +++++ First Post +++++ -->
    <div id="grey">
        <div class="container">
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2">
            <p><img src="ui/assets/img/user.png" width="50px" height="50px"> <ba>Stanley Stinson</ba></p>
            <p><bd>${date}</bd></p>
            <h4>${title}</h4>
            <!-- <p><img class="img-responsive" src="ui/assets/img/blog01.jpg" alt=""></p> -->
            <p>${content}</p>
            <p><a href="blog01.html">Continue Reading...</a></p>
          </div>

        </div><!-- /row -->
        </div> <!-- /container -->
    </div><!-- /white -->
`;
  return template;
}


app.get('/', function (req, res) {
  console.log("Page loaded");
  res.sendFile(path.join(__dirname,'ui', 'index.html'));

});

app.get('/work', function (req, res) {
  console.log("Page loaded");
  res.sendFile(path.join(__dirname, 'ui', 'work.html'));

});

app.get('/ui/assets/css/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/assets/css', file));
});

app.get('/ui/assets/fonts/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/assets/fonts', file));
});

app.get('/ui/assets/img/portfolio/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/assets/img/portfolio', file));
});

app.get('/ui/assets/img/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/assets/img/', file));
});

app.get('/ui/assets/js/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/assets/js', file));
});

app.get('/ui/:fileName', function (req, res) {
  var file = req.params.fileName;
  res.sendFile(path.join(__dirname, 'ui/', file));
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
                //set the session
                req.session.auth = {userId: result.rows[0].id};

                res.send("Correct Credentials");
            }
            else{
                res.send(403).send("USername/Password is invalid");
            }

        }
    }
  });
});

app.get('/check-login', function (req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send('You are logged in '+ req.session.auth.userId.toString());
    }

    else{
        res.send('You are not logged in');
    }
});

app.get('/logout', function (req,res){
   delete req.session.auth;
   res.send("You have been logged out");
});

app.get('/blog', function (req, res) {

   });

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
