import React from 'react';
import Login from './login';
import Main from './main';
import Search from './search';
import Cloud from './cloud';
import { Link } from 'react-router';



class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <div id="main" className="front">
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <Login />
          </nav>
          <Main/>

          <Search history={this.props.history}/>
          <Cloud/>


        </div>
      </div>
      <div className="art">
      </div>
      </div>
    );
  }


}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;

          // <button className="btn btn-primary login"><Link to='/jobs'>Jobs</Link></button>
