import React from 'react';
import $ from 'jquery';
import LoginInput from './login-input';

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

  loginToServer(e) {
    e.preventDefault();

    var data = {email: this.state.email, password: this.state.password};
    var self = this;
    console.log(data);
    $.ajax({
      url:"http://localhost:3000/signin",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data.token);
        localStorage.setItem('token', data.token),
        self.setState({
          authToken: data.token,
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  // May or may not need this method.
  // userAuthToken (callback) {
  //   $.ajax({
  //     url:"http://localhost:3000/results",
  //     type:"GET",
  //     contentType:"application/json",
  //     beforeSend: function(xhr) {
  //       xhr.setRequestHeader("Authorization", 'Basic', btoa(this.state.authToken));
  //     },
  //     success: callback,
  //     error: function(err) {
  //       console.log(err);
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <LoginInput loginToServer={this.loginToServer.bind(this)} changeUser={this.changeUser.bind(this)} changePassword={this.changePassword.bind(this)} />
      </div>
    );
  }
}

export default LoginForm;