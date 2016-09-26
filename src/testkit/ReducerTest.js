export class ReducerTest {

  static create(reducer) {
    return new ReducerTest(reducer);
  }

  constructor(reducer) {
    this.reducer = reducer;
    this._verify();
    this.state = reducer.getInitialState();
  }

  _verify() {
    if (!this.reducer) {
      throw new Error('must be constructed with a Reducer');
    }
    if (!this.reducer.getName()) {
      throw new Error('Reducer must provide a name');
    }
    if (!this.reducer.getInitialState()) {
      throw new Error('Reducer must provide initialState');
    }
    if (!this.reducer.getEventSubscriptions()) {
      throw new Error('Reducer must provide event subscriptions');
    }
    if (!this.reducer.selectors({})) {
      throw new Error('Reducer must be able to create selectors');
    }
  }

  dispatch(action) {
    this.state = this.reducer.reduce(this.state, action);
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}
