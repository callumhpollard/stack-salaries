import React from 'react';
import { Link } from 'react-router';

var Login = (props) => {

  return(
    <div>
        {props.loggedIn ? (
              <div>
                <button className="btn btn-primary login"><Link to='/dashboard'>Dashboard</Link></button>
                <button className="btn btn-primary login"><Link to='/logout'>Log Out</Link></button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary login"><Link to='/login'>Login</Link></button>
                <button className="btn btn-primary login"><Link to='/signup'>Sign Up</Link></button>
              </div>
        )}

    </div>
  );

}

export default Login;