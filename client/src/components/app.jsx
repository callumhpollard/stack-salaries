import React from 'react';
import Login from './login';
import Main from './main';
import Search from './search';
import Cloud from './cloud';

<<<<<<< HEAD
class App extends React.Component{
=======
class App extends React.Component {

  constructor() {
    super();
  }
>>>>>>> 4bb18f8603293f2bcdc29db9247561a88fdd5717

  render() {
    return (
      <div>
      <div className="container">
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
             <Login/>
          </nav>
          <Main/>

          <Search history={this.props.history}/>
          <Cloud/>

        </div>
      </div>
      <div className="art">
      </div>
      </div>
    );
  }
<<<<<<< HEAD

}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default App;
=======
>>>>>>> 4bb18f8603293f2bcdc29db9247561a88fdd5717

}

export default App;