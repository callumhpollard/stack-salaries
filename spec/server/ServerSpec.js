git stvar request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server.js');

// the models for the database
var Stack = require('../server/models/stackdata.js');
var Users = require('../server/models/stackdata.js');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

// Grab all data //
//   describe('/stackdata GET request:', function () {
//     it('Get all data from database', function(){
//       request(app)
//         .get('/stackdata')
//         .expect(function(){
//           Stack.find({});
//         });
//     })
//     .end(done);
//   });


// // Test for Account Creation //
//   describe('Account Creation:', function () {
//     it('Signup creates new user', function(done) {
//       request(app)
//         .post('/signup')
//         .send({
//           'username': 'nahee',
//           'password': '123'})
//         .expect(302)
//         .expect(function(){
//             User.findOne({'username': 'nahee'})
//               .exec(function(err, user){
//                 expect(user.username).to.equal('nahee');
//               });
//         })
//         .end(done);
//     });
//   });


