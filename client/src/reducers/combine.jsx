import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import nameReducer from './nameReducer';
// import Redux from 'redux';

const rootReducer = combineReducers({
  salary: searchReducer,
  name : nameReducer
});

// module.exports = Redux.applyMiddleware(thunk)(logger)(Redux.createStore)(rootReducer);
// Reducer is a window - it will become what the state will become

export default rootReducer;