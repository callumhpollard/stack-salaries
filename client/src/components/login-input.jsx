import React from 'react';
import { Link } from 'react-router';


var LoginInput = (props) => (

<div className="loginBox">
  <div className="login-input">

    <form onSubmit={props.loginToServer} >
      <h3><Link to='/' className="no-decoration">Stack Salaries</Link></h3>
      <div className="form-group">
      <input type="email" value={props.email} onChange={props.changeUser} className="form-control" placeholder="email" />
      <small className="text-muted">We'll never share your email with anyone else.</small>
      </div>

      <div className="form-group">
      <input type="password" value={props.password} onChange={props.changePassword} className="form-control" placeholder="Password" />
      </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
</div>

)

export default LoginInput;