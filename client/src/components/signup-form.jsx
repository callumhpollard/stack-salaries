import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import SignupInput from './signup-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo } from '../actions/actionCreator';

class SignForm extends React.Component{
  constructor() {

    super();

    this.state = {
      name: "",
      password: "",
      email: "",
      gender: "",
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

  addGender(e){
    this.setState({
      gender: e.target.value
    })
  }

 redirectToDashboard(userData){
    console.log("WHATS IN THIS " + JSON.stringify(userData));
    this.props.setUserInfo(userData.user);
    this.context.router.push('/dashboard');
  }


  SignUpToServer(e) {
    e.preventDefault();
    var self = this;

    var data = {name: this.state.name, email: this.state.email, password: this.state.password, gender: this.state.gender};

    $.ajax({
      url:"https://stacksalaries.herokuapp.com/signup",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(results) {
        console.log(data);
        localStorage.setItem('token', results.token),
        self.setState({
          authToken: results.token
        });
        self.redirectToDashboard(results);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <SignupInput SignUpToServer={this.SignUpToServer.bind(this)} addUser={this.addUser.bind(this)} addEmail={this.addEmail.bind(this)} addPassword={this.addPassword.bind(this)} addGender={this.addGender.bind(this)}/>
      </div>
    );
  }
}


SignForm.contextTypes= {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);