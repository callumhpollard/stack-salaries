import React from 'react';

const Search = React.createClass({
  render: function() {
    return (
      <div>
        <input type='text' id='stacks'/>
        <input type='text' id='location'/>
        <button>Search</button>
      </div>
    );
  }
});

export default Search;
