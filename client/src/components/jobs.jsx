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

  parseJobs(){

    // This binding
    var self = this;

    // Replace that random hex bug
    var data = this.state.serialized.replace("\ufeff", "");

    // Parse the serialized XML string and assign it to the jobs state
    parser.parseString(data, function (err, result) {
       self.setState({
          jobs: result.response.results[0].result
        });
    });
  }

  getJobs(){

    // This binding
    var self = this;

    // Declare a new instance of the XMLSerializer
    var serializer = new XMLSerializer();

    // Our query parameters
    var query = {publisher: "5453642953934453", q: "javascript", l: "Austin, TX", v: 2}

    // GET request to fetch the jobs
    $.ajax({
      url:"http://api.indeed.com/ads/apisearch",
      type:"GET",
      contentType:"application/xml",
      data: query,
      success: function(results) {
        // If successful, serialize the XML result
        var serializedData = serializer.serializeToString(results);

        // Set the jobs array to the serialized data
         self.setState({
          serialized: serializedData
        });

        // Call the parser so we can parse the string
        // into an object we can use
         self.parseJobs();
      },
      error: function(err) {
        throw err;
      }
    });
  }



  render() {
    return (
      <div>
        <h1>Jobs</h1>
          <JobsList jobs={this.state.jobs}/>
      </div>
    );
  }

}

export default Jobs;