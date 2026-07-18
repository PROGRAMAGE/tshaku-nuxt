import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'Tshaku (Nuxt 3 Migration)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        // favicon preserved as in original (BASE_URL template not used in Nuxt)
        { rel: 'icon', href: '/favicon.ico' },
        // vendor CSS that were referenced in the original public/index.html
        { rel: 'stylesheet', href: 'https://tshaku.com/view/socialV/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css' },
        { rel: 'stylesheet', href: 'https://tshaku.com/view/socialV/assets/vendor/remixicon/fonts/remixicon.css' },
        { rel: 'stylesheet', href: 'https://tshaku.com/view/socialV/assets/vendor/vanillajs-datepicker/dist/css/datepicker.min.css' },
        { rel: 'stylesheet', href: 'https://tshaku.com/view/socialV/assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css' }
      ],
      script: [
        { src: 'https://tshaku.com/view/socialV/assets/js/libs.min.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/slider.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/app.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/masonry.pkgd.min.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/enchanter.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/sweetalert.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/customizer.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/charts/weather-chart.js', defer: true, body: true },
        { src: 'https://tshaku.com/view/socialV/assets/js/lottie.js', defer: true, body: true }
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
