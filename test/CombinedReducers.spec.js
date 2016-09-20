import {combineReducers as reduxCombine} from 'redux';
import * as uut from '../src/CombinedReducers';
import {Reducer} from './../src/Reducer';

function normalReducer(state = {name: 'hello'}, action) {
  return state;
}

function anotherNormal(state = {name: 'world'}, action) {
  return state;
}

class MyReducer extends Reducer {
  getInitialState() {
    return {name: 'polymorphic'};
  }

  getEventSubscriptions() {
    return [];
  }
}

describe('CombinedReducers', () => {
  describe('combineReducer', () => {
    it('combines reducers normally', () => {
      const result1 = uut.combineReducers({normalReducer, anotherNormal})();
      const result2 = reduxCombine({normalReducer, anotherNormal})();
      expect(result2).toEqual({normalReducer: {name: 'hello'}, anotherNormal: {name: 'world'}});
      expect(result1).toEqual(result2);
    });

    it('combines polymorphic reducers by name', () => {
      const result = uut.combineReducers(new MyReducer(), {normalReducer, anotherNormal})();
      expect(result).toEqual({normalReducer: {name: 'hello'}, anotherNormal: {name: 'world'}, MyReducer: {name: 'polymorphic'}});
    });
  });

  describe('getStateProjection', () => {
    it('returns the state of the reducer by name or undefined', () => {
      const state = {name: 123};
      expect(uut.getStateProjection(state, 'name')).toEqual(123);
      expect(uut.getStateProjection(state, 'other')).toEqual(undefined);
    });

    it('returns the state of the reducer by name or undefined - handles Reducer objects', () => {
      const state = {MyReducer: 123};
      expect(uut.getStateProjection(state, new MyReducer())).toEqual(123);
      expect(uut.getStateProjection(state, 'other')).toEqual(undefined);
    });
  });
});
