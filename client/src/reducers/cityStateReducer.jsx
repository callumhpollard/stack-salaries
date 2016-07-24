import { SET_CITYSTATE } from '../actions/actionCreator';

export default function (state = null, action) {
  switch (action.type) {
    case SET_CITYSTATE:
      // console.log("Yo ur reducer did work", action.payload);
      return action.payload;
    }
    // console.log("Whats up your reducer didnt work", action.payload);
  return state;
}
