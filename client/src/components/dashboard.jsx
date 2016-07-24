import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import DataInput from './dashboard-dataInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo } from '../actions/actionCreator';


class Dashboard extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      state:'',
      city: '',
      salary: null,
      education: '',
      gender: '',
      experience: '',
      stack: [],
      showInfo:false
    };
  }
// enter in data, then receive a view of data and make the input disappear area.
// displays current users data
// add a button that ask if the user wants to input more data


  addCity(e) {
    this.setState({
      city:e.target.value
    });
  }

  addState(e) {
    this.setState({
      state:e.target.value
    });
  }

  addEducation(e) {
    this.setState({
      education:e.target.value
    });
  }

  addExperience(e) {
    this.setState({
      experience:e.target.value
    });
  }

  addStack(e) {
    this.state.stack.push(e.target.value);
  }

  hideInput(e) {
    this.setState({

    });
  }


  // submitToStore() {
  //   // console.log(this.state.salary);
  //   var data = {stack: this.state.stack, city: this.state.city, state:this.state.state, education:this.state.education, gender:this.state.gender, experience:this.state.experience};
  //   this.props.setUserInfo(data);
  // }


  inputData(e) {
    e.preventDefault();

    var self = this;
    var data = {stack: this.state.stack, city: this.state.city, state:this.state.state, education:this.state.education, gender:this.state.gender, experience:this.state.experience};

    $.ajax({
      url:"http://localhost:3000/stackentry",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        // self.submitToStore();
        console.log("YOUR THING WORKED, " + data);
      },
      error: function(err) {
        console.log(err);
      }
    });

  }
      // <li>Location: {this.props.userInfo.city}, {this.props.userInfo.state}</li>
          //   <li>Education: {this.props.userInfo.education} </li>
          //   <li>Experience: {this.props.userInfo.experience} </li>
          //   <li>Stack: {this.props.userInfo.stack}</li>
          //   <li>Salary: {this.props.userInfo.salary}</li>

  render() {
    return(
      <div className="dashboard row">
        <h1>Welcome to the Dashboard</h1>
        <div className="col-md-4">
          <ul>

          </ul>
        </div>
         <div className="col-md-4">
          <DataInput inputData={this.inputData.bind(this)} addStack={this.addStack.bind(this)} addCity={this.addCity.bind(this)} addState={this.addState.bind(this)} addEducation={this.addEducation.bind(this)} addExperience={this.addExperience.bind(this)} />
        </div>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

//   function mapStateToProps(state) {
//     return {
//       userInfo: state.userInfo
//     }
//   }


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({setUserInfo: setUserInfo}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard;