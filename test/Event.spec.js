import 'jasmine-expect';
import _ from 'lodash';
import {Event} from '../src/Event';

describe('Event', () => {
  it('creates a redux action', () => {
    const params = {};
    const result = Event.create(params);

    expect(_.isPlainObject(result)).toBeTrue();
    expect(result.type).toEqual('Event');
    expect(result._instance).toBeObject();
    expect(result._instance instanceof Event).toBeTrue();
  });

  it('prefixes namespace if defined', () => {
    class SpecificEvent extends Event {
      static namespace = 'some.name.space.'
    }

    const params = {};
    const result = SpecificEvent.create(params);

    expect(_.isPlainObject(result)).toBeTrue();
    expect(result.type).toEqual('some.name.space.SpecificEvent');
    expect(result._instance).toBeObject();
    expect(result._instance instanceof Event).toBeTrue();
  });

  describe('newState (called by the Reducer)', () => {
    it('returns oldState by default', () => {
      const oldState = {};
      const action = Event.create('');
      expect(action._instance.newState(oldState)).toBe(oldState);
    });
  });

  describe('merge helper method', () => {
    it('by default not implemented', () => {
      const oldState = {};
      expect(Event.create({})._instance.merge()).toEqual(undefined);
      expect(Event.create({})._instance.newState(oldState, {})).toEqual(oldState);
      expect(oldState).toEqual({});
    });

    class MergeEvent extends Event {
      merge(oldState, params) {
        return params;
      }
    }

    it('if implemented and returns value, merges with oldState into newState', () => {
      const oldState = {a: 123};
      expect(MergeEvent.create({})._instance.newState(oldState, {b: 456})).toEqual({a: 123, b: 456});
    });

    it('merges deeply', () => {
      class MergeEventDeep extends Event {
        merge(oldState, todo) {
          return {todos: todo};
        }
      }

      const oldState = {todos: {123: 'buy milk'}};
      const action = MergeEventDeep.create({456: 'buy meat'});
      expect(action._instance.newState(oldState, action._instance.params)).toEqual({
        todos: {
          123: 'buy milk',
          456: 'buy meat'
        }
      });
    });
  });

  describe('"remove" helper method', () => {
    it('be default not implemented', () => {
      const oldState = {};
      expect(Event.create({})._instance.remove()).toEqual(undefined);
      expect(Event.create({})._instance.newState(oldState, {})).toEqual(oldState);
      expect(oldState).toEqual({});
    });

    class RemovingEvent extends Event {
      remove(oldState, params) {
        return params;
      }
    }

    it('if implemented and returns String, removes that path from oldState - new state object', () => {
      const oldState = {a: 123, b: 456};
      expect(RemovingEvent.create({})._instance.newState(oldState, 'b')).toEqual({a: 123});
      expect(oldState).toEqual({a: 123, b: 456});
    });

    it('removes deeply', () => {
      const oldState = {
        todos: {
          123: 'buy milk',
          456: 'buy meat',
          789: {a: 1, b: 2}
        }
      };
      const action = RemovingEvent.create('todos.789.a');
      expect(action._instance.newState(oldState, action._instance.params)).toEqual({
        todos: {
          123: 'buy milk',
          456: 'buy meat',
          789: {b: 2}
        }
      });
    });
  });
});
