import {createStore} from 'redux';

import {TodosReducer, AddTodoEvent} from './exampleModule';

describe('polymorphic-redux', () => {
  let store, dispatch;

  beforeEach(() => {
    store = createStore(new TodosReducer().reduce);
    dispatch = store.dispatch;
    expect(store.getState()).toEqual({todos: {}});
  });

  it('is based on polymorphic principles, cleaner, and far less boilerplate', () => {
    expect(store.getState()).toEqual({todos: {}});

    dispatch(AddTodoEvent.create({123: 'buy meat'}));

    expect(store.getState()).toEqual({
      todos: {
        123: 'buy meat'
      }
    });

    dispatch(AddTodoEvent.create({456: 'buy milk'}));

    expect(store.getState()).toEqual({
      todos: {
        123: 'buy meat',
        456: 'buy milk'
      }
    });
  });
});
