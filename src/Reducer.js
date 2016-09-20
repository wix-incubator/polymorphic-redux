import _ from 'lodash';
import {Event} from './Event';
import * as CombinedReducers from './CombinedReducers';

export class Reducer {

  /**
   * @param params - name, initialState, eventSubscriptions, createSelectorsFn
   * @return {Reducer}
   */
  static create(params) {
    verifyParams(params);
    const {name, initialState, eventSubscriptions, createSelectorsFn} = params;
    return new ReducerImpl(name, initialState, eventSubscriptions, createSelectorsFn);
  }

  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  /**
   * This is what you send to the store, using combineReducers function or directly
   */
  reduce(state = this.getInitialState(), action) {
    if (shouldHandle(action, this.getEventSubscriptions())) {
      return action._instance.newState(state, action._instance.params);
    } else {
      return state;
    }
  }

  selectors(state) {
    return this.createSelectors(this.getStateProjection(state));
  }

  getStateProjection(state) {
    const projection = CombinedReducers.getStateProjection(state, this);
    return projection || state;
  }

  getName() {
    return this.constructor.name;
  }

  getInitialState() {
    throw new Error('must implement getInitialState');
  }

  getEventSubscriptions() {
    throw new Error('must implement getEventSubscriptions');
  }

  createSelectors(state) {
    throw new Error('must implement createSelectors');
  }
}

function shouldHandle(action, eventSubscriptions) {
  return action &&
         action._instance &&
         action._instance instanceof Event &&
         subscribedTo(action._instance, eventSubscriptions);
}

function subscribedTo(event, eventSubscriptions) {
  if (_.isFunction(eventSubscriptions)) {
    return event instanceof eventSubscriptions;
  } else {
    return _.find(eventSubscriptions, (clazz) => event instanceof clazz);
  }
}

class ReducerImpl extends Reducer {
  constructor(name, initialState, eventSubscriptions, createSelectorsFn) {
    super();
    this.name = name;
    this.initialState = initialState;
    this.eventSubscriptions = eventSubscriptions;
    this.createSelectorsFn = createSelectorsFn;
  }

  getName() {
    return this.name;
  }

  getInitialState() {
    return this.initialState;
  }

  getEventSubscriptions() {
    return this.eventSubscriptions;
  }

  createSelectors(state) {
    return this.createSelectorsFn(state);
  }
}

function verifyParams(params) {
  if (!params) {
    throw new Error('must provide params');
  }
  if (!params.name) {
    throw new Error('must provide params.name');
  }
  if (!params.initialState) {
    throw new Error('must provide params.initialState');
  }
  if (!params.eventSubscriptions) {
    throw new Error('must provide params.eventSubscriptions');
  }
  if (!params.createSelectorsFn) {
    throw new Error('must provide params.createSelectorsFn');
  }
}
