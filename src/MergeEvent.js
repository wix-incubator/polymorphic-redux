///**
// * Helper method to override (instead of newState),
// * return only the delta you would like to be merged with the old state,
// * I will merge it for you.
// *
// * @param oldState
// * @param params - the params you created the event with
// * @return a delta to merge the state with
// */
//merge(oldState, params) {
//  return undefined;
//}
//
///**
// * Helper method to override (instead of newState),
// * return only the path you would like to be removed from the old state,
// * I will create a new state for you with this path removed.
// *
// * @param oldState
// * @param params
// * @return {String} path to remove from the state
// */
//remove(oldState, params) {
//  return undefined;
//}

//function removeFromOldState(oldState, removePath) {
//  const clone = _.clone(oldState);
//  _.unset(clone, removePath);
//  return clone;
//}
//
//function mergeToOldState(oldState, mergeDelta) {
//  return _.merge({}, oldState, mergeDelta);
//}
