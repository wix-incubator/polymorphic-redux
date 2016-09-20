import {Reducer} from './Reducer';
import _ from 'lodash';
import {combineReducers as reduxCombine} from 'redux';

export function combineReducers(...reducers) {
  const toCombine = {};

  _.forEach(reducers, (reducer) => {
    if (reducer instanceof Reducer) {
      toCombine[reducer.getName()] = reducer.reduce;
    } else {
      _.merge(toCombine, reducer);
    }
  });

  return reduxCombine(toCombine);
}

export function getStateProjection(fullState, reducer) {
  const name = reducer instanceof Reducer ? reducer.getName() : reducer;
  return _.get(fullState, name);
}
