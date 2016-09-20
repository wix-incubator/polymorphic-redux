require('jasmine-expect');
import {Event} from '../src/Event';
import {Reducer} from '../src/Reducer';

describe('Reducer', () => {
  describe('create static helper', () => {
    it('must provide params', () => {
      expect(() => Reducer.create()).toThrow(new Error('must provide params'));
      expect(() => Reducer.create({})).toThrow(new Error('must provide params.name'));
      expect(() => Reducer.create({name: 'example'})).toThrow(new Error('must provide params.initialState'));
      expect(() => Reducer.create({name: 'example', initialState: {}}))
        .toThrow(new Error('must provide params.eventSubscriptions'));
      expect(() => Reducer.create({name: 'example', initialState: {}, eventSubscriptions: []}))
        .toThrow(new Error('must provide params.createSelectorsFn'));
    });

    it('creates reducer with params', () => {
      const initialState = {};
      const eventSubscriptions = [];
      const createSelectorsFn = (state) => state.inner;
      const reducer = Reducer.create({name: 'example', initialState, eventSubscriptions, createSelectorsFn});
      expect(reducer).toBeObject();
      expect(reducer.getName()).toEqual('example');
      expect(reducer.getInitialState()).toBe(initialState);
      expect(reducer.getEventSubscriptions()).toBe(eventSubscriptions);
      expect(reducer.createSelectors({inner: 'hello'})).toEqual('hello');
    });
  });

  class MyReducer extends Reducer {
    getInitialState() {
      return {};
    }

    getEventSubscriptions() {
      return [];
    }

    createSelectors(state) {
      return {};
    }
  }

  class MyEvent extends Event {
    newState(oldState, params) {
      return 'something new';
    }
  }

  describe('extending Reducer', () => {
    it('can be created by extending', () => {
      expect(new MyReducer()).toBeObject();
      expect(new MyReducer().getInitialState()).toEqual({});
      expect(new MyReducer().getEventSubscriptions()).toEqual([]);
      expect(new MyReducer().createSelectors()).toEqual({});
    });

    it('name is the class name if not provided explicitly', () => {
      expect(new MyReducer().getName()).toEqual('MyReducer');
      const reducer = Reducer.create({name: 'hello', initialState: {}, eventSubscriptions: [], createSelectorsFn: () => ''});
      expect(reducer.getName()).toEqual('hello');
    });

    class BadReducer extends Reducer {
      //
    }

    it('must implement initialState', () => {
      expect(() => new BadReducer().getInitialState()).toThrow();
    });

    it('must implement event subscriptions', () => {
      expect(() => new BadReducer().getEventSubscriptions()).toThrow();
    });

    it('must implement selectors', () => {
      expect(() => new BadReducer().createSelectors()).toThrow();
    });
  });

  describe('reduce function, handles the switch case for you by using polymorphic dispatch', () => {
    let reducer = null;
    const initialState = {};
    const otherState = {};

    beforeEach(() => {
      reducer = new MyReducer();
      reducer.getInitialState = () => initialState;
    });

    it('returns the state by default', () => {
      expect(reducer.reduce(otherState, {})).toBe(otherState);
    });

    it('returns the initialState if nothing passed to state', () => {
      expect(reducer.reduce(undefined, {})).toBe(initialState);
    });

    it('returns the state when event has an instance which does not implement newState', () => {
      const event = {_instance: {}};
      expect(reducer.reduce(undefined, event)).toBe(initialState);
    });

    it('handles falsey events', () => {
      expect(reducer.reduce(initialState, undefined)).toBe(initialState);
    });

    it('when event should be handled, returns a new state by calling newState on the event instance', () => {
      reducer.getEventSubscriptions = () => MyEvent;
      expect(reducer.reduce(initialState, MyEvent.create())).toEqual('something new');
    });
  });

  describe('should handle events by subscriptions', () => {
    let reducer = null;
    const initialState = {};
    const createSelectorsFn = (state) => 'resulting state';

    beforeEach(() => {
      reducer = Reducer.create({name: 'test', initialState, eventSubscriptions: [], createSelectorsFn});
    });

    it('does not handle null actions', () => {
      expect(reducer.reduce(initialState, null)).toBe(initialState);
    });

    it('does not handle actions which not came from events', () => {
      expect(reducer.reduce(initialState, {})).toBe(initialState);
    });

    it('does not handle actions with instance not extending Event', () => {
      expect(reducer.reduce(initialState, {_instance: {}})).toBe(initialState);
    });

    it('does not handle actions with event not subscribed to', () => {
      expect(reducer.reduce(initialState, {_instance: new Event()})).toBe(initialState);
    });

    class OtherEvent extends Event {
      //
    }

    it('does not handle actions with event not subscribed to, by base class', () => {
      reducer.getEventSubscriptions = () => [OtherEvent];
      expect(reducer.reduce(initialState, {_instance: new MyEvent()})).toBe(initialState);
    });

    it('handles actions with event, which is subscribed to', () => {
      reducer.getEventSubscriptions = () => [OtherEvent, MyEvent];
      expect(reducer.reduce(initialState, {_instance: new MyEvent()})).toBe('something new');
      reducer.getEventSubscriptions = () => {
        return {OtherEvent, MyEvent};
      };
      expect(reducer.reduce(initialState, {_instance: new MyEvent()})).toBe('something new');
      reducer.getEventSubscriptions = () => MyEvent;
      expect(reducer.reduce(initialState, {_instance: new MyEvent()})).toBe('something new');
    });
  });

  describe('selectors', () => {
    it('access state projection using the name', () => {
      const reducer = new MyReducer();
      expect(reducer.getName()).toEqual('MyReducer');
      expect(reducer.getStateProjection({a: {name: 'hello'}, MyReducer: {lastName: 'world'}})).toEqual({lastName: 'world'});
    });

    it('access state projection returns state if no name in state', () => {
      const reducer = new MyReducer();
      expect(reducer.getName()).toEqual('MyReducer');
      expect(reducer.getStateProjection({a: {name: 'hello'}})).toEqual({a: {name: 'hello'}});
    });

    it('calling selectors creates the selectors using the state projection', () => {
      const reducer = new MyReducer();
      reducer.createSelectors = (state) => {
        return {
          getName() {
            return state.name;
          }
        };
      };
      const fullState = {MyReducer: {name: 'Daniel'}};

      expect(reducer.selectors(fullState).getName()).toEqual('Daniel');
    });
  });
});
