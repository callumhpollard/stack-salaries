import React from 'react';

const MainLayout = React.createClass({
  render: function() {
    return (
      <div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
});

export default MainLayout;
