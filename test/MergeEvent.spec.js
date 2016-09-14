import 'jasmine-expect';
import {MergeEvent} from '../src/MergeEvent';
import {Event} from '../src/Event';

describe('MergeEvent', () => {
  it('extends Event', () => {
    expect(new MergeEvent() instanceof Event).toBeTrue();
  });

  it('merges the result of getDelta into oldState', () => {
    class SimpleEvent extends MergeEvent {
      getDelta(oldState, todo) {
        return todo;
      }
    }

    const oldState = {a: 123};
    const action = SimpleEvent.create({b: 456});
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({
      a: 123,
      b: 456
    });
  });

  it('merges deeply', () => {
    class AddTodoEvent extends MergeEvent {
      getDelta(oldState, todo) {
        return {todos: todo};
      }
    }

    const oldState = {todos: {123: 'buy milk'}};
    const action = AddTodoEvent.create({456: 'buy meat'});
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({
      todos: {
        123: 'buy milk',
        456: 'buy meat'
      }
    });
  });

  it('returns merge with params by default', () => {
    const oldState = {};
    const action = MergeEvent.create({hi: 'hello'});
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({hi: 'hello'});
  });
});
