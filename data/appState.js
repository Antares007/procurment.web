var Immutable = require('immutable');
var fs = require('fs');
var data = fs.readFileSync(__dirname + '/state.json', 'utf8');

var appState = Immutable.fromJS(JSON.parse(data));

module.exports = appState;
