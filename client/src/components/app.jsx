import React from 'react';
import Login from './login';
import Main from './main';
import Search from './search';
import Cloud from './cloud';
import { Link } from 'react-router';
import { loggedIn } from '../auth/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo } from '../actions/actionCreator';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedIn: loggedIn()
    }
  }

  render() {
    return (
      <div>
      <div id="main" className="front">
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <Login loggedIn={this.state.loggedIn} userInfo={this.props.userInfo}/>
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

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUserInfo: setUserInfo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
