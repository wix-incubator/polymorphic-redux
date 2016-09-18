import * as index from '../dist';

describe('index', () => {
  it('exports Event and Reducer classes', () => {
    expect(index.Event).toBeDefined();
    expect(index.Reducer).toBeDefined();
  });
});
