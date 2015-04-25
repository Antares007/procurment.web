var React = require('react/addons');

var Home = React.createClass({
  render: function() {
    console.log('rendering: Home');
    return (
      <div>
        <h1>Home</h1>
        <a href="/logout">LogOut</a>
      </div>
    );
  }
});

module.exports = Home;
