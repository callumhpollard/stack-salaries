import React from 'react';
import Login from './login';
import Logo from './logo';
import Results from './results';
import Search from './search';
import Footer from './footer';
import Jobs from './jobs';
import AdvancedSearch from './advanced-search';
import { History } from 'react-router';
import { loggedIn } from '../auth/auth';


class Stats extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedIn: loggedIn()
    }
  }

  componentDidMount(){
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
          <Search/>
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
