import React from 'react';

var LoginInput = (props) => (


  <div className="login-input">
    <form onSubmit={props.loginToServer} >
      <input type="text" value={props.user} onChange={props.changeUser} className="login-user" placeholder="Username" />
      <input type="password" value={props.password} onChange={props.changePassword} className="login-password" placeholder="Password" />
    <button type="submit">Submit</button>
    </form>
  </div>
)

export default LoginInput;