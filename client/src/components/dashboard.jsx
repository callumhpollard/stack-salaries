import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';
import $ from 'jquery';
import DataInput from './dashboard-dataInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo } from '../actions/actionCreator';
import Logo from './logo';

class Dashboard extends React.Component {

  constructor (){
    super();
    this.state = {
      state:'',
      city: '',
      salary: null,
      education: '',
      gender: '',
      experience: '',
      stack: [],
      position:''
    };
  }


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
    this.setState({
      stack: e.target.value
    });
  }

  addPosition(e) {
    this.setState({
      position:e.target.value
    });
  }


  submitToStore() {
    var data = {stack: this.state.stack, city: this.state.city, state:this.state.state, education:this.state.education, experience:this.state.experience, position:this.state.position};
    this.props.setUserInfo(data);
  }

  inputData(e) {
    e.preventDefault();
    var self = this;
    var data = {stack: this.state.stack, city: this.state.city, state:this.state.state, education:this.state.education, experience:this.state.experience, position:this.state.position};

        console.log(data);

    $.ajax({
      url:"http://localhost:3000/stackentry",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(data) {
        self.submitToStore();
        console.log("YOUR THING WORKED, " + data);
      },
      error: function(err) {
        console.log(err);
      }
    });

  }

  render() {

    return (

      <div id="dashboard" className="container results">

      <nav id="resultNav" className="navbar navbar-default navbar-fixed-top">
        <Logo/>
      </nav>

      <div className="row under-nav">
        <h1 className="headline">Welcome <span className="color"></span> to the Dashboard</h1>
        <div>
          <ul>

          </ul>
        </div>
      </div>



      <div className="row dashboard-row center-block">
         <div className="loginMain">
          <DataInput inputData={this.inputData.bind(this)} addStack={this.addStack.bind(this)} addCity={this.addCity.bind(this)} addState={this.addState.bind(this)} addEducation={this.addEducation.bind(this)} addExperience={this.addExperience.bind(this)} addPosition={this.addPosition.bind(this)}/>
        </div>
      </div>
    </div>
    );
  }
}

Dashboard.contextTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


// {this.props.userInfo.name}
