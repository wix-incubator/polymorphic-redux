import {Event} from './Event';

export class Reducer {
  /**
   * Call this to create the reducer function to be sent to the store.
   *
   * @param initialState - initial state
   * @param EventClass {Class<Event>} - class of events that the reducer will listen to
   * @return {Reducer.reduce} This returns a reducer function which should be sent to createStore() or combineReducers()
   */
  static create(initialState, EventClass) {
    return new Reducer(initialState, EventClass).reduce;
  }

  /**
   * private. do not use.
   */
  constructor(initialState, EventClass) {
    this.initialState = initialState;
    this.EventClass = EventClass || Event;
    this.reduce = this.reduce.bind(this);
  }

  /**
   * private. do not use.
   */
  reduce(state = this.initialState, event) {
    if (shouldHandle(event, this.EventClass)) {
      return event._instance.newState(state, event._instance.params);
    } else {
      return state;
    }
  }
}

function shouldHandle(event, EventClass) {
  return event && event._instance && event._instance instanceof EventClass;
}
