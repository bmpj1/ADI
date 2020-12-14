import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';

Vue.use(Vuex)
// https://www.smashingmagazine.com/2020/01/data-components-vue-js/#vuex-application-level-shared-state
export default new Vuex.Store({
  modules: {
    auth
  }
})
