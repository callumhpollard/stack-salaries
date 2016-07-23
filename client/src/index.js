import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './router';
import store from './reducers/combine';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/combine';

// const createStores = applyMiddleware(logger)(createStore);

ReactDOM.render(( <Provider store={createStore(reducers)}>
  <Router history={browserHistory}>
    {routes}
  </Router>
  </Provider>
), document.getElementById('app'));


