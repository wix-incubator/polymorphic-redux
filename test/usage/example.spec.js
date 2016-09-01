import {createStore} from 'redux';

import TodosReducer, {AddTodoEvent, initialState} from './exampleModule';

xdescribe('polymorphic-redux', () => {
  let store, dispatch;
  const originalInitialState = initialState;

  beforeEach(() => {
    store = createStore(TodosReducer);
    dispatch = store.dispatch;
    expect(store.getState()).toEqual({todos: {}});
  });

  afterEach(() => {
    expect(initialState).toBe(originalInitialState);
    expect(initialState).toEqual({todos: {}});
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

  //it('merge is implicitly immutable and even CLEANER then newState', () => {
  //  expect(store.getState()).toEqual({todos: {}});
  //
  //  dispatch(AddTodoEvent.create({123: 'buy meat'}));
  //
  //  expect(store.getState()).toEqual({
  //    todos: {
  //      123: 'buy meat'
  //    }
  //  });
  //
  //  dispatch(AddTodoUsingMergeEvent.create({789: 'buy potatoes'}));
  //
  //  expect(store.getState()).toEqual({
  //    todos: {
  //      123: 'buy meat',
  //      789: 'buy potatoes'
  //    }
  //  });
  //});
  //
  //it('removing something from the state', () => {
  //  dispatch(AddTodoEvent.create({123: 'buy meat'}));
  //
  //  expect(store.getState()).toEqual({
  //    todos: {
  //      123: 'buy meat'
  //    }
  //  });
  //
  //  dispatch(RemoveTodoEvent.create(123));
  //
  //  expect(store.getState()).toEqual({
  //    todos: {}
  //  });
  //});
});
