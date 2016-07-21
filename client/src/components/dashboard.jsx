import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import UserProfile from './dashboard-userprofile';
import DataInput from './dashboard-datainput';


class Dashboard extends React.Component {

  constructor (props){
    super();
    this.state = {
      bio:{},
      state:'',
      city: '',
      salary: null,
      education: '',
      gender: '',
      experience: '',
      stack: []
    };
  }
  componentDidMount(){
<<<<<<< HEAD
    // console.log(this.props.location.state);
=======
<<<<<<< HEAD

    console.log(this.props.location.state);
=======
    // console.log(this.props.location.state);
>>>>>>> 5c6215621b03cbb0632b65186cc1fc6b19dfebb4
>>>>>>> RoutesAndRedux
  }


  StackEntry(e) {
    e.preventDefault();
    var self = this;

    var data = {name: this.state.name, email: this.state.email, password: this.state.password};

    console.log(data);
    $.ajax({
      url:"http://localhost:3000/signup",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data.token);
        localStorage.setItem('token', data.token),
        self.setState({
          authToken: data.token
        });
        self.redirectToDashboard(data.token);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }


  render() {
    return(
      <div className="dashboard row">
        <h1>Welcome to the Dashboard</h1>
        <div className="col-md-4">
          <UserProfile username={this.state.bio} bio={this.state.bio} />
        </div>
         <div className="col-md-4">
          <DataInput />
        </div>
      </div>
    );
  }
}


export default Dashboard;