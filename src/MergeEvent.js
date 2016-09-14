import {Event} from './Event';
import _ from 'lodash';

/**
 * Helper class to extend which merges the result of the delta returned from 'getDelta' method
 */
export class MergeEvent extends Event {
  newState(oldState, params) {
    return _.merge({}, oldState, this.getDelta(oldState, params));
  }

  /**
   * Helper method to override (instead of newState),
   * return only the delta you would like to be merged with the old state
   *
   * @param oldState
   * @param params
   * @return {undefined} the delta to merge
   */
  getDelta(oldState, params) {
    return params;
  }
}

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
