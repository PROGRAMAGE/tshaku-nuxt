import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Tshaku (Nuxt 3)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ]
    }
  },
  css: [
    '@/assets/css/libs.min.css',
    '@/assets/css/socialv.css'
  ],
  modules: [
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://tshaku.com'
    }
  }
})
