import React from 'react';
import { Link } from 'react-router';


var Userprofile = (props) => (

  <div className="userprofile">
    <p> USER PROFILE </p>
      {props.bio.avatar_url && <li className="list-group-item"> <img src={props.bio.avatar_url} className="img-rounded img-responsive"/></li>}
      {props.bio.name && <li className="list-group-item">Name: {props.bio.name}</li>}
      {props.bio.login && <li className="list-group-item">Username: {props.bio.login}</li>}
      {props.bio.email && <li className="list-group-item">Email: {props.bio.email}</li>}
      {props.bio.location && <li className="list-group-item">Location: {props.bio.location}</li>}
      {props.bio.company && <li className="list-group-item">Company: {props.bio.company}</li>}
  </div>

);



export default Userprofile;