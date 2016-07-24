import React from 'react';
import $ from 'jquery';
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
import JobsList from './jobs-list';

class Jobs extends React.Component {

  constructor() {
    super();

    this.state = {
      jobs: [],
      serialized: []
    };
  }

  componentWillMount(){
    this.getJobs();
  }

  getJobs(){

  var self = this;

  // Our query parameters
  var query = {publisher: "5453642953934453", format:"json", q: "javascript", l: "Austin, TX", v: 2}

    $.ajax({
      data: query,
      dataType: 'jsonp',
      type: 'GET',
      timeout: 5000,
      url: 'http://api.indeed.com/ads/apisearch',
      success: function(result){
        self.setState({
          jobs: result.results
        });
      },
      error: function(err){
        console.log(err);
      }
    });

  }



  render() {
    return (
      <div className="row">
          <div id="jobs">
            <JobsList jobs={this.state.jobs}/>
          </div>
      </div>
    );
  }

}

export default Jobs;