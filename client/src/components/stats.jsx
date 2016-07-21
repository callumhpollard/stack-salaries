import React from 'react';
import Login from './login';
import Logo from './logo';
import Results from './results';
import Search from './search';
import Footer from './footer';

class Stats extends React.Component {

  componentDidMount(){
  }

  render() {
    return (
      <div>
        <Logo/>
        <Login/>
        <div>
          <Results/>
          <Search/>
          <Footer/>
        </div>
      </div>
    );

  }

}


export default Stats;
