// Import all required modules
import { combineReducers } from 'redux';

// Import all needed components
import searchReducer from './searchReducer';
import userInfoReducer from './userInfoReducer';
import cityStateReduer from './cityStateReducer';

// The root reducer combines all reducers declared
// in the reducer directory
const rootReducer = combineReducers({
  salary: searchReducer,
  userInfo : userInfoReducer,
  cityState: cityStateReduer
});

export default rootReducer;