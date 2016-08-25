import _ from 'lodash';

export class Event {
  /**
   * @type {string} optional prefix to be used in action.type. Can be used for analytics etc.
   */
  static prefix = '';

  /**
   * Call this to create the inheriting event class. Pass the result of this function to dispatch()
   */
  static create(params) {
    return {type: `${this.prefix}${this.name}`, _instance: new this(params)}; //eslint-disable-line
  }

  /**
   * private. should not be used.
   */
  constructor(params) {
    this.params = params;
  }

  /**
   * @param oldState
   * @param params - the params you created the event with
   *
   * @return a new state
   */
  newState(oldState, params) {
    return _.merge({}, oldState, this.merge(oldState, params));
  }

  /**
   *
   * Helper method to override (instead of newState),
   * return only the delta you would like to be merged with the old state,
   * I will merge it for you.
   *
   * @param oldState
   * @param params - the params you created the event with
   * @return a delta to merge the state with
   */
  merge(oldState, params) {
    return oldState;
  }
}
