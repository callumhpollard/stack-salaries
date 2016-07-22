import React from 'react';
import JobsItem from './jobs-item';

var JobsList = (props) => {
  if(props.jobs){
    return (
      <div>
          {props.jobs.map((job) => <JobsItem job={job} />)}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
export default JobsList;