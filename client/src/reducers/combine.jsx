import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import Redux from 'redux';

const rootReducer = combineReducers({
  search: searchReducer
});

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(rootReducer);