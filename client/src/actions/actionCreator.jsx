export const SET_SEARCH = 'SET_SEARCH';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_CITYSTATE = 'SET_CITYSTATE';


export function setSearch(searchInput) {
  // console.log("Search Obj", searchInput);
  return {
    type: SET_SEARCH,
    payload: searchInput
  };
  // console.log("OUR ACTION ", JSON.stringify(results));
}

export function setCityState(cityState) {
  // console.log("Search Obj", searchInput);
  return {
    type: SET_CITYSTATE,
    payload: cityState
  };
  // console.log("OUR ACTION ", JSON.stringify(results));
}

export function setUserInfo(userData)  {
  return {
    type: SET_USERINFO,
    payload: userData
  };
}