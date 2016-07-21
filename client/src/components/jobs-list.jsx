import React from 'react';
import JobsItem from './jobs-item';

var JobsList = (props) => {
  return (
    <div>
      {props.jobs.jobs.map((job) => <JobsItem job={job} />)}
    </div>
  )
}

export default JobsList;