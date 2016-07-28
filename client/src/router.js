// Import all required modules
import React from 'react';
import { Route, browserHistory, IndexRoute } from 'react-router';

// Import all actions & helper methods
import { loggedIn, logOut } from './auth/auth';

// Import all components
import MainLayout from './components/main-layout';
import Stats from './components/stats';
import Logout from './components/logout';

// Import all containers
import App from './containers/app';
import Jobs from './containers/jobs';
import Dashboard from './containers/dashboard';
import SignupForm from './containers/signup-form';
import LoginForm from './containers/login-form';
import Search from './containers/search';
import Results from './containers/results';
import AdvancedSearch from './containers/advanced-search';

// The react router renders components based on
// desired path
export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={App} />

    <Route path="results">
      <IndexRoute component={Stats} />
    </Route>

    <Route path="login">
      <IndexRoute component={LoginForm}/>
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
