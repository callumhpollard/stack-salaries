import { SET_CITYSTATE } from '../actions/actionCreator';

export default function (state = null, action) {
  switch (action.type) {
    case SET_CITYSTATE:
      return action.payload;
    }
  return state;
}
