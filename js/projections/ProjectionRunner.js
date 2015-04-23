var invariant = require('react/lib/invariant');

module.exports = function(cursor, projections, event) {
  var newStates = projections
    .filter(projection => !!projection[event.type])
    .map(projection => {
      var stateCursor = cursor.cursor(projection.path);
      var prevState = stateCursor.deref();
      var currentState = prevState || projection.getInitialState();
      var eventHandler = projection[event.type];
      var newState = eventHandler(currentState, event);
      return {
        path: projection.path,
        state: newState,
        isInitialState: !prevState
      };
    });

  cursor.withMutations(appState => {
     
      newStates.reduce((as, x) => { 
        if(x.isInitialState) {
          return as.setIn(x.path, x.state);
        } else {
          return as.mergeDeepIn(x.path, x.state);
        }
      }, appState);

    });
};
