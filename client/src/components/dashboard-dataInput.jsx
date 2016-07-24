import React from 'react';
import { Link } from 'react-router';


var DataInput = (props) => (

  <div className="data-input">
    <form onSubmit={props.inputData}>
      <input className="form-control" type="city" value={props.city} onChange={props.addCity} className="city-input" placeholder="City" />
      <input className="form-control" type="state" value={props.state} onChange={props.addState} className="state-input" placeholder="State" />
      <input className="form-control" type="education" value={props.education} onChange={props.addEducation} className="education-input" placeholder="Education" />
      <input className="form-control" type="experience" value={props.experience} onChange={props.addExperience} className="experience-input" placeholder="Experience" />
      <input className="form-control" type="salary" value={props.salary} onChange={props.addSalary} className="salary-input" placeholder="Salary" />
      <input className="form-control"  type="stack" value={props.stack} onChange={props.addStack} className="stack-input" placeholder="Stack" />
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>

);

export default DataInput;