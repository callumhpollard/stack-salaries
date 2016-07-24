var mongoose = require('mongoose');

var stackdataSchema = mongoose.Schema({
  state: String,
  city: String,
  salary: Number,
  stack: Array,
  education: String,
  gender: String,
  experience: Number,
  user_id: Number
});

var StackData = mongoose.model('StackData', stackdataSchema);

module.exports = StackData;


// Find any stackData where user_id = 1
