import React from 'react';
import { Link } from 'react-router';


var DataInput = (props) => (

  <div className="data-input">
    <form>
      <input type="name" value={props.user} onChange={props.addUser} className="signup-user" placeholder="Username" />
      <input type="email" value={props.email} onChange={props.addEmail} className="signup-email" placeholder="Email" />
      <input type="password" value={props.password} onChange={props.addPassword} className="signup-password" placeholder="Password" />
    <button type="submit">Submit</button>
    </form>
  </div>

);

export default DataInput;