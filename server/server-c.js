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
var SD = require('./controllers/stackdataController');

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
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

//Search for any field
app.post('/search', function (req, res, next) {
  SD.querySalary(req.body, function (results) {
    res.json(results);
  });
});

// Add a Stack Entry
app.post('/stackentry', function (req, res, next) {
  SD.createSalary(req.body, function (result) {
    res.status(201);
    res.json(result);
  });
});

// GET all users
app.get('/users', function (req, res, next) {
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

//# sourceMappingURL=data:application/json;base64,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Qjs7OztBQUl0QixVQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWdCLElBQWhCLENBQXFCLDRCQUFlLDBEQUFtQixXQUFuQixDQUFmLENBQXJCO0FBQ0QsS0FMTSxNQUtBO0FBQ0wsVUFBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQixXQUFyQjtBQUNEO0FBQ0YsR0FiRDtBQWNELENBZkQ7O0FBaUJBLElBQUksT0FBTyxRQUFRLEdBQVIsQ0FBWSxJQUFaLElBQW9CLElBQS9COztBQUVBLElBQUksTUFBSixDQUFXLElBQVg7QUFDQSxRQUFRLEdBQVIsQ0FBWSxrQ0FBa0MsSUFBOUM7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLEdBQWpCIiwiZmlsZSI6InNlcnZlci1jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9tb2RlbHMvdXNlcic7XG5pbXBvcnQgU3RhY2tEYXRhIGZyb20gJy4vbW9kZWxzL3N0YWNrZGF0YSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBqd3QgZnJvbSAnand0LXNpbXBsZSc7XG5pbXBvcnQgc2VjcmV0IGZyb20gJy4vc2VjcmV0JztcbmltcG9ydCBwYXNzcG9ydEF1dGggZnJvbSAnLi9wYXNzcG9ydC9wYXNzcG9ydCc7XG5pbXBvcnQgbG9jYWxBdXRoIGZyb20gJy4vcGFzc3BvcnQvbG9jYWwnO1xuaW1wb3J0IGdpdGh1YiBmcm9tICcuL3Bhc3Nwb3J0L2dpdGh1Yic7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IGxvZ291dCBmcm9tICdleHByZXNzLXBhc3Nwb3J0LWxvZ291dCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuaW1wb3J0IHsgbWF0Y2gsIFJvdXRlckNvbnRleHQgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG52YXIgcm91dGVzID0gcmVxdWlyZSgnLi9jb21waWxlZC9zcmMvYnVuZGxlJykuZGVmYXVsdDtcbnZhciBTRCA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvc3RhY2tkYXRhQ29udHJvbGxlcicpO1xuXG52YXIgYXBwID0gZXhwcmVzcygpO1xuXG5hcHAudXNlKG1vcmdhbignZGV2JykpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaWVudC9jb21waWxlZCcpKSk7XG5cblxuLy8gTW9uZ29vc2UgQ29ubmVjdGlvbiAoUmVmYWN0b3IgaW50byBTZXBhcmF0ZSBGaWxlKVxudmFyIGRhdGFiYXNlVVJMID0gcHJvY2Vzcy5lbnYuTU9OR09MQUJTIHx8J21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvc3RhY2stc2FsYXJpZXMnXG5cbm1vbmdvb3NlLmNvbm5lY3QoZGF0YWJhc2VVUkwpO1xuXG4vLyBIZWxwZXIgTWV0aG9kcyAoUmVmYWN0b3IgaW50byBTZXBhcmF0ZSBGaWxlKVxuZnVuY3Rpb24gZ2VuZXJhdGVUb2tlbih1c2VyKXtcbiAgLy8gQWRkIGlzc3VlZCBhdCB0aW1lc3RhbXAgYW5kIHN1YmplY3RcbiAgLy8gQmFzZWQgb24gdGhlIEpXVCBjb252ZW50aW9uXG4gIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgcmV0dXJuIGp3dC5lbmNvZGUoeyBzdWI6IHVzZXIuaWQsIGlhdDogdGltZXN0YW1wIH0sIHNlY3JldC5zZWNyZXQpO1xufVxuXG4vLyBTZXQgdG8gZmFsc2Ugc2luY2UgdG9rZW5zIGFyZSBiZWluZyB1c2VkXG4vLyBUaGlzIGlzIFBhc3Nwb3J0IEF1dGhlbnRpY2F0aW9uIHNldHVwXG4vLyBHaXRodWIgYXV0aCB3aWxsIGJlIGFkZGVkIGhlcmUgYXMgd2VsbFxudmFyIHJlcXVpcmVBdXRoID0gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdqd3QnLCB7IHNlc3Npb246IGZhbHNlIH0gKTtcbnZhciByZXF1aXJlU2lnbkluID0gcGFzc3BvcnQuYXV0aGVudGljYXRlKCdsb2NhbCcsIHsgc2Vzc2lvbjogZmFsc2UgfSk7XG52YXIgZ2l0aHViQXV0aCA9IHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ2l0aHViJywgeyBzZXNzaW9uOiBmYWxzZSwgc3VjY2Vzc1JlZGlyZWN0OiAnLycsIGZhaWx1cmVSZWRpcmVjdDogJy9sb2dpbid9KTtcblxuLy8gQWxsb3cgYWxsIGhlYWRlcnNcbmFwcC5hbGwoJyonLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge+KAqFxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO+KAqFxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ1BVVCwgR0VULCBQT1NULCBERUxFVEUsIE9QVElPTlMnKTvigKhcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdDb250ZW50LVR5cGUnKTvigKhcbiAgbmV4dCgpO+KAqFxufSk7XG5cbi8vU2VhcmNoIGZvciBhbnkgZmllbGRcbmFwcC5wb3N0KCcvc2VhcmNoJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpe1xuICBTRC5xdWVyeVNhbGFyeShyZXEuYm9keSwgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgcmVzLmpzb24ocmVzdWx0cyk7XG4gIH0pO1xufSlcblxuLy8gQWRkIGEgU3RhY2sgRW50cnlcbmFwcC5wb3N0KCcvc3RhY2tlbnRyeScsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgU0QuY3JlYXRlU2FsYXJ5KHJlcS5ib2R5LCBmdW5jdGlvbihyZXN1bHQpe1xuICAgIHJlcy5zdGF0dXMoMjAxKTtcbiAgICByZXMuanNvbihyZXN1bHQpO1xuICB9KVxufSk7XG5cbi8vIEdFVCBhbGwgdXNlcnNcbmFwcC5nZXQoJy91c2VycycsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgVXNlci5maW5kKHt9LCBmdW5jdGlvbihlcnIsIHVzZXJzKXtcbiAgICBpZighZXJyKSB7XG4gICAgICByZXMuc2VuZCgyMDAsIHVzZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfSk7XG59KTtcblxuYXBwLmdldCgnL3VzZXJzLzppZCcsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgdmFyIGlkID0gcmVxLnBhcmFtcy5pZDtcblxuICAvLyBBIGZyaWVuZGx5IGVycm9yIHRvIGRpc3BsYXkgaWYgbm8gdXNlciBtYXRjaGVzIHRoZSBpZFxuICB2YXIgZXJyID0gXCJObyBzdWNoIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gaWRcIjtcblxuICAgVXNlci5maW5kT25lKHsgaWQ6IGlkfSwgZnVuY3Rpb24oZXJyLCBleGlzdGluZ1VzZXIpe1xuICAgIGlmKGVycikge1xuICAgICAgcmVzLnNlbmQoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmpzb24oZXhpc3RpbmdVc2VyKTtcbiAgICB9XG4gICB9KTtcbn0pO1xuXG4vLyBUaGUgbWlkZGxld2FyZSB3aWxsIHZlcmlmeSBjcmVkZW50aWFsc1xuLy8gSWYgc3VjY2Vzc2Z1bCwgaGFuZCBhIHRva2VuXG5hcHAucG9zdCgnL3NpZ25pbicsIHJlcXVpcmVTaWduSW4sIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgdmFyIHVzZXJUb2tlbiA9IGdlbmVyYXRlVG9rZW4ocmVxLnVzZXIpO1xuXG4gIHJlcy5zZW5kKHt0b2tlbjogdXNlclRva2VuIH0pO1xufSk7XG5cbmFwcC5wb3N0KCcvc2lnbnVwJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpe1xuICB2YXIgbmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gIHZhciBlbWFpbCA9IHJlcS5ib2R5LmVtYWlsO1xuICB2YXIgcGFzc3dvcmQgPSByZXEuYm9keS5wYXNzd29yZDtcblxuICAvLyBWYWxpZGF0aW9uIHRvIGNoZWNrIGlmIGFsbCB0aGUgZmllbGRzIHdlcmUgYmVpbmcgcGFzc2VkXG4gIGlmKCFlbWFpbCB8fCAhcGFzc3dvcmQgfHwgIW5hbWUpe1xuICAgIHJldHVybiByZXMuc2VuZCg0MjIsIHtlcnJvcjogXCJQbGVhc2UgZmlsbCBvdXQgYWxsIHRoZSBmaWVsZHNcIn0pO1xuICB9XG5cbiAgLy8gQ2hlY2sgZW1haWwgYWxyZWFkeSBleGlzdHNcbiAgVXNlci5maW5kT25lKHsgZW1haWw6IGVtYWlsfSwgZnVuY3Rpb24oZXJyLCBleGlzdGluZ1VzZXIpe1xuXG4gICAgaWYoZXJyKSB7IHJldHVybiBuZXh0KGVycik7IH1cblxuICAgIC8vIElmIGl0IGRvZXMsIHJldHVybiBcImV4aXN0aW5nIGFjY291bnRcIiBtZXNzYWdlXG4gICAgaWYoZXhpc3RpbmdVc2VyKXtcbiAgICAgIC8vIFJldHVybiB1bnByb2Nlc3NhYmxlIGVudGl0eVxuICAgICAgcmV0dXJuIHJlcy5zZW5kKDQyMiwgeyBlcnJvcjogJ0VtYWlsIGlzIGluIHVzZScgfSk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm90LCBjcmVhdGUgYW5kIHNhdmUgdXNlclxuICAgIHZhciB1c2VyID0gbmV3IFVzZXIoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICB9KTtcblxuICAgIHVzZXIuc2F2ZShmdW5jdGlvbihlcnIpe1xuICAgICAgaWYgKGVycikgeyByZXR1cm4gbmV4dChlcnIpOyB9XG5cbiAgICAgIC8vIFNlbmQgdXNlciBiYWNrIGEgSldUIHVwb24gc3VjY2Vzc2Z1bCBhY2NvdW50IGNyZWF0aW9uXG4gICAgICByZXMuanNvbih7IHRva2VuOiBnZW5lcmF0ZVRva2VuKHVzZXIpfSk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuXG5hcHAuZ2V0KCcvbG9nb3V0JywgbG9nb3V0KCksIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KXtcbiAgcmVzLnJlZGlyZWN0KCcvbG9naW4nKTtcbn0pO1xuXG4vLyBSb290IFBhdGhcbmFwcC5nZXQoJyonLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICBtYXRjaCh7IHJvdXRlcywgbG9jYXRpb246IHJlcS51cmwgfSwgKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCByZW5kZXJQcm9wcykgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyb3IubWVzc2FnZSlcbiAgICB9IGVsc2UgaWYgKHJlZGlyZWN0TG9jYXRpb24pIHtcbiAgICAgIHJlcy5yZWRpcmVjdCgzMDIsIHJlZGlyZWN0TG9jYXRpb24ucGF0aG5hbWUgKyByZWRpcmVjdExvY2F0aW9uLnNlYXJjaClcbiAgICB9IGVsc2UgaWYgKHJlbmRlclByb3BzKSB7XG4gICAgICAvLyBZb3UgY2FuIGFsc28gY2hlY2sgcmVuZGVyUHJvcHMuY29tcG9uZW50cyBvciByZW5kZXJQcm9wcy5yb3V0ZXMgZm9yXG4gICAgICAvLyB5b3VyIFwibm90IGZvdW5kXCIgY29tcG9uZW50IG9yIHJvdXRlIHJlc3BlY3RpdmVseSwgYW5kIHNlbmQgYSA0MDQgYXNcbiAgICAgIC8vIGJlbG93LCBpZiB5b3UncmUgdXNpbmcgYSBjYXRjaC1hbGwgcm91dGUuXG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChyZW5kZXJUb1N0cmluZyg8Um91dGVyQ29udGV4dCB7Li4ucmVuZGVyUHJvcHN9IC8+KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ05vdCBmb3VuZCcpXG4gICAgfVxuICB9KVxufSk7XG5cbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5hcHAubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coJ1NlcnZlciBub3cgbGlzdGVuaW5nIG9uIHBvcnQgJyArIHBvcnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcDsiXX0=