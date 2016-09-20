import {Reducer} from './Reducer';
import _ from 'lodash';
import {combineReducers as reduxCombine} from 'redux';

export function combineReducers(...reducers) {
  const toCombine = {};

  _.forEach(reducers, (reducer) => {
    if (reducer instanceof Reducer) {
      toCombine[reducer.name] = reducer.reduce;
    } else {
      //toCombine[]
    }
  });

  return reduxCombine(toCombine);
}
