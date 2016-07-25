import React from 'react';
import $ from 'jquery';
import { History } from 'react-router';
import { Router } from 'react-router';
import AdvancedSearchInput from './advance-searchInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearch } from '../actions/actionCreator';
import { loggedIn } from '../auth/auth';
import Logo from './logo';

class AdvancedSearch extends React.Component{

  constructor() {
    super();
    this.state = {
      stack: [],
      city: "",
      state: "",
      education: "",
      gender: "",
      experience: "",
      salary: {},
      loggedIn: loggedIn()
    };
  }

  findCity(e) {
    this.setState({
      city:e.target.value.toLowerCase()
    });
  }

  findState(e) {
    this.setState({
      state:e.target.value.toLowerCase()
    });
  }

  findEducation(e) {
    this.setState({
      education:e.target.value.toLowerCase()
    });
  }

  findGender(e) {
    this.setState({
      gender:e.target.value.toLowerCase()
    });
  }

  findExperience(e) {
    this.setState({
      experience:e.target.value.toLowerCase()
    });
  }

  findStack(e) {
    this.setState({
      stack: e.target.value.toLowerCase().split(', ')
    });
  }

  redirectToResults() {
    this.props.setSearch(this.state.salary);
    this.context.router.push('/results');
  }

  GetAdvancedSearchData(e) {
    e.preventDefault();

    var self = this;

    var data = {
      stack: this.state.stack,
      city: this.state.city,
      state:this.state.state,
      education: this.state.education,
      gender:this.state.gender,
      experience:this.state.experience
    };

    $.ajax({
      url:"http://stacksalaries.herokuapp.com/search",
      type:"POST",
      contentType:"application/json",
      data: JSON.stringify(data),
      success: function(results) {
        self.setState({
          salary: results
        });
        self.redirectToResults(results);
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
        <Logo loggedIn={this.state.loggedIn} />
      </nav>

      <div className="row dashboard-row center-block">
        <div className="dashboard row">
          <h1>Advance Search</h1>
            <AdvancedSearchInput GetAdvancedSearchData={this.GetAdvancedSearchData.bind(this)} findStack={this.findStack.bind(this)} findCity={this.findCity.bind(this)} findState={this.findState.bind(this)} findEducation={this.findEducation.bind(this)} findGender={this.findGender.bind(this)} findExperience={this.findExperience.bind(this)} />
        </div>
      </div>
    </div>
    );
  }
};

AdvancedSearch.contextTypes= {
  router: React.PropTypes.object.isRequired
};


  function mapStateToProps(state) {
    return {
      salary : state.salary
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({setSearch: setSearch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);