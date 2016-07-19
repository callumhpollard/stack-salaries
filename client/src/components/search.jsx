import React from 'react';

const Search = React.createClass({
  render: function() {
    return (
      <div>
        <form className="flexcontainer">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Add your tech stack separated by commas"/>
          <input type="text" className="city form-control" placeholder="New York, NY"/>
          <button className="btn btn-primary"><span className="glyphicon glyphicon-search"></span>Search</button>
        </div>


        </form>
      </div>
    );
  }
});

export default Search;