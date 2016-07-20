import React from 'react';
import { Link } from 'react-router';


var Userprofile = (props) => (

  <div className="userprofile">
    <p> USER PROFILE </p>
    <p> {props.bio} </p>
    <p> Bio: {props.bio} </p>
  </div>

);

export default Userprofile;