import React from 'react';
import { Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './components/main-layout';
import App from './components/app';
import Stats from './components/stats';
import Search from './components/search';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import Dashboard from './components/dashboard';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={App} />

    <Route path="results">
      <IndexRoute component={Stats} />
    </Route>

    <Route path="login">
      <IndexRoute component={LoginForm} />
    </Route>

    <Route path="signup">
      <IndexRoute component={SignupForm} />
    </Route>

    <Route path="dashboard">
      <IndexRoute component={Dashboard} />
    </Route>

  </Route>
);
