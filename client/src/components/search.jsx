import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import SearchInput from './search-input';

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
      cityState:e.target.value
    });
  }

  findStack(e) {
    this.state.stack.push(e.target.value);
  }

  redirectToResults(){
    // this.props.history.pushState({salary:this.state.salary}, '/results');
    // this.props.history.pushstate({salary:this.stack.salary}, '/results');
    // this.context.router.push('/results');
    this.context.router.push({salary:this.state.salary}, '/dashboard');
  }

  getDatafromServer(e) {
    e.preventDefault();

    var self = this;
    var cityState = this.state.cityState;

    console.log(cityState.split(", "));

    // console.log(this.state.stack[this.state.stack.length - 1]);
    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN

    // var split = this.state.cityState.split(", ");

    this.state.cityState = split;

    var data = {stack: this.state.stack[this.state.stack.length - 1], city: this.state.cityState[0].toLowerCase(), state:this.state.cityState[1].toLowerCase()};


    $.ajax({
      url:"http://localhost:3000/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary:data
        });
        self.redirectToResults();
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
}

export default Search;