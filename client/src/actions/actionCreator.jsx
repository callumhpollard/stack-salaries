

export const SET_SEARCH = 'SET_SEARCH';


export function setSearch(searchInput) {
  console.log("Search Obj", searchInput);
  var results ={
    type: SET_SEARCH,
    payload: searchInput
  };
  console.log("OUR ACTION ", JSON.stringify(results));
  return results;
}