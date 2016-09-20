import * as index from '../dist';

describe('index', () => {
  it('exports Event and Reducer classes', () => {
    expect(index.Event).toBeDefined();
    expect(index.Reducer).toBeDefined();
  });

  it('exports combineReducers and getStateProjection functions', () => {
    expect(index.combineReducers).toBeDefined();
    expect(index.getStateProjection).toBeDefined();
  });
});
