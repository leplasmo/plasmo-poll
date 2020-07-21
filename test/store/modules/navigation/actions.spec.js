/** @format */

// ./test/store/actions.spec.js

import navigation from '@/store/modules/navigation';
import types from '@/store/types/types';
// import api from '../../src/api/api-mock';

describe('PlasmoPoll *navigation* store actions', () => {
  it('should have setSiteLink action', () => {
    const { setSiteLink } = navigation.actions;
    const mockContext = {
      commit: jasmine.createSpy('commit'),
    };
    const newLink = {};

    setSiteLink(mockContext, newLink);

    expect(mockContext.commit).toHaveBeenCalledWith(
      types.ADD_SITE_LINK,
      newLink,
    );
  });
});
