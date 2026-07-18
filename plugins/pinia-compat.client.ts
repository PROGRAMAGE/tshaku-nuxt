import { defineNuxtPlugin, useNuxtApp } from '#app'
import { useMainStore } from '~/stores/main'

export default defineNuxtPlugin((nuxtApp) => {
  // provide a $store compatible object for components that still use this.$store.dispatch / this.$store.state
  const main = useMainStore()
  const compat = {
    get state() { return main },
    dispatch(action, payload) {
      if (typeof main[action] === 'function') return main[action](payload)
      // support old names where Vuex actions named same as methods
      return undefined
    }
  }

  // inject as global property for Options API compatibility
  nuxtApp.vueApp.config.globalProperties.$store = compat
  nuxtApp.provide('store', compat)
})
