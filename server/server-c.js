'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _stackdata = require('./models/stackdata');

var _stackdata2 = _interopRequireDefault(_stackdata);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _secret = require('./secret');

var _secret2 = _interopRequireDefault(_secret);

var _passport = require('./passport/passport');

var _passport2 = _interopRequireDefault(_passport);

var _local = require('./passport/local');

var _local2 = _interopRequireDefault(_local);

var _github = require('./passport/github');

var _github2 = _interopRequireDefault(_github);

var _passport3 = require('passport');

var _passport4 = _interopRequireDefault(_passport3);

var _expressPassportLogout = require('express-passport-logout');

var _expressPassportLogout2 = _interopRequireDefault(_expressPassportLogout);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = require('./compiled/src/bundle').default;

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, '../client/compiled')));

// Mongoose Connection (Refactor into Separate File)
var databaseURL = process.env.MONGOLABS || 'mongodb://localhost:27017/stack-salaries';

_mongoose2.default.connect(databaseURL);

// Helper Methods (Refactor into Separate File)
function generateToken(user) {
  // Add issued at timestamp and subject
  // Based on the JWT convention
  var timestamp = new Date().getTime();
  return _jwtSimple2.default.encode({ sub: user.id, iat: timestamp }, _secret2.default.secret);
}

// Set to false since tokens are being used
// This is Passport Authentication setup
// Github auth will be added here as well
var requireAuth = _passport4.default.authenticate('jwt', { session: false });
var requireSignIn = _passport4.default.authenticate('local', { session: false });
var githubAuth = _passport4.default.authenticate('github', { session: false, successRedirect: '/', failureRedirect: '/login' });

// Allow all headers
app.all('*', function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Get all Stack Entries
app.get('/stackdata', function (req, res, next) {
  // StackData.find({}, function(err, entries){
  //   if(!err) {
  //     res.send(200, entries);
  //   } else {
  //     throw err;
  //   }
  // });
});

// Add a Stack Entry
app.post('/stackentry', function (req, res, next) {});

// app.get('/auth/github', githubAuth, function(req, res){
// });

// app.get('/auth/github/callback', githubAuth, function(req, res) {
//     res.redirect('/dashboard');
// });

// app.get(['/dashboard'], function(req, res) {
//   /* Use React Router */

//   match({routes: Router, location: req.url}, function(error, redirectLocation, renderProps) {
//     /* Send response */
//   });
// });

// GET all users
app.get('/users', requireAuth, function (req, res, next) {
  _user2.default.find({}, function (err, users) {
    if (!err) {
      res.send(200, users);
    } else {
      throw err;
    }
  });
});

app.get('/users/:id', function (req, res, next) {
  var id = req.params.id;

  // A friendly error to display if no user matches the id
  var err = "No such user with the given id";

  _user2.default.findOne({ id: id }, function (err, existingUser) {
    if (err) {
      res.send(err);
    } else {
      res.json(existingUser);
    }
  });
});

// The middleware will verify credentials
// If successful, hand a token
app.post('/signin', requireSignIn, function (req, res, next) {
  var userToken = generateToken(req.user);

  res.send({ token: userToken });
});

app.post('/signup', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  // Validation to check if all the fields were being passed
  if (!email || !password || !name) {
    return res.send(422, { error: "Please fill out all the fields" });
  }

  // Check email already exists
  _user2.default.findOne({ email: email }, function (err, existingUser) {

    if (err) {
      return next(err);
    }

    // If it does, return "existing account" message
    if (existingUser) {
      // Return unprocessable entity
      return res.send(422, { error: 'Email is in use' });
    }

    // If not, create and save user
    var user = new _user2.default({
      name: name,
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Send user back a JWT upon successful account creation
      res.json({ token: generateToken(user) });
    });
  });
});

app.get('/logout', (0, _expressPassportLogout2.default)(), function (req, res, next) {
  res.redirect('/login');
});

// Root Path
app.get('*', function (req, res, next) {
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send((0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps)));
    } else {
      res.status(404).send('Not found');
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;

//# sourceMappingURL=data:application/json;base64,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SUFBWixJQUFvQixJQUEvQjs7QUFFQSxJQUFJLE1BQUosQ0FBVyxJQUFYO0FBQ0EsUUFBUSxHQUFSLENBQVksa0NBQWtDLElBQTlDOztBQUVBLE9BQU8sT0FBUCxHQUFpQixHQUFqQiIsImZpbGUiOiJzZXJ2ZXItYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBVc2VyIGZyb20gJy4vbW9kZWxzL3VzZXInO1xuaW1wb3J0IFN0YWNrRGF0YSBmcm9tICcuL21vZGVscy9zdGFja2RhdGEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgand0IGZyb20gJ2p3dC1zaW1wbGUnO1xuaW1wb3J0IHNlY3JldCBmcm9tICcuL3NlY3JldCc7XG5pbXBvcnQgcGFzc3BvcnRBdXRoIGZyb20gJy4vcGFzc3BvcnQvcGFzc3BvcnQnO1xuaW1wb3J0IGxvY2FsQXV0aCBmcm9tICcuL3Bhc3Nwb3J0L2xvY2FsJztcbmltcG9ydCBnaXRodWIgZnJvbSAnLi9wYXNzcG9ydC9naXRodWInO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcbmltcG9ydCBsb2dvdXQgZnJvbSAnZXhwcmVzcy1wYXNzcG9ydC1sb2dvdXQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IG1hdGNoLCBSb3V0ZXJDb250ZXh0IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xudmFyIHJvdXRlcyA9IHJlcXVpcmUoJy4vY29tcGlsZWQvc3JjL2J1bmRsZScpLmRlZmF1bHQ7XG5cbnZhciBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9jb21waWxlZCcpKSk7XG5cblxuLy8gTW9uZ29vc2UgQ29ubmVjdGlvbiAoUmVmYWN0b3IgaW50byBTZXBhcmF0ZSBGaWxlKVxudmFyIGRhdGFiYXNlVVJMID0gcHJvY2Vzcy5lbnYuTU9OR09MQUJTIHx8J21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvc3RhY2stc2FsYXJpZXMnXG5cbm1vbmdvb3NlLmNvbm5lY3QoZGF0YWJhc2VVUkwpO1xuXG4vLyBIZWxwZXIgTWV0aG9kcyAoUmVmYWN0b3IgaW50byBTZXBhcmF0ZSBGaWxlKVxuZnVuY3Rpb24gZ2VuZXJhdGVUb2tlbih1c2VyKXtcbiAgLy8gQWRkIGlzc3VlZCBhdCB0aW1lc3RhbXAgYW5kIHN1YmplY3RcbiAgLy8gQmFzZWQgb24gdGhlIEpXVCBjb252ZW50aW9uXG4gIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgcmV0dXJuIGp3dC5lbmNvZGUoeyBzdWI6IHVzZXIuaWQsIGlhdDogdGltZXN0YW1wIH0sIHNlY3JldC5zZWNyZXQpO1xufVxuXG4vLyBTZXQgdG8gZmFsc2Ugc2luY2UgdG9rZW5zIGFyZSBiZWluZyB1c2VkXG4vLyBUaGlzIGlzIFBhc3Nwb3J0IEF1dGhlbnRpY2F0aW9uIHNldHVwXG4vLyBHaXRodWIgYXV0aCB3aWxsIGJlIGFkZGVkIGhlcmUgYXMgd2VsbFxudmFyIHJlcXVpcmVBdXRoID0gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdqd3QnLCB7IHNlc3Npb246IGZhbHNlIH0gKTtcbnZhciByZXF1aXJlU2lnbkluID0gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbCcsIHsgc2Vzc2lvbjogZmFsc2UgfSk7XG52YXIgZ2l0aHViQXV0aCA9IHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ2l0aHViJywgeyBzZXNzaW9uOiBmYWxzZSwgc3VjY2Vzc1JlZGlyZWN0OiAnLycsIGZhaWx1cmVSZWRpcmVjdDogJy9sb2dpbid9KTtcblxuLy8gQWxsb3cgYWxsIGhlYWRlcnNcbmFwcC5hbGwoJyonLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge+KAqFxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO+KAqFxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ1BVVCwgR0VULCBQT1NULCBERUxFVEUsIE9QVElPTlMnKTvigKhcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdDb250ZW50LVR5cGUnKTvigKhcbiAgbmV4dCgpO+KAqFxufSk7XG5cbi8vIEdldCBhbGwgU3RhY2sgRW50cmllc1xuYXBwLmdldCgnL3N0YWNrZGF0YScsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgLy8gU3RhY2tEYXRhLmZpbmQoe30sIGZ1bmN0aW9uKGVyciwgZW50cmllcyl7XG4gIC8vICAgaWYoIWVycikge1xuICAvLyAgICAgcmVzLnNlbmQoMjAwLCBlbnRyaWVzKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgdGhyb3cgZXJyO1xuICAvLyAgIH1cbiAgLy8gfSk7XG59KVxuXG4vLyBBZGQgYSBTdGFjayBFbnRyeVxuYXBwLnBvc3QoJy9zdGFja2VudHJ5JywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpe1xuXG59KTtcblxuLy8gYXBwLmdldCgnL2F1dGgvZ2l0aHViJywgZ2l0aHViQXV0aCwgZnVuY3Rpb24ocmVxLCByZXMpe1xuLy8gfSk7XG5cbi8vIGFwcC5nZXQoJy9hdXRoL2dpdGh1Yi9jYWxsYmFjaycsIGdpdGh1YkF1dGgsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4vLyAgICAgcmVzLnJlZGlyZWN0KCcvZGFzaGJvYXJkJyk7XG4vLyB9KTtcblxuXG4vLyBhcHAuZ2V0KFsnL2Rhc2hib2FyZCddLCBmdW5jdGlvbihyZXEsIHJlcykge1xuLy8gICAvKiBVc2UgUmVhY3QgUm91dGVyICovXG5cbi8vICAgbWF0Y2goe3JvdXRlczogUm91dGVyLCBsb2NhdGlvbjogcmVxLnVybH0sIGZ1bmN0aW9uKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCByZW5kZXJQcm9wcykge1xuLy8gICAgIC8qIFNlbmQgcmVzcG9uc2UgKi9cbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gR0VUIGFsbCB1c2Vyc1xuYXBwLmdldCgnL3VzZXJzJywgcmVxdWlyZUF1dGgsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgVXNlci5maW5kKHt9LCBmdW5jdGlvbihlcnIsIHVzZXJzKXtcbiAgICBpZighZXJyKSB7XG4gICAgICByZXMuc2VuZCgyMDAsIHVzZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSk7XG59KTtcblxuYXBwLmdldCgnL3VzZXJzLzppZCcsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgdmFyIGlkID0gcmVxLnBhcmFtcy5pZDtcblxuICAvLyBBIGZyaWVuZGx5IGVycm9yIHRvIGRpc3BsYXkgaWYgbm8gdXNlciBtYXRjaGVzIHRoZSBpZFxuICB2YXIgZXJyID0gXCJObyBzdWNoIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcIjtcblxuICAgVXNlci5maW5kT25lKHsgaWQ6IGlkfSwgZnVuY3Rpb24oZXJyLCBleGlzdGluZ1VzZXIpe1xuICAgIGlmKGVycikge1xuICAgICAgcmVzLnNlbmQoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmpzb24oZXhpc3RpbmdVc2VyKTtcbiAgICB9XG4gICB9KTtcbn0pO1xuXG4vLyBUaGUgbWlkZGxld2FyZSB3aWxsIHZlcmlmeSBjcmVkZW50aWFsc1xuLy8gSWYgc3VjY2Vzc2Z1bCwgaGFuZCBhIHRva2VuXG5hcHAucG9zdCgnL3NpZ25pbicsIHJlcXVpcmVTaWduSW4sIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgdmFyIHVzZXJUb2tlbiA9IGdlbmVyYXRlVG9rZW4ocmVxLnVzZXIpO1xuXG4gIHJlcy5zZW5kKHt0b2tlbjogdXNlclRva2VuIH0pO1xufSk7XG5cbmFwcC5wb3N0KCcvc2lnbnVwJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpe1xuICB2YXIgbmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gIHZhciBlbWFpbCA9IHJlcS5ib2R5LmVtYWlsO1xuICB2YXIgcGFzc3dvcmQgPSByZXEuYm9keS5wYXNzd29yZDtcblxuICAvLyBWYWxpZGF0aW9uIHRvIGNoZWNrIGlmIGFsbCB0aGUgZmllbGRzIHdlcmUgYmVpbmcgcGFzc2VkXG4gIGlmKCFlbWFpbCB8fCAhcGFzc3dvcmQgfHwgIW5hbWUpe1xuICAgIHJldHVybiByZXMuc2VuZCg0MjIsIHtlcnJvcjogXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHRoZSBmaWVsZHNcIn0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgZW1haWwgYWxyZWFkeSBleGlzdHNcbiAgVXNlci5maW5kT25lKHsgZW1haWw6IGVtYWlsfSwgZnVuY3Rpb24oZXJyLCBleGlzdGluZ1VzZXIpe1xuXG4gICAgaWYoZXJyKSB7IHJldHVybiBuZXh0KGVycik7IH1cblxuICAgIC8vIElmIGl0IGRvZXMsIHJldHVybiBcImV4aXN0aW5nIGFjY291bnRcIiBtZXNzYWdlXG4gICAgaWYoZXhpc3RpbmdVc2VyKXtcbiAgICAgIC8vIFJldHVybiB1bnByb2Nlc3NhYmxlIGVudGl0eVxuICAgICAgcmV0dXJuIHJlcy5zZW5kKDQyMiwgeyBlcnJvcjogJ0VtYWlsIGlzIGluIHVzZScgfSk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm90LCBjcmVhdGUgYW5kIHNhdmUgdXNlclxuICAgIHZhciB1c2VyID0gbmV3IFVzZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICB9KTtcblxuICAgIHVzZXIuc2F2ZShmdW5jdGlvbihlcnIpe1xuICAgICAgaWYgKGVycikgeyByZXR1cm4gbmV4dChlcnIpOyB9XG5cbiAgICAgIC8vIFNlbmQgdXNlciBiYWNrIGEgSldUIHVwb24gc3VjY2Vzc2Z1bCBhY2NvdW50IGNyZWF0aW9uXG4gICAgICByZXMuanNvbih7IHRva2VuOiBnZW5lcmF0ZVRva2VuKHVzZXIpfSk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuXG5hcHAuZ2V0KCcvbG9nb3V0JywgbG9nb3V0KCksIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgcmVzLnJlZGlyZWN0KCcvbG9naW4nKTtcbn0pO1xuXG4vLyBSb290IFBhdGhcbmFwcC5nZXQoJyonLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICBtYXRjaCh7IHJvdXRlcywgbG9jYXRpb246IHJlcS51cmwgfSwgKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCByZW5kZXJQcm9wcykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyb3IubWVzc2FnZSlcbiAgICB9IGVsc2UgaWYgKHJlZGlyZWN0TG9jYXRpb24pIHtcbiAgICAgIHJlcy5yZWRpcmVjdCgzMDIsIHJlZGlyZWN0TG9jYXRpb24ucGF0aG5hbWUgKyByZWRpcmVjdExvY2F0aW9uLnNlYXJjaClcbiAgICB9IGVsc2UgaWYgKHJlbmRlclByb3BzKSB7XG4gICAgICAvLyBZb3UgY2FuIGFsc28gY2hlY2sgcmVuZGVyUHJvcHMuY29tcG9uZW50cyBvciByZW5kZXJQcm9wcy5yb3V0ZXMgZm9yXG4gICAgICAvLyB5b3VyIFwibm90IGZvdW5kXCIgY29tcG9uZW50IG9yIHJvdXRlIHJlc3BlY3RpdmVseSwgYW5kIHNlbmQgYSA0MDQgYXNcbiAgICAgIC8vIGJlbG93LCBpZiB5b3UncmUgdXNpbmcgYSBjYXRjaC1hbGwgcm91dGUuXG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChyZW5kZXJUb1N0cmluZyg8Um91dGVyQ29udGV4dCB7Li4ucmVuZGVyUHJvcHN9IC8+KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ05vdCBmb3VuZCcpXG4gICAgfVxuICB9KVxufSk7XG5cbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5hcHAubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coJ1NlcnZlciBub3cgbGlzdGVuaW5nIG9uIHBvcnQgJyArIHBvcnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcDsiXX0=