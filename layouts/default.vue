<template>
  <slot />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useMainStore } from '~/stores/main'

const siteData = reactive({
  title: 'Tshaku is the future of online social networking',
  description: 'The future of online social networking'
})

useHead({
  title: siteData.title,
  meta: [
    { name: 'description', content: siteData.description }
  ]
})

const nuxt = useNuxtApp()
const main = useMainStore()

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    // not logged in - keep behavior similar to original (do not force redirect here)
  } else {
    try {
      const res = await nuxt.$axios.get('api.php?action=get_inshuti', { headers: { Authorization: token } })
      const data = res.data
      if (data.response_code === 200) {
        main.addUserInfo(data)
        if (nuxt.$router.currentRoute.value.name === 'login' || nuxt.$router.currentRoute.value.name === 'register') {
          nuxt.$router.push('/')
        }
      } else {
        localStorage.removeItem('token')
        nuxt.$router.push('/login')
      }
    } catch (e) {
      // network or other error - clear token and continue
      localStorage.removeItem('token')
      nuxt.$router.push('/login')
    }
  }
  document.body.classList.add('dark')
})
</script>
