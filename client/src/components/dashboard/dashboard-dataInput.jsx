import React from 'react';
import { Link } from 'react-router';


var DataInput = (props) => (

  <div className="dashboard center-block text-center">
    <form onSubmit={props.inputData}>

      <div className="row">
        <h3>Add a Salary</h3>
      </div>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-globe"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.city} className="form-control" onChange={props.addCity} placeholder="Add your city" />
        </div>

      </fieldset>

      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-globe"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.state} className="form-control" onChange={props.addState} placeholder="Add your state" />

        </div>

      </fieldset>


      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-education"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.education} className="form-control" onChange={props.addEducation} placeholder="Add your education level" />

        </div>

      </fieldset>


      <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-briefcase"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.experience} className="form-control" onChange={props.addExperience} placeholder="Years of experience" />
        </div>

      </fieldset>

       <fieldset className="form-group row gray">
        <div className="col-sm-1">
            <span className="glyphicon glyphicon-list-alt"></span>
        </div>

        <div className="col-sm-11">
          <input type="text" value={props.position} className="form-control" onChange={props.addPosition} placeholder="Position title" />

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
          <input type="text" value={props.stack} className="form-control" onChange={props.addStack} placeholder="Add any stack skills separated by commas" />
        </div>
      </fieldset>

      <div className="row">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>

    </form>
  </div>

);


export default DataInput;