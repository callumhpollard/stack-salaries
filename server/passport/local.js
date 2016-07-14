var passport = require('passport');
var User = require('../models/user');
var secret = require('../secret');
var localStrategy = require('passport-local');

// Local strategy
var opt = {usernameField: 'email'};

// Using the local strategy to verify the email and password
// When verified, a new token will be generated
var localLogin = new localStrategy(opt, function(email, password, done){
  User.findOne({email: email}, function(err, userFound){

    // If there's an error, return
    if(err) { return done(err); }

    // User does not exist
    if(!userFound){
      return done(null, false);
    }

    // If the user is found, there are two scenarios
    // a) user is found & password matches
    // b) user is found & password doesn't match
    userFound.comparePassword(password, function(err, match){
      if(err) { return done(err); }

      if(!match) {
        return done(null, false);
      }

      // Send back the user in order to use it to generate a token
      return done(null, userFound);

    });

  })
});


passport.use(localLogin);