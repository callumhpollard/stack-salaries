var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var Memory = require('./models/memory');
var path = require('path');
var cors = require('cors');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var secret = require('./secret');
var passportAuth = require('./passport/passport');
var localAuth = require('./passport/local');
var passport = require('passport');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/compiled/src')));


// Mongoose Connection (Refactor into Separate File)
var databaseURL = process.env.MONGOLABS ||'mongodb://localhost:27017/'

mongoose.connect(databaseURL);

// Helper Methods (Refactor into Separate File)
function generateToken(user){
  // Add issued at timestamp and subject
  // Based on the JWT convention
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret.secret);
}

// Set to false since tokens are being used
// This is Passport Authentication setup
// Github auth will be added here as well
var requireAuth = passport.authenticate('jwt', { session: false } );
var requireSignIn = passport.authenticate('local', { session: false });

// Allow all headers
app.all('*', function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next(); 
});

// Root Path
app.get('/', function(req, res, next){
});


// Get all Stack Entries
app.get('/stackdata', function(req, res, next){

})

// Add a Stack Entry
app.post('/stackentry', function(req, res, next){

});


// GET all users
app.get('/users', requireAuth, function(req, res, next){
  User.find({}, function(err, users){
    if(!err) {
      res.send(200, users);
    } else {
      throw err;
    }
  });
});

// The middleware will verify credentials
// If successful, hand a token
app.post('/signin', requireSignIn, function(req, res, next){
  var userToken = generateToken(req.user);

  res.send({token: userToken });
});

app.post('/signup', function(req, res, next){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  // Validation to check if all the fields were being passed
  if(!email || !password || !name){
    return res.send(422, {error: "Please fill out all the fields"});
  }

  // Check email already exists
  User.findOne({ email: email}, function(err, existingUser){

    if(err) { return next(err); }

    // If it does, return "existing account" message
    if(existingUser){
      // Return unprocessable entity
      return res.send(422, { error: 'Email is in use' });
    }

    // If not, create and save user
    var user = new User({
      name: name,
      email: email,
      password: password,
    });

    user.save(function(err){
      if (err) { return next(err); }

      // Send user back a JWT upon successful account creation
      res.json({ token: generateToken(user)});
    });

  });

});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;