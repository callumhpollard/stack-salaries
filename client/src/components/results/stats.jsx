// Import all required modules
import React from 'react';
import { History } from 'react-router';

// Import all actions & helper methods
import { loggedIn } from '../../auth/auth';

// Import all needed components
import Login from '../authentication/login';
import Logo from '../navigation/logo';
import Footer from '../layout/footer';

// Import all containers
import Jobs from '../../containers/jobs';
import Search from '../../containers/search';
import Results from '../../containers/results';
import AdvancedSearch from '../../containers/advanced-search';

class Stats extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedIn: loggedIn()
    }
  }

  render() {
    return (
      <div className="container results">
          <nav id="resultNav" className="navbar navbar-default navbar-fixed-top">
            <Logo loggedIn={this.state.loggedIn} />
          </nav>
        <div>
          <div className="d3">
            <Results history={this.props.history}/>
          </div>
          <div className="inner-search">
            <p className="lead text-center">Another Search?</p>
            <Search/>
          </div>
          <div>
            <p className="lead text-center">Related Jobs in Your Area</p>
            <Jobs />
          </div>
          <Footer/>
        </div>
      </div>
    );

  }

}


export default Stats;
