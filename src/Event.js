export function createEvent(params) {
  // TODO create an event yourself and this will return the obj for redux
}

export class Event {
  /**
   * @type {string} optional prefix to be used in action.type. Can be used for analytics etc.
   */
  static namespace = '';

  /**
   * Call this to create the inheriting event class. Pass the result of this function to dispatch()
   */
  static create(params) {
    return {type: `${this.namespace}${this.name}`, _instance: new this(params)}; //eslint-disable-line
  }

  /**
   * private. should not be used.
   */
  constructor(params) {
    this.params = params;
  }

  /**
   * Override this method and do all your redux state changes here
   *
   * @param oldState
   * @param params - the params you created the event with
   *
   * @return a new state
   */
  newState(oldState, params) {
    return oldState;
  }

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
}

//function removeFromOldState(oldState, removePath) {
//  const clone = _.clone(oldState);
//  _.unset(clone, removePath);
//  return clone;
//}
//
//function mergeToOldState(oldState, mergeDelta) {
//  return _.merge({}, oldState, mergeDelta);
//}
