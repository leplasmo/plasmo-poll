// ./src/store/modules/navigation.js

import types from '@/store/types/types';

const navigation = {
  namespaced: true,
  state() {
    return {
      siteLinks: [
        {
          icon: 'mdi-poll',
          text: 'Polls',
          route: '/',
        },
      ],
    };
  },
  mutations: {
    [types.ADD_SITE_LINK](state, link) {
      state.siteLinks.push(link);
    },
  },
  actions: {
    setSiteLink({ commit }, link) {
      commit(types.ADD_SITE_LINK, link);
    },
  },
  getters: {
    getSiteLinks: (state) => {
      return state.siteLinks;
    },
  },
};

export default navigation;
