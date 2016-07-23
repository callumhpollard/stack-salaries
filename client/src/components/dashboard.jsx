import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import DataInput from './dashboard-datainput';
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
      stack: []
    };
  }
// enter in data, then receive a view of data and make the input disappear area.
// displays current users data
// add a button that ask if the user wants to input more data

    submitToStore() {
    // window.salary = this.state.salary;
    // var data = {stack: this.state.stack, city: cityState[0].toLowerCase(), state:cityState[1].toLowerCase()};
    // var self = this;
    console.log(this.state.salary);
    this.props.setSearch(this.state.salary);
    // this.props.history.pushState(null, '/results');
    this.context.router.push('/results');

    // window.location.hash = string
    // #/key
    // {salary:this.state.salary}
    // console.log(this.state.salary);
  }


  inputData(e) {
    e.preventDefault();

    var self = this;
    var cityState = this.state.cityState.split(", ");

    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN
    // .toLowerCase()

    var data = {stack: this.state.stack, city: this.state.city, state:this.state.state, education:this.state.education, gender:this.state.gender, experience:this.state.experience};

    $.ajax({
      url:"http://localhost:3000/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.setState({
          salary: data
        });

        self.redirectToResults(data);
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
          <ul>
            <li>Location: {this.props.city},{this.props.state}</li>
            <li>Education: {this.props.eduation} </li>
            <li>Experience: {this.props.experience} </li>
            <li>Stack: {this.props.stack}</li>
            <li>Salary: {this.props.salary}</li>
          </ul>
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
      state: state.state,
      city: state.city,
      education: state.education,
      experience:state.experience,
      stack: state.stack
    }
  }


function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUserInfo: setUserInfo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);