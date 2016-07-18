import React from 'react';
import { Link } from 'react-router';

const Login = React.createClass({
  render: function() {
    return(
      <div>
      <button className="btn btn-primary login"><Link to='/login'>Login</Link></button>
      </div>
    );
  }
});

export default Login;
