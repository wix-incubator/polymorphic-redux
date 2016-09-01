import _ from 'lodash';
import {Reducer, Event} from './../../src';

/**
 * visible for testing
 */
export const initialState = {
  todos: {}
};

/**
 * this is your event - created by .create(params)
 */
export class AddTodoEvent extends Event {
  /**
   * not required, will be used for 'action.type' as prefix (for example for analytics)
   * @type {string}
   */
  static namespace = 'no.more.switch.statements.todos.';

  newState(oldState, params) {
    return _.merge({}, oldState, {todos: params});
  }
}

//
//// another event, using 'merge' helper function instead of newState. Return only the delta of the state.
//export class AddTodoUsingMergeEvent extends TodosEvent {
//  merge(oldState, params) {
//    return {todos: params};
//  }
//}
//
//// another event, this time removing stuff from the old state, using the remove helper function
//export class RemoveTodoEvent extends TodosEvent {
//  remove(oldState, params) {
//    return `todos.${params}`;
//  }
//}

/**
 * This is how you create the reducer, once, and send to the store.
 */
const TodosReducer = Reducer.create(initialState);
export default TodosReducer;
