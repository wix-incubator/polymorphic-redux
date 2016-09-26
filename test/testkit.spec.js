require('jasmine-expect');
import {ReducerTest} from '../src/testkit';
import {Reducer} from '../src';

describe('testkit', () => {
  describe('ReducerTest', () => {
    class MyReducer extends Reducer {
      getInitialState() {
        return {};
      }

      getEventSubscriptions() {
        return [];
      }

      createSelectors() {
        return {};
      }
    }

    it('can be created', () => {
      expect(new ReducerTest(new MyReducer())).toBeObject();
      expect(ReducerTest.create(new MyReducer())).toBeObject();
      expect(() => new ReducerTest()).toThrow(new Error('must be constructed with a Reducer'));
    });

    it('verifies name', () => {
      const reducer = new MyReducer();
      reducer.getName = () => '';
      expect(() => new ReducerTest(reducer)).toThrow(new Error('Reducer must provide a name'));
    });
    it('verifies initialState', () => {
      const reducer = new MyReducer();
      reducer.getInitialState = () => '';
      expect(() => new ReducerTest(reducer)).toThrow(new Error('Reducer must provide initialState'));
    });
    it('verifies event subscriptions', () => {
      const reducer = new MyReducer();
      reducer.getEventSubscriptions = () => '';
      expect(() => new ReducerTest(reducer)).toThrow(new Error('Reducer must provide event subscriptions'));
    });
    it('verifies selectors', () => {
      const reducer = new MyReducer();
      reducer.createSelectors = () => '';
      expect(() => new ReducerTest(reducer)).toThrow(new Error('Reducer must be able to create selectors'));
    });

    it('holds state, initialized with initialState', () => {
      const reducer = new MyReducer();
      reducer.getInitialState = () => {
        return {
          inner: 123
        };
      };
      const reducerTest = new ReducerTest(reducer);
      expect(reducerTest.getState()).toEqual({inner: 123});
      reducerTest.setState({other: 456});
      expect(reducerTest.getState()).toEqual({other: 456});
    });

    it('can dispatch', () => {
      const reducer = Reducer.create({name: 'r', initialState: {inner: 123}, eventSubscriptions: Object, createSelectorsFn: () => Object});
      spyOn(reducer, 'reduce').and.returnValue({other: 456});
      const reducerTest = new ReducerTest(reducer);

      expect(reducer.reduce).not.toHaveBeenCalled();
      reducerTest.dispatch({type: 'sometype'});
      expect(reducer.reduce).toHaveBeenCalledTimes(1);
      expect(reducer.reduce).toHaveBeenCalledWith({inner: 123}, {type: 'sometype'});
      expect(reducerTest.getState()).toEqual({other: 456});
    });
  });
});
