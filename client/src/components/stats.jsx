import React from 'react';
import Login from './login';
import Logo from './logo';
import Results from './results';
import Search from './search';
import Footer from './footer';
import { History } from 'react-router';

class Stats extends React.Component {

  constructor() {
    super();
  }

  componentDidMount(){
  }

  render() {
    return (
      <div>
        <Logo/>
        <Login/>
        <div>
          <Results history={this.props.history}/>
          <Search/>
          <Footer/>
        </div>
      </div>
    );

  }

}


export default Stats;
