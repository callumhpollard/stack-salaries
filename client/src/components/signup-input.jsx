import React from 'react';
import { Link } from 'react-router';

var SignupInput = (props) => (


  <div className="signup-input">
    <form onSubmit={props.SignUpToServer} >
      <div className="form-group">
      <h3><Link to='/' className="no-decoration">Stack Salaries</Link></h3>
      <input type="name" value={props.user} onChange={props.addUser} className="form-control" placeholder="Username" />
      </div>
      <div className="form-group">
      <input type="email" value={props.email} onChange={props.addEmail} className="form-control"  placeholder="Email" />
      </div>
      <div className="form-group">
      <input type="password" value={props.password} onChange={props.addPassword} className="form-control" placeholder="Password" />
      </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
)

export default SignupInput;