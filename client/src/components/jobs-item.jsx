import React from 'react';

var JobsItem = (props) => {
  return(
    <div className="col-md-4">
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title text-center">{props.job.jobtitle[0]}</div>
          <div className="text-center">@ {props.job.company[0]}</div>
        </div>
        <div className="panel-body">
          <p>{props.job.snippet[0]}</p>
          <p className="text-center"><a href={props.job.url}>Click to Read More</a></p>
        </div>
        <div className="panel-footer text-center">
          <span className="glyphicon glyphicon-time"></span> {props.job.date}
        </div>
      </div>
    </div>
  )

}
export default JobsItem;
