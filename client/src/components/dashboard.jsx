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
      bio:'Poop',
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