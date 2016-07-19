import React from 'react';
import $ from 'jquery';
import SearchInput from './search-input';

class Search extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: "",
      cityState: "",
      salary:[]
    };
  }


  findCityState(e) {
    this.setState({
      cityState:e.target.value
    });
  }

  findStack(e) {
    this.setState({
      stack:e.target.value
    });
  }


  getDatafromServer(e) {
    e.preventDefault();
    this.state.cityState = this.state.cityState.split(", ");
    var data = {stack: this.state.stack, city: this.state.cityState[0], state:this.state.cityState[1]};

    var self = this;
    console.log(data);

    $.ajax({
      url:"http://localhost:3000/stackdata",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.state.salary.push(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }


  render() {
    return (
      <div>
        <SearchInput getDatafromServer={this.getDatafromServer.bind(this)} findStack={this.findStack.bind(this)} findCityState={this.findCityState.bind(this)} />
      </div>
    );
  }
};

export default Search;