var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var AutoIncrement = require('mongoose-sequence');

var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true, lowercase: true},
  password: String,
  gender: String,
  githubId: Number,
  userData: []
});

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

// Presave hook to run before saving a user
// Salt and hash the user password before saving
userSchema.pre('save', function(next){
  // Save the context
  var user = this;

  // Generate salt then hash
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  })
});

userSchema.methods.comparePassword = function(inputPassword, callback){
  bcrypt.compare(inputPassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

var User = mongoose.model("User", userSchema);

module.exports = User;
