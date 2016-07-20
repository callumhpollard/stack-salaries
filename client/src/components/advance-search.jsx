import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import AdvanceSearchInput from './advance-searchInput';

class AdvanceSearch extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: [],
      city: "",
      state: "",
      education: "",
      gender: "",
      experience: "",
      salary: {}
    };
  }

  findCity(e) {
    this.setState({
      city:e.target.value
    });
  }

  findState(e) {
    this.setState({
      state:e.target.value
    });
  }

  findEducation(e) {
    this.setState({
      education:e.target.value
    });
  }

  findGender(e) {
    this.setState({
      gender:e.target.value
    });
  }

  findExperience(e) {
    this.setState({
      experience:e.target.value
    });
  }

  findStack(e) {
    this.state.stack.push(e.target.value);
  }

  redirectToResults(){
    this.context.router.push({salary:this.stack.salary}, '/results');
  }

  GetAdvanceSearchData(e) {
    e.preventDefault();
    console.log(this.state.stack[this.state.stack.length - 1]);
    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN
    this.state.cityState = this.state.cityState.split(", ");
    var data = {stack: this.state.stack[this.state.stack.length - 1], city: this.state.cityState[0].toLowerCase(), state:this.state.cityState[1].toLowerCase()};

    var self = this;
    console.log(data);

    $.ajax({
      url:"http://localhost:3000/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary:data
        });
        console.log("SALARY " + self.state.salary.highest);
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
        <AdvanceSearchInput GetAdvanceSearchData={this.GetAdvanceSearchData.bind(this)} findStack={this.findStack.bind(this)} findCity={this.findCity.bind(this)} findState={this.findState.bind(this)} findEducation={this.findEducation.bind(this)} findGender={this.findGender.bind(this)} findExperience={this.findExperience.bind(this)} />
      </div>
    );
  }
};

AdvanceSearch.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default AdvanceSearch;