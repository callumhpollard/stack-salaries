import React from 'react';
import { Link } from 'react-router';

var SearchInput = (props) => (

  <form className="flexcontainer" onSubmit={props.getDatafromServer}>
    <div className="input-group">
      <span className="glyphicon glyphicon-search"></span>

      <input
        type="text"
        className="form-control"
        value={props.stack}
        onChange={props.findStack}
        placeholder="Add your tech stack separated by commas"
      />

      <input
        type="text"
        id="searchTextField"
        className="city form-control"
        value={props.cityState}
        onChange={props.findCityState}
        placeholder="New York, NY"
      />

      <button className="btn btn-primary">Search</button>
    </div>
  </form>

);

export default SearchInput;