import _ from 'lodash';
import {Reducer, Event} from './../../src';

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

/**
 * This is one way you can define the reducer
 */
export class TodosReducer extends Reducer {
  getInitialState() {
    return {
      todos: {}
    };
  }

  getEventSubscriptions() {
    return [AddTodoEvent];
  }

  createSelectors(state) {
    return {
      getTodo(id) {
        return state.todos[id];
      }
    };
  }
}
