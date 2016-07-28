// Import all required modules
import React from 'react';
import { Link } from 'react-router';

var SignupInput = (props) => (

  <div className="loginbox center-block text-center">
    <form onSubmit={props.SignUpToServer} >
      <div className="row root">
        <h3><Link to='/' className="no-decoration">Stack Salaries</Link></h3>
      </div>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-user"></span>
        </div>

        <div className="col-sm-11">
          <input type="name" value={props.user} onChange={props.addUser} className="form-control" placeholder="Name" />
        </div>
      </fieldset>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-envelope"></span>
        </div>

        <div className="col-sm-11">
          <input type="email" value={props.email} onChange={props.addEmail} className="form-control" placeholder="Email" />
        </div>
      </fieldset>


      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-lock"></span>
        </div>

        <div className="col-sm-11">
          <input type="password" value={props.password} onChange={props.addPassword} className="form-control" placeholder="Password" />
        </div>
      </fieldset>

      <fieldset className="form-group row gray">
        <select
        className="center-block form-control fit"
        value={props.gender}
        onChange={props.addGender}
        >
          <option disabled selected>Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
      </fieldset>

      <div className="row">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>

    <div id="small-link" className="row">
        <p>Already have an account? <Link to='/login'>Log In</Link></p>
    </div>
  </div>
)

export default SignupInput;