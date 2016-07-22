import React from 'react';
import { Link } from 'react-router';


const Logo = React.createClass({
  render: function() {
    return(
    <div>
      <div className="row logo-headline">
        <div className="left">
          <Link to='/'><h3 className="text-left">STACK SALARIES</h3></Link>
        </div>

        <div className="right">
          <button className="btn btn-primary login"><Link to='/login'>Dashboard</Link></button>
          <button className="btn btn-primary login"><Link to='/jobs'>Jobs</Link></button>

        </div>
      </div>
    </div>
    );
  }
});

export default Logo;
