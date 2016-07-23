import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import AdvanceSearchInput from './advance-searchInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearch } from '../actions/actionCreator';


class AdvanceSearch extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: [],
      city: "",
      state: "",
      education: "",
      gender: "",
      experience: "",
      salary: {}
    };
  }

  findCity(e) {
    this.setState({
      city:e.target.value
    });
  }

  findState(e) {
    this.setState({
      state:e.target.value
    });
  }

  findEducation(e) {
    this.setState({
      education:e.target.value
    });
  }

  findGender(e) {
    this.setState({
      gender:e.target.value
    });
  }

  findExperience(e) {
    this.setState({
      experience:e.target.value
    });
  }

  findStack(e) {
    this.state.stack.push(e.target.value);
  }

  redirectToResults(){
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

  GetAdvanceSearchData(e) {
    e.preventDefault();

    var self = this;
    var cityState = this.state.cityState.split(", ");

    // Remember to lowercase -- its only not in lowercase now because you input the data in as MEAN
    // .toLowerCase()

    var data = {stack: this.state.stack, city: cityState[0], state:cityState[1], education: this.state.education, education:this.state.education, gender:this.state.gender, experience:this.state.experience};

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
    return (
      <div>
        <div className="dashboard row">
          <h1>Advance Search</h1>
          <div className="col-md-4">
            <AdvanceSearchInput GetAdvanceSearchData={this.GetAdvanceSearchData.bind(this)} findStack={this.findStack.bind(this)} findCity={this.findCity.bind(this)} findState={this.findState.bind(this)} findEducation={this.findEducation.bind(this)} findGender={this.findGender.bind(this)} findExperience={this.findExperience.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
};

// AdvanceSearch.contextTypes= {
//   router: React.PropTypes.object.isRequired
// };


  function mapStateToProps(state) {
    return {
      salary : state.salary
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({setSearch: setSearch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch);