import { SET_SEARCH } from '../actions/actionCreator';

export default function(state=null, action) {
  // var newState = Object.assign({}, state);
  // newState(
  console.log("THIS IS THE ACTION TYPE " + action.type);
  switch (action.type) {
    case SET_SEARCH:
    console.log("Yo ur reducer did work", action.payload);
      return action.payload;
  }
  console.log("Whats up your reducer didnt work", action.payload);
  return state;
}