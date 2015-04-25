var React = require('react/addons');
var {Route, DefaultRoute} = require('react-router');

var App                      = require('./js/components/App.jsx');
var Home                     = require('./js/components/Home.jsx');
var LoginView                = require('./js/components/LoginView.jsx');

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='login' handler={LoginView}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

module.exports = routes;
