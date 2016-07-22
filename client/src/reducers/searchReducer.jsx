import { SET_SEARCH } from '../actions/actionCreator';

export default function(state, action){
  var newState = Object.assign({}, state);
  switch (action.type) {
    case SET_SEARCH:
      return newState(action.payload);
  }
  return state;
}