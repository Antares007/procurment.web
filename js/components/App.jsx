var React = require('react/addons'),
  {Link, RouteHandler, Route} = require('react-router');

var flex = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: 'yellow',
  display: 'flex',
  flexDirection: 'column'
};

var App = React.createClass({
  // contextTypes: {
  //   router: React.PropTypes.func
  // },
  render: function () {
    return (
      <div style={flex}>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
module.exports = App;
