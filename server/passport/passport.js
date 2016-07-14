var passport = require('passport');
var User = require('../models/user');
var secret = require('../secret');
var bcrypt = require('bcrypt-nodejs');


// Use passport strategy for authentication
var passportStrategy = require('passport-jwt').Strategy;
var extractToken = require('passport-jwt').ExtractJwt;

// JWT config
// Where can we find the token
var jwtOptions = {
  jwtFromRequest: extractToken.fromHeader('authorization'),
  secretOrKey: secret.secret
};


// Init JWT strategy
// payload is the decoded JWT token
var authStrategy = new passportStrategy(jwtOptions, function(payload, done){

  console.log("Hello!");

  // Check if user.id in payload exists
  // call done callback
  User.findById(payload.sub, function(err, userFound){

    // Call callback with an error
    if(err) { return done(err, false); }

    if(userFound){
      done(null, userFound);
    } else {
      // Call callback without authenticating
      done(null, false);
    }

  });

});

// Passport will now use the strategy defined
passport.use(authStrategy);