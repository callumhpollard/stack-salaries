import React from 'react';
import { Link } from 'react-router';


var LoginInput = (props) => (

<div className="loginbox center-block text-center">

    <form onSubmit={props.loginToServer} >
      <div className="row root">
        <h3><Link to='/' className="no-decoration">Stack Salaries</Link></h3>
      </div>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-envelope"></span>
        </div>

        <div className="col-sm-11">
          <input type="email" value={props.email} onChange={props.changeUser} className="form-control" placeholder="email" />
        </div>
      </fieldset>

      <fieldset className="form-group row">
        <small className="text-muted">We'll never share your email with anyone else.</small>
      </fieldset>

      <fieldset className="form-group row gray">
       <div className="col-sm-1">
        <span className="glyphicon glyphicon-lock"></span>
       </div>

        <div className="col-sm-11">
          <input type="password" value={props.password} onChange={props.changePassword} className="form-control" placeholder="Password" />
        </div>
      </fieldset>

      <div className="row">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>

    </form>
</div>

)

export default LoginInput;