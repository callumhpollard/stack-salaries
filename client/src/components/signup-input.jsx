import React from 'react';

var SignupInput = (props) => (


  <div className="loginBox center-block text-center">
    <form onSubmit={props.SignUpToServer} >
      <input type="name" value={props.user} onChange={props.addUser} className="signup-user" placeholder="Username" />
      <input type="email" value={props.email} onChange={props.addEmail} className="signup-email" placeholder="Email" />
      <input type="password" value={props.password} onChange={props.addPassword} className="signup-password" placeholder="Password" />
    <button type="submit">Submit</button>
    </form>
  </div>
)

export default SignupInput;