// TODO create an event yourself and this will return the obj for redux

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
}
