import React from 'react';

const LoginForm = React.createClass({
  constructor() {
    this.state = {
      user: '',
      password: '',
      authToken: ''
    };
  }
  loginToServer (user, password) {
    $.ajax({
      url:'http://localhost:3000/signin',
      type:'POST',
      contentType:"application/json",
      data: {name: user, password: password}
      success: function(data) {
        this.setState({
          authToken: data;
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

  render: function() {
    return (
      <form role="form">
      <div className="form-group">
        <input type="text" valueLink={this.loginToServer('user')} placeholder="Username" />
        <input type="password" valueLink={this.loginToServer('password')} placeholder="Password" />
      </div>
      <button type="submit" onClick={this.login.bind(this)}>Submit</button>
      </form>
    );
  }
});

export default LoginForm;
