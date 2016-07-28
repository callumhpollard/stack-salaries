import { SET_USERINFO } from '../actions/actionCreator';

export default function (state = null, action) {
  switch (action.type) {
    case SET_USERINFO:
      return action.payload;
    }
  return state;
}
