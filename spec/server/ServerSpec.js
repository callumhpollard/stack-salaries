var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server.js');

// the models for the database
var Stack = require('../server/models/stackdata.js');
var Users = require('../server/models/stackdata.js');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

