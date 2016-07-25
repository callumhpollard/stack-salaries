import React from 'react';
import { Link } from 'react-router';


var DataInput = (props) => (

  <div className="dashboard center-block text-center">
    <form onSubmit={props.inputData}>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-globe"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.city} className="form-control" onChange={props.addCity} placeholder="City" />
        </div>

      </fieldset>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-globe"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.state} className="form-control" onChange={props.addState} placeholder="State" />

        </div>

      </fieldset>


      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-education"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.education} className="form-control" onChange={props.addEducation} placeholder="Education" />

        </div>

      </fieldset>


      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-briefcase"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.experience} className="form-control" onChange={props.addExperience} placeholder="Experience" />

        </div>

      </fieldset>


       <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-list-alt"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.position} className="form-control" onChange={props.addPosition} placeholder="Position" />

        </div>

      </fieldset>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-usd"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.salary} className="form-control" onChange={props.addSalary} placeholder="Salary" />

        </div>

      </fieldset>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-equalizer"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.stack} className="form-control" onChange={props.addStack} placeholder="Stack" />

        </div>

      </fieldset>

      <div className="row">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>

    </form>
  </div>

);


export default DataInput;

// <div className="loginbox center-block text-center">

//     <form onSubmit={props.loginToServer} >
//       <div className="row root">
//         <h3><Link to='/' className="no-decoration">Stack Salaries</Link></h3>
//       </div>

      // <fieldset className="form-group row gray">
      //   <div className="col-sm-1">
      //       <span className="glyphicon glyphicon-envelope"></span>
      //   </div>

      //   <div className="col-sm-11">
      //     <input type="email" value={props.email} onChange={props.changeUser} className="form-control" placeholder="email" />
      //   </div>

      // </fieldset>

//       <fieldset className="form-group">
//         <small className="text-muted">We'll never share your email with anyone else.</small>
//       </fieldset>

//       <fieldset className="form-group row gray">
//        <div className="col-sm-1">
//         <span className="glyphicon glyphicon-lock"></span>
//        </div>

//         <div className="col-sm-11">
//           <input type="password" value={props.password} onChange={props.changePassword} className="form-control" placeholder="Password" />
//         </div>
//       </fieldset>

      // <div className="row">
      //   <button type="submit" className="btn btn-primary">Submit</button>
      // </div>

//       <div id="small-link" className="row">
//         <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
//       </div>

//     </form>
// </div>
