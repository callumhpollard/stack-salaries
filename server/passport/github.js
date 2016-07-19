var passport = require('passport');
var User = require('../models/user');
var secret = require('../secret');
var GitHubStrategy = require('passport-github').Strategy;

var githubLogin = new GitHubStrategy({
    clientID: '1ca06fb585c9cadd3def',
    clientSecret: '9e2ce18dccdfebb6c90ec47be0691ccb42f21e95',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  }, function(accessToken, refreshToken, profile, done) {
    console.log("We're here!");
  User.findOne({ githubId: profile.id }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            githubId: profile.id,
            name: profile.displayName,
            email: profile.email
          });
          user.save(function(err) {
            if(err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        }
      });
  }
);


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(githubLogin);