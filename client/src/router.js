import React from 'react';
import { Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './components/main-layout';
import App from './components/app';
import Stats from './components/stats';
import Search from './components/search';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import Dashboard from './components/dashboard';
import AdvancedSearch from './components/advanced-search';
import Results from './components/results';
import Jobs from './components/jobs';
import Logout from './components/logout';
import { loggedIn, logOut } from './auth/auth';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={App} />

    <Route path="results">
      <IndexRoute component={Stats} />
    </Route>

    <Route path="login">
      <IndexRoute component={LoginForm} onEnter={loggedIn}/>
    </Route>

    <Route path="signup">
      <IndexRoute component={SignupForm} />
    </Route>

    <Route path="dashboard">
      <IndexRoute component={Dashboard}/>
    </Route>

     <Route path="advancedsearch">
      <IndexRoute component={AdvancedSearch} />
    </Route>

    <Route path="jobs">
      <IndexRoute component={Jobs} />
    </Route>

    <Route path="logout">
      <IndexRoute component={Logout} />
    </Route>

  </Route>
);
