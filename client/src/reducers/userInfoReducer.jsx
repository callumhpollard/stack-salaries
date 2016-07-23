import { SET_USERINFO } from '../actions/actionCreator';

export default function (state = null, action) {
  switch (action.type) {
    case SET_USERINFO:
      // console.log("Yo ur reducer did work", action.payload);
      return action.payload;
    }
    // console.log("Whats up your reducer didnt work", action.payload);
  return state;
}
