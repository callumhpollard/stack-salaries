// if i click on a button lets call the action action
// its creates an action (an object that has a type and a payload)
// actions get sent to the reducer --> reducer accepts anything the actions give it

export const SET_SEARCH = 'SET_SEARCH';


export function setSearch(searchInput) {
  console.log("Search Obj", searchInput);
  return {
    type: SET_SEARCH,
    payload: searchInput.salary
  };
}