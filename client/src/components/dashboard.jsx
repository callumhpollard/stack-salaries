import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import UserProfile from './dashboard-userprofile';
import DataInput from './dashboard-datainput';
import helpers from '../utils/helpers';

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

    helpers.getGithubInfo(this.state.bios)
      .then(function(data) {
        this.setState({
          bio:data.bio
        });
      }.bind(this));
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