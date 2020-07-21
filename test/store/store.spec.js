/** @format */

// ./test/store/store.spec.js

// test against the real store (integration)
import store from '../../src/store';

describe('PlasmoPoll *root* store', () => {
  // check that navigation module is loaded
  it('should load navigation module', () => {
    expect(store.hasModule('navigation')).toBe(true);
  });
});
