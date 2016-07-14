var mongoose = require('mongoose');

var stackdataSchema = mongoose.Schema({
  state: String,
  city: String,
  salary: Number,
  stack: Array
});

var StackData = mongoose.model('StackData', stackdataSchema);

module.exports = StackData