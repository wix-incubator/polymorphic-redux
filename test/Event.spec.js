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
});
