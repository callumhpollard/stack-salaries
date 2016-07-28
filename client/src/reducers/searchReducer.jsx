import { SET_SEARCH } from '../actions/actionCreator';

export default function(state = null, action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
  }
  return state;
}