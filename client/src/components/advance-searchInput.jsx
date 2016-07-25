import React from 'react';
import { Link } from 'react-router';

var AdvancedSearchInput = (props) => (

  <div className="signup-input">
    <form onSubmit={props.GetAdvancedSearchData} >
      <input type="city" value={props.city} onChange={props.findCity} className="city-input" placeholder="City" />
      <input type="state" value={props.state} onChange={props.findState} className="state-input" placeholder="State" />
      <input type="education" value={props.education} onChange={props.findEducation} className="education-input" placeholder="Education" />
      <input type="gender" value={props.gender} onChange={props.findGender} className="gender-input" placeholder="Gender" />
      <input type="experience" value={props.experience} onChange={props.findExperience} className="experience-input" placeholder="Experience" />
      <input type="stack" value={props.stack} onChange={props.findStack} className="stack-input" placeholder="Stack" />
    <button type="submit">Submit</button>
    </form>
  </div>

);

export default AdvancedSearchInput;


