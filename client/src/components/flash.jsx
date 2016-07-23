import React from 'react';

class Flash extends React.Component {

  constructor (props){

    super(props);

    this.state = {
      type: "",
      message: ""
    };
  }

  render() {
      console.log(this.props);
      return(
        <div></div>
      )
  }

}



export default Flash;


// <div className={this.state.type}>
//           <p>{this.state.message}</p>
//         </div>