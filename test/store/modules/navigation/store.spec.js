/** @format */

// ./test/store/modules/navigation.spec.js

// test against the real store (integration)
import store from '@/store';

describe('PlasmoPoll *navigation* store state', () => {
  // check that siteLinks (array) exists and is an array
  it('should have a list of links', () => {
    expect(Array.isArray(store.state.navigation.siteLinks)).toBe(true);
  });
});
