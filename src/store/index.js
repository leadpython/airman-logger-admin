import Vue from 'vue'
import Vuex from 'vuex'

import airman from './airman/index.js'
import phase from './phase/index.js'
import room from './room/index.js'
import squadron from './squadron/index.js'
import status from './status/index.js'
import report from './report/index.js'
import admin from './admin/index.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      airman,
      phase,
      room,
      squadron,
      status,
      report,
      admin
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
