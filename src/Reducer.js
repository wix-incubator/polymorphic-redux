export class Reducer {
  /**
   * Call this to create the reducer function to be sent to the store.
   *
   * @param initialState - initial state
   * @param EventClass {Event} - the class of Event (and subtypes) this reducer should listen to
   * @return {Reducer.reduce} This returns a reducer function which should be send to createStore() or combineReducers()
   */
  static create(initialState, EventClass) {
    return new Reducer(initialState, EventClass).reduce;
  }

  /**
   * private. do not use.
   */
  constructor(initialState, EventClass) {
    this.initialState = initialState;
    this.EventClass = EventClass;
    this.reduce = this.reduce.bind(this);
  }

  /**
   * private. do not use.
   */
  reduce(state = this.initialState, event) {
    if (event._instance && event._instance instanceof this.EventClass) {
      return event._instance.newState(state, event._instance.params);
    } else {
      return state;
    }
  }
}
