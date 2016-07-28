import React from 'react';
import $ from 'jquery';

var JobsItem = (props) => {
  // API sends description back without escaping tags
  // A quick reg ex to sanitize the description
  const description = props.job.snippet.replace(/<\/?[^>]+(>|$)/g, "");

  return(
    <div className="col-md-4" key={props.job.jobkey}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title text-center">{props.job.jobtitle}</div>
          <div className="text-center">@ {props.job.company}</div>
        </div>
        <div className="panel-body">
          <p>{description}</p>
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
