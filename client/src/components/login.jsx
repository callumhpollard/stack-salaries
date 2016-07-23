import React from 'react';
import { Link } from 'react-router';

const Login = React.createClass({
  render: function() {
    return(
      <div>
      <button className="btn btn-primary login"><Link to='/login'>Login</Link></button>
      <button className="btn btn-primary login"><Link to='/signup'>Sign Up</Link></button>
      <button className="btn btn-primary login"><Link to='/dashboard'>Dashboard</Link></button>
      <button className="btn btn-primary login"><Link to='/advance-search'>Advance Search</Link></button>
      </div>
    );
  }
});

export default Login;
