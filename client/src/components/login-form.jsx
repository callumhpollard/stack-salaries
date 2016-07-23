import React from 'react';
import $ from 'jquery';
import LoginInput from './login-input';
import Login from './login';
import { History } from 'react-router';
import { Router } from 'react-router';
import AdvanceSearch from './advance-search';
import Flash from './flash';

class LoginForm extends React.Component{
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

  redirectToDashboard(err){
    // this.context.router.push({token: dataToken}, '/dashboard');

    if(!err){
      this.context.router.push('/dashboard');
      // this.context.router.push('/advance-search');
    } else {
       this.setState({
          hasError: true,
          errorType: "alert alert-danger",
          errorMessage: "Please check your email and password and try again!"
        });
       console.log(this.state);
      // this.context.router.push('/login');
    }
    // this.props.history.pushState({token: dataToken}, '/jobs');
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
        // console.log(data.token);
        localStorage.setItem('token', data.token),
        self.setState({
          authToken: data.token,
        });
        console.log(data.token);
        self.redirectToDashboard();
      },
      error: function(err) {
        self.redirectToDashboard("meow");
      }
    });
  }


  render() {
     var toggle = "";
     if(this.state.hasError){
        toggle = "hide";
     }

    return (
      <div>
        <div className={toggle}>
          <Flash type={this.state.errorType} message={this.state.errorMessage} />
        </div>
        <LoginInput history={this.props.history} loginToServer={this.loginToServer.bind(this)} changeUser={this.changeUser.bind(this)} changePassword={this.changePassword.bind(this)} />
      </div>
    );
  }
}

LoginForm.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default LoginForm;
