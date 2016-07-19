import React from 'react';
import $ from 'jquery';
import SearchInput from './search-input';

class Search extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: "",
      city: "",
      state: ""
    };
  }

  getDatafromServer(e) {
    e.preventDefault();

    var data = {this.state.};
    var self = this;
    console.log(data);
    $.ajax({
      url:"http://localhost:3000/stackdata",
      type:"GET",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({

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
        <SeachInput />
      </div>
    );
  }
};

export default Search;