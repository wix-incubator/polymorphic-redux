import {Event} from './Event';
import _ from 'lodash';

export class UnsetEvent extends Event {
  newState(oldState, params) {
    const newState = _.clone(oldState);
    _.unset(newState, this.getRemovePath(oldState, params));
    return newState;
  }

  getRemovePath(oldState, params) {
    return params;
  }
}
