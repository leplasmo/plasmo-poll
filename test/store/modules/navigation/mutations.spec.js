/** @format */

// ./test/store/modules/navigation/mutations.spec.js

import types from '@/store/types/types';
import navigation from '@/store/modules/navigation';

describe('PlasmoPoll *navigation* store mutations', () => {
  // check that we can add a link to navigation
  it('should add a new link', () => {
    const ADD_SITE_LINK = navigation.mutations[types.ADD_SITE_LINK]; // get the mutation to test
    const state = { siteLinks: [] }; // mock the state
    const newLink = {
      icon: 'someIcon',
      text: 'some text',
      route: '/some/path',
    };

    ADD_SITE_LINK(state, newLink); // commit the mutation

    expect(state.siteLinks[0]).toBe(newLink);
  });
});
