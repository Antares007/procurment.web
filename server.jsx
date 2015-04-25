'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var routes = require('./routes.jsx');
var Html   = require('./js/components/Html.jsx');

var Cursor = require('immutable/contrib/cursor');
var Immutable = require('immutable');
var serialize = require('serialize-javascript');
var patch = require('immpatch');

var appState = require('./data/appState.js');


module.exports = function (req, res, next) {

  console.log('isAuthenticated: %s',req.isAuthenticated())
  console.log(req.user);
  console.log(req.url);
  // if(req.method === 'POST') {
  //   appState = patch(appState, req.body);
  //   return res.sendStatus(200);
  // }

  if(req.isAuthenticated()){

  } else {
    if(req.url !== '/login')
    return res.redirect('/login');
  };
  Router.run(routes, req.url, function (Handler, state) {
    try {

      var exposed = 'window.appState=' + serialize(appState.toJS()) + ';';

      var params = state.params;
      var title  = DocumentTitle.rewind();
      var markup = React.renderToString(<Handler params={params} query={state.query} cursor={Cursor.from(appState, () => null)}/>);
      var html   = React.renderToStaticMarkup(<Html title={title} markup={markup} state={exposed}/>);

      // TODO: send 404 status code
      // (see: https://github.com/gpbl/isomorphic-react-template/issues/3)

      res.send('<!DOCTYPE html>' + html);
    } catch(ex) {
      res.send(ex.message);
    }
  });
};
