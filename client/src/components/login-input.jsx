import React from 'react';

var LoginInput = (props) => (

  <div className="login-input">
    <form onSubmit={props.loginToServer} >
      <input type="email" value={props.email} onChange={props.changeUser} className="login-user" placeholder="email" />
      <input type="password" value={props.password} onChange={props.changePassword} className="login-password" placeholder="Password" />
    <button type="submit">Submit</button>
    </form>
  </div>

)

export default LoginInput;