/* global document */
"use strict";

var React  = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');
var assign = require('object-assign');
var diff   = require('immutablediff');
var request = require('browser-request');


var Cursor = require('immutable/contrib/cursor');
var Immutable = require('immutable');


document.addEventListener("DOMContentLoaded", function(event) {
  window.appState = Immutable.fromJS(window.appState);

  var router = Router.create({ routes: routes, location: Router.HistoryLocation });

  router.run(function (Handler, state) {

    var render = function(currentState) {
      var cursor = Cursor.from(currentState, function(newAppState, oldAppState, changePath) {
        var patch = diff(oldAppState, newAppState);

        request({method:'POST', url:'/api/patchstate', json: patch}, function() {
          window.appState = newAppState;
          render(newAppState);
        })

      });

      React.render(<Handler params={state.params} query={state.query} cursor={cursor} />, document.body);
    }

    render(window.appState);
  });
});
