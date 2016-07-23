import React from 'react';
import $ from 'jquery';
import LoginInput from './login-input';
import Login from './login';
import { History } from 'react-router';
import { Router } from 'react-router';

class LoginForm extends React.Component{
  constructor() {

    super();

    this.state = {
      email: "",
      password: "",
      authToken: ""
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

  redirectToDashboard(dataToken){
    // this.context.router.push({token: dataToken}, '/dashboard');
    this.props.history.pushState({token: dataToken}, '/jobs');
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
        self.redirectToDashboard(data.token);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }


  render() {
    return (
      <div>
        <LoginInput history={this.props.history} loginToServer={this.loginToServer.bind(this)} changeUser={this.changeUser.bind(this)} changePassword={this.changePassword.bind(this)} />
      </div>
    );
  }
}

LoginForm.contextTypes= {
  router: React.PropTypes.object.isRequired
};

export default LoginForm;
