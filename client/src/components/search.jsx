import React from 'react';
import $ from 'jquery';
import SearchInput from './search-input';

class Search extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: "",
      city: "",
      state: "",
      salary:[]
    };
  }

  findStack(e) {
    this.setState({
      stack: e.target.value
    });
  }

  findCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  findState(e) {
    this.setState({
      state: e.target.value
    });
  }

  getDatafromServer(e) {
    e.preventDefault();

    var data = {stack: this.state.stack, city: this.state.city, state: this.state.state};
    var self = this;
    // console.log(data);
    $.ajax({
      url:"http://localhost:3000/stackdata",
      type:"GET",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary: data
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <SeachInput getDatafromServer={this.getDatafromServer.bind(this)} findStack={this.findStack.user(this)} findCity={this.findCity.user(this)} findState={this.findState.user(this)}/>
      </div>
    );
  }
};

export default Search;