// This file contains client side authentication helper methods
// The server sends back JWT tokens when a login/sign up is successful
// It also sends back the full user object that you can use in your reducers
// To check for authentication, we store the token in localStorage, which
// automatically expires when the browser is closed (not tabs)

// Return a true/false whether localStorage token exists
export function loggedIn(){
  return !!localStorage.token;
}

// Deletes the localStorage token
// New tokens are sent every time a user logs in
export function logOut(){
  delete localStorage.token;
}

// Retrieves a given token from localStorage
export function retrieveToken(){
  return localStorage.token;
}

