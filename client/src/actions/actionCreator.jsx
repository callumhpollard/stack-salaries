// These constants are used in different reducers
// Using a constant ensures you'll only need to change
// a string value in one place - easier to maintain
export const SET_SEARCH = 'SET_SEARCH';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_CITYSTATE = 'SET_CITYSTATE';

export function setSearch(searchInput) {
  return {
    type: SET_SEARCH,
    payload: searchInput
  };
}

export function setCityState(cityState) {
  return {
    type: SET_CITYSTATE,
    payload: cityState
  };
}

export function setUserInfo(userData)  {
  return {
    type: SET_USERINFO,
    payload: userData
  };
}