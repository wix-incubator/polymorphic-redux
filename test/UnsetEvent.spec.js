import 'jasmine-expect';
import {Event} from '../src/Event';
import {UnsetEvent} from '../src/UnsetEvent';

describe('UnsetEvent', () => {
  it('extends Event', () => {
    expect(new UnsetEvent() instanceof Event).toBeTrue();
  });

  it('returns unset path from params by default', () => {
    const oldState = {hi: 'hello', bye: 'goodbye'};
    const action = UnsetEvent.create('hi');
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({bye: 'goodbye'});
  });

  it('removes the result of getRemovePath from oldState', () => {
    class SimpleEvent extends UnsetEvent {
      getRemovePath(oldState, params) {
        return 'a';
      }
    }

    const oldState = {a: 123, b: 456};
    const action = SimpleEvent.create();
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({b: 456});
  });

  it('unset deep path', () => {
    const oldState = {
      todos: {
        123: 'buy milk',
        456: 'buy meat',
        789: {a: 1, b: 2}
      }
    };
    const action = UnsetEvent.create('todos.789.a');
    expect(action._instance.newState(oldState, action._instance.params)).toEqual({
      todos: {
        123: 'buy milk',
        456: 'buy meat',
        789: {b: 2}
      }
    });
  });
});

