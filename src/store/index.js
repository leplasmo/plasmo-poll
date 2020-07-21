/** @format */

// ./src/store/index.js

import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
// import { sync } from 'vuex-router-sync';

// import router from '../router';

import navigation from '@/store/modules/navigation';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const plugins = [];

plugins.push(createPersistedState());

const store = new Vuex.Store({
  state: {},
  strict: debug,
  plugins,
  modules: {
    navigation,
  },
});

// sync(store, router);

export default store;
