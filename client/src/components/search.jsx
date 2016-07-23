import React from 'react';
import $ from 'jquery';
import SearchInput from './search-input';
import { History } from 'react-router';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearch } from '../actions/actionCreator';
// import Results from './results';

// containers are glorfied components - containers have access to redux
class Search extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: [],
      cityState: "",
      salary: {}
    };
  }

  findCityState(e) {
    this.setState({
      cityState: e.target.value
    });
  }

  findStack(e) {
    this.setState({
      stack: e.target.value
    });
  }

  redirectToResults(salaryresults){
    // window.salary = this.state.salary;
    // var data = {stack: this.state.stack, city: cityState[0].toLowerCase(), state:cityState[1].toLowerCase()};
    // var self = this;
    this.props.setSearch(this.state.salary);
    // this.props.history.pushState(null, '/results');
    this.context.router.push('/results');

    // window.location.hash = string
    // #/key
    // {salary:this.state.salary}
    // console.log(this.state.salary);
  }


  getDatafromServer(e) {
    e.preventDefault();

    var self = this;
    var cityState = this.state.cityState.split(", ");

    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN
    // .toLowerCase()
    var data = {stack: this.state.stack, city: cityState[0], state:cityState[1]};

    $.ajax({
      url:"http://localhost:3000/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary: data
        });

        self.redirectToResults(data);
      },
      error: function(err) {
        console.log(err);
      }
    });

  }

  render() {
    return (
      <div>
        <SearchInput history={this.props.history} getDatafromServer={this.getDatafromServer.bind(this)} findStack={this.findStack.bind(this)} findCityState={this.findCityState.bind(this)} />
      </div>
    );
  }
};

Search.contextTypes = {
  router: React.PropTypes.object.isRequired
};

  function mapStateToProps(state) {
    return {
      // stack: state.stack,
      // cityState: state.cityState,
      salary : state.salary
    }
  }


function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearch: setSearch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);