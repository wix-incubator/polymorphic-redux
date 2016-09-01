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

    beforeEach(() => {
      reduce = Reducer.create(initialState);
    });

    it('returns the state by default', () => {
      expect(reduce(otherState, {})).toBe(otherState);
    });

    it('returns the initialState if nothing passed to state', () => {
      expect(reduce(undefined, {})).toBe(initialState);
    });

    it('returns the state when event has an instance which does not implement newState', () => {
      const event = {_instance: {}};
      expect(reduce(undefined, event)).toBe(initialState);
    });

    it('handles falsey events', () => {
      expect(reduce(initialState, undefined)).toBe(initialState);
    });
  });

  describe('reducer created with a specific class of events to be listened to', () => {
    const initialState = {};
    const otherState = {};
    const event = {_instance: {}};

    class EventClass {
      newState() {
        return otherState;
      }
    }
    class SubclassOfEventClass extends EventClass {
    }
    class OtherClass {
      newState() {
        return otherState;
      }
    }

    it('listens to no events by default', () => {
      const r = Reducer.create(initialState);
      expect(r(initialState, event)).toBe(initialState);
    });

    it('listens to events by class', () => {
      const r = Reducer.create(initialState, EventClass);
      const extendingEvent = {_instance: new EventClass()};
      expect(r(initialState, extendingEvent)).toBe(otherState);
    });

    it('listens to events by subclasses', () => {
      const r = Reducer.create(initialState, EventClass);
      const extendingEvent = {_instance: new SubclassOfEventClass()};
      expect(r(initialState, extendingEvent)).toBe(otherState);
    });

    it('does not listen to events from other classes', () => {
      const r = Reducer.create(initialState, EventClass);
      const extendingEvent = {_instance: new OtherClass()};
      expect(r(initialState, extendingEvent)).toBe(initialState);
    });
  });
});
