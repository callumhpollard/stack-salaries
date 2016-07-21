import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import SignupInput from './signup-input';


class SignForm extends React.Component{
  constructor() {

    super();

    this.state = {
      name: "",
      password: "",
      email: "",
      authToken: ""
    };
  }

  addUser(e) {
    this.setState({
      name: e.target.value
    });
  }

  addPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  addEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

 redirectToDashboard(dataToken){
<<<<<<< HEAD
    this.context.router.push(null, '/results');
=======
    this.props.history.pushState({token: dataToken}, '/dashboard');
<<<<<<< HEAD
    // this.context.router.push(null, '/results');
>>>>>>> 4bb18f8603293f2bcdc29db9247561a88fdd5717
=======
>>>>>>> 5c6215621b03cbb0632b65186cc1fc6b19dfebb4
  }


  SignUpToServer(e) {
    e.preventDefault();
    var self = this;

    var data = {name: this.state.name, email: this.state.email, password: this.state.password};

    // console.log(data);
    $.ajax({
      url:"http://localhost:3000/signup",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        // console.log(data.token);
        localStorage.setItem('token', data.token),
        self.setState({
          authToken: data.token
        });
<<<<<<< HEAD
        self.redirectToDashboard();
=======
        self.redirectToDashboard(data.token);
>>>>>>> 4bb18f8603293f2bcdc29db9247561a88fdd5717
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <SignupInput SignUpToServer={this.SignUpToServer.bind(this)} addUser={this.addUser.bind(this)} addEmail={this.addEmail.bind(this)} addPassword={this.addPassword.bind(this)} />
      </div>
    );
  }
}

export default SignForm;