import {createStore} from 'redux';

import * as Example from './example';

describe('polymorphic-redux', () => {
  let store, dispatch;

  beforeEach(() => {
    store = createStore(Example.reducer.reduce);
    dispatch = store.dispatch;
    expect(store.getState()).toEqual({todos: {}});
  });

  it('is based on polymorphic principles and cleaner', () => {
    expect(store.getState()).toEqual({todos: {}});

    dispatch(Example.AddTodoEvent.create({123: 'buy meat'}));

    expect(store.getState()).toEqual({
      todos: {
        123: 'buy meat'
      }
    });

    dispatch(Example.AddTodoEvent2.create({456: 'buy milk'}));

    expect(store.getState()).toEqual({
      todos: {
        123: 'buy meat',
        456: 'buy milk'
      }
    });

    dispatch(Example.RemoveTodoEvent.create(123));

    expect(store.getState()).toEqual({
      todos: {
        456: 'buy milk'
      }
    });
  });

  it('selectors are the only way to query on the state (passing the fullState)', () => {
    const fullState = {
      TodosReducer: {
        todos: {
          123: 'buy meat',
          456: 'buy milk'
        }
      }
    };
    expect(Example.reducer.selectors(fullState).getTodo(123)).toEqual('buy meat');
    expect(Example.reducer.selectors(fullState).getTodo(456)).toEqual('buy milk');
    expect(Example.reducer.selectors(fullState).getTodo(789)).toEqual(undefined);
  });
});
