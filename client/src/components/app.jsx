import React from 'react';
import Login from './login';
import Main from './main';
import Search from './search';
import Cloud from './cloud';

const App = React.createClass({
  render: function() {
    return (
      <div>
      <div className="container">
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
             <Login/>
          </nav>
          <Main/>

          <Search/>
          <Cloud/>

        </div>
      </div>
      <div className="art">
      </div>
      </div>
    );
  }
});

export default App;


             // <img className="bottom" src="./blueprint3.png" />
