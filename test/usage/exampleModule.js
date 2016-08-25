import _ from 'lodash';
import {Reducer, Event} from './../../src/index';

// visible for testing
export const initialState = {
  todos: {}
};

// base class for events the reducer will listen to
class TodosEvent extends Event {
  //not required, will be used for 'action.type' prefix for analytics
  static prefix = 'no.more.switch.statements.todos.';
}

// this is your event - created by .create(params)
export class AddTodoEvent extends TodosEvent {
  newState(oldState, params) {
    return _.merge({}, oldState, {todos: params});
  }
}

// another event, using 'merge' helper function instead of newState. Return only the delta of the state.
export class AddTodoUsingMergeEvent extends TodosEvent {
  merge(oldState, params) {
    return {todos: params};
  }
}

// another event, this time removing stuff from the old state, using the remove helper function
export class RemoveTodoEvent extends TodosEvent {
  remove(oldState, params) {
    return `todos.${params}`;
  }
}

// This is how you create the reducer, once, and send to the store.
const TodosReducer = Reducer.create(initialState, TodosEvent);
export default TodosReducer;
