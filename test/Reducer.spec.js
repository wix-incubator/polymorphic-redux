require('jasmine-expect');
import {Reducer} from '../src/Reducer';

describe('Reducer', () => {
  it('is created by calling "create"', () => {
    expect(Reducer.create).toBeFunction();
    expect(Reducer.create()).toBeFunction();
    expect(Reducer.create()({}, {})).toEqual({});
  });

  describe('reduce function, handles the switch case for you by using polymorphic dispatch', () => {
    let reduce = null;
    const initialState = {};
    const otherState = {};
    class EventClass {
    }

    class EventSubClass extends EventClass {
    }

    beforeEach(() => {
      reduce = Reducer.create(initialState, EventClass);
    });

    it('returns the state by default', () => {
      expect(reduce(otherState, {})).toBe(otherState);
    });

    it('returns the initialState if nothing passed to state', () => {
      expect(reduce(undefined, {})).toBe(initialState);
    });

    it('returns the state when event has an instance not from initial EventClass', () => {
      const event = {_instance: {}};
      expect(reduce(otherState, event)).toBe(otherState);
    });

    it('returns the result of calling newState on the inner instance when event has an instance extending from initial EventClass', () => {
      const event = {_instance: new EventClass()};
      event._instance.newState = () => 'hello';
      expect(reduce(otherState, event)).toBe('hello');
    });

    it('returns the result of calling newState on the inner instance when event has an instance extending from subclasses of EventClass', () => {
      const event = {_instance: new EventSubClass()};
      event._instance.newState = () => 'world';
      expect(reduce(otherState, event)).toBe('world');
    });
  });
});
