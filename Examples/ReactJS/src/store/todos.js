import _ from 'lodash';
import {Reducer, Event} from 'polymorphic-redux';

export const initialState = {
  todos: [],
}

class TodosEvent extends Event {
  // static prefix = "example.todos.";
}

export class AddTodoEvent extends TodosEvent {
  newState(oldState, params) {
    const todos = _.clone(oldState.todos);
    todos.push(params);
    return {
      todos,
    }
  }
}

export const events = {
  AddTodoEvent,
}

const TodosReducer = Reducer.create(initialState, TodosEvent);
export default TodosReducer;
