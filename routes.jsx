var React = require('react/addons');
var {Route, DefaultRoute} = require('react-router');

var App                      = require('./js/components/App.jsx');
var LoginView                = require('./js/components/LoginView.jsx');

var routes = (
  <Route name='app' path='/'        handler={App}>
    <DefaultRoute handler={LoginView}/>
  </Route>
);

module.exports = routes;
