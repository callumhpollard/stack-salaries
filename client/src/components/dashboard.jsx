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

    console.log(this.props.location.state);
=======
    // console.log(this.props.location.state);
>>>>>>> 5c6215621b03cbb0632b65186cc1fc6b19dfebb4
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