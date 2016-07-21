import React from 'react';
import $ from 'jquery';
import SearchInput from './search-input';
import { History } from 'react-router';
import { Router } from 'react-router';

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
    })
  }

  redirectToResults(){
    window.salary = this.state.salary;
    this.props.history.pushState({salary:this.state.salary}, '/results');
  }

  getDatafromServer(e) {
    e.preventDefault();

    var self = this;
    var cityState = this.state.cityState.split(", ");

    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN
    var data = {stack: this.state.stack, city: cityState[0].toLowerCase(), state:cityState[1].toLowerCase()};


    $.ajax({
      url:"http://localhost:3000/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary: data
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

export default Search;