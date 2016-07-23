import React from 'react';
import Login from './login';
import Logo from './logo';
import Results from './results';
import Search from './search';
import Footer from './footer';
import Jobs from './jobs';
import AdvanceSearch from './advance-search';
import { History } from 'react-router';

class Stats extends React.Component {

  constructor() {
    super();
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="container results">
          <nav id="resultNav" className="navbar navbar-default navbar-fixed-top">
            <Logo/>
          </nav>
        <div>
          <div className="d3">
            <Results history={this.props.history}/>
          </div>
          <div>
            <p className="lead text-center">Related Jobs in Your Area</p>
            <Jobs />
          </div>
          <Search/>
          <Footer/>
        </div>
      </div>
    );

  }

}


export default Stats;
