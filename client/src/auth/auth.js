// Return a true/false whether localStorage token exists
export function loggedIn(){
  return !!localStorage.token;
}

// Deletes the localStorage token
// New tokens are sent every time a user logs in
export function logOut(){
  delete localStorage.token;
}

export function retrieveToken(){
  return localStorage.token;
}

