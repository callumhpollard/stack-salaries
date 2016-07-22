import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './router';
import store from './reducers/combine';


ReactDOM.render(( <Provider store={store}>
  <Router history={browserHistory}>
    {routes}
  </Router>
  </Provider>
), document.getElementById('app'));


