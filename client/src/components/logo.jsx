import React from 'react';
import { Link } from 'react-router';


var Logo = (props) => {
  console.log(props);
  return(
    <div>
      <div className="row logo-headline">
        <div className="left">
          <Link to='/'><h3 className="text-left">STACK SALARIES</h3></Link>
        </div>

        <div className="right">
          {props.loggedIn ? (
              <div>
                <button className="btn btn-primary login"><Link to='/dashboard'>Dashboard</Link></button>
                <button className="btn btn-primary login"><Link to='/advancedsearch'>Advanced Search</Link></button>
                <button className="btn btn-primary login"><Link to='/logout'>Log Out</Link></button>
              </div>
            ) : (
              <div>
                <button className="btn btn-primary login"><Link to='/login'>Login</Link></button>
                <button className="btn btn-primary login"><Link to='/signup'>Sign Up</Link></button>
              </div>
          )}
        </div>
      </div>
    </div>
    );
}

export default Logo;


