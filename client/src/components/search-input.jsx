import React from 'react';

var SearchInput = (props) => (

  <form className="flexcontainer" onSubmit={props.getDatafromServer}>
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Add your tech stack separated by commas"/>
      <input type="text" className="city form-control" placeholder="New York, NY"/>
      <button className="btn btn-primary"><span className="glyphicon glyphicon-search"></span>  Search</button>
    </div>
  </form>

);

export default SearchInput;