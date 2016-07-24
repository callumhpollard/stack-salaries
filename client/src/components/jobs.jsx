import React from 'react';
import $ from 'jquery';
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
import JobsList from './jobs-list';
import { connect } from 'react-redux';
import search from './search';
import { bindActionCreators } from 'redux';
import { setSearch, setCityState } from '../actions/actionCreator';

class Jobs extends React.Component {

  constructor(props) {
    super(props);

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
  var query = {publisher: "5453642953934453", format:"json", q: "javascript", l: `${this.props.cityState.cityForJob}, ${this.props.cityState.stateForJob}`, v: 2}


  console.log(query);
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


function mapStateToProps(state) {
  return {
    cityState: state.cityState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearch: setSearch, setCityState:setCityState}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
// export default Results;