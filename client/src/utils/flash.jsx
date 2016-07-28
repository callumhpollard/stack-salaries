import React from 'react';

// The flash class is a basic utility to display
// flash messages.

class Flash extends React.Component {

  constructor (props){

    super(props);

    this.state = {
      type: "",
      message: ""
    };
  }

  render() {
      return(
        <div className={this.props.type}>{this.props.message}</div>
      )
  }

}



export default Flash;