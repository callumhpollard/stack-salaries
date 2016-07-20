import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import UserProfile from './dashboard-userprofile';
import DataInput from './dashboard-userprofile';

class Dashboard extends React.Component {

  componentDidMount(){
  }

  render() {
    return(
      <div className="dashboard row">
        <h1>Welcome to the Dashboard</h1>
        <div className="col-md-4">
          <UserProfile />
        </div>
         <div className="col-md-4">
          <DataInput />
        </div>
      </div>
    );
  }
}

export default Dashboard;