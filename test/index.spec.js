import * as index from '../dist';

describe('index', () => {
  it('exports Event and Reducer classes', () => {
    expect(index.Event).toBeDefined();
    expect(index.Reducer).toBeDefined();
  });

  it('exports MergeEvent', () => {
    expect(index.MergeEvent).toBeDefined();
  });

  it('exports UnsetEvent', () => {
    expect(index.UnsetEvent).toBeDefined();
  });
});
