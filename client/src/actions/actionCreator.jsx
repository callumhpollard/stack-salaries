

export const SET_SEARCH = 'SET_SEARCH';
export const SET_NAME = 'SET_NAME';


export function setSearch(searchInput) {
  // console.log("Search Obj", searchInput);
  return {
    type: SET_SEARCH,
    payload: searchInput
  };
  // console.log("OUR ACTION ", JSON.stringify(results));
}

// export function setName()  {
//   return {
//     type: SET_NAME,
//     payload:
//   };
// }