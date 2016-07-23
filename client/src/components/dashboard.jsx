import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import UserProfile from './dashboard-userprofile';
import DataInput from './dashboard-datainput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearch } from '../actions/actionCreator';


class Dashboard extends React.Component {

  constructor (props){
    super(props);
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
  // componentDidMount(){
  //   // console.log(this.props.location.state);
  //   console.log(this.props.salary);
  // }
  renderName() {
    console.log("I AM THE NAME," + JSON.stringify(this.props.name));
    return this.props.name.name;
  }

  render() {
    return(
      <div className="dashboard row">
        <h1>Welcome to the Dashboard</h1>
        <h2>{this.renderName()}</h2>
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


 function mapStateToProps(state) {
    return {
      salary: state.salary,
      name: state.name
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearch: setSearch}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard;