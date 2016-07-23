export const SET_SEARCH = 'SET_SEARCH';
export const SET_USERINFO = 'SET_USERINFO';


export function setSearch(searchInput) {
  // console.log("Search Obj", searchInput);
  return {
    type: SET_SEARCH,
    payload: searchInput
  };
  // console.log("OUR ACTION ", JSON.stringify(results));
}

export function setUserInfo(userData)  {
  return {
    type: SET_USERINFO,
    payload: userData
  };
}