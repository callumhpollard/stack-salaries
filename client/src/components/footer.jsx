import React from 'react';

const Footer = React.createClass({
  render: function() {
    return(
      <div className="footer text-center">
        <div className="row">
          <ul className="list-inline">
            <li>About</li>
            <li>Jobs</li>
            <li>Team Onix</li>
            <li>Contact</li>
          </ul>
          <p>2016 Stack Salaries</p>
        </div>
      </div>
    );
  }
});


export default Footer;
