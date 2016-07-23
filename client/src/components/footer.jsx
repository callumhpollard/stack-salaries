import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearch } from '../actions/actionCreator';

const Footer = React.createClass({
  console.log(this.props.salary);
  render: function() {
    return(
      <div>
        <h1>About | Jobs | Onix | Contact</h1>
        <h2>2016 Stack Salaries</h2>
        <h3>{this.props.salary}</h3>
      </div>
    );
  }
});

 function mapStateToProps(state) {
    return {
      salary: state.salary
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearch: setSearch}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);

// export default Footer;
