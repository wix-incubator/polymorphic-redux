import _ from 'lodash';
import {Reducer, Event} from './../../src';

class TodosEvent extends Event {
  static namespace = 'no.more.switch.statements.todos.';
}

export class AddTodoEvent extends TodosEvent {
  newState(oldState, todo) {
    return _.merge({}, oldState, {todos: todo});
  }
}

export class AddTodoEvent2 extends TodosEvent {
  merge(oldState, todo) {
    return {todos: todo};
  }
}

export class RemoveTodoEvent extends TodosEvent {
  remove(oldState, todoId) {
    return `todos.${todoId}`;
  }
}

class TodosReducer extends Reducer {
  getInitialState() {
    return {
      todos: {}
    };
  }

  getEventSubscriptions() {
    return [TodosEvent];
  }

  createSelectors(state) {
    return {
      getTodo(id) {
        return state.todos[id];
      }
    };
  }
}

export const reducer = new TodosReducer();
