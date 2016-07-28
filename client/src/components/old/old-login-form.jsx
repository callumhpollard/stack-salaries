// Import all required modules
import React from 'react';
import $ from 'jquery';
import { History, Router } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import all actions & helper methods
import { setUserInfo } from '../actions/actionCreator';
import Flash from './flash';

// Import all needed components
import LoginInput from './login-input';
import Login from './login';
import AdvancedSearch from './advanced-search';


class LoginForm extends React.Component {
  constructor() {

    super();

    this.state = {
      email: "",
      password: "",
      authToken: null,
      hasError: false,
      errorType: "",
      errorMessage: ""
    };
  }

  changeUser(e) {
    this.setState({
      email: e.target.value
    });
  }

  changePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  redirectToDashboard(userData){
    if(userData.id){
      this.props.setUserInfo(userData);
      this.context.router.push('/dashboard');
    } else {
       this.setState({
          hasError: true,
          errorType: "alert alert-danger",
          errorMessage: "Please check your email and password and try again!"
        });
    }
  }

  loginToServer(e) {
    e.preventDefault();

    var data = {email: this.state.email, password: this.state.password};

    var self = this;

    $.ajax({
      url:"http://localhost:3000/signin",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        localStorage.setItem('token', data.token),
        self.setState({
          authToken: data.token,
        });
        self.redirectToDashboard(data.user);
      },
      error: function(err) {
        self.redirectToDashboard(err);
      }
    });
  }


  render() {


    var toggle = "hide";
    if(this.state.hasError){
        toggle = "";
     }

    return (
      <div className="loginMain">
        <div className={toggle}>
          <Flash type={this.state.errorType} message={this.state.errorMessage} />
        </div>
        <LoginInput history={this.props.history} loginToServer={this.loginToServer.bind(this)} changeUser={this.changeUser.bind(this)} changePassword={this.changePassword.bind(this)}/>
      </div>
    );
  }
}

LoginForm.contextTypes= {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUserInfo: setUserInfo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);