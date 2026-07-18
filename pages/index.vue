<template>
  <div>
    <Header />
    <main class="container">
      <h1>Welcome to Tshaku (Nuxt)</h1>
      <p>This is a starter index page. Replace with your migrated pages and components.</p>
      <HomeComponent />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import HomeComponent from '@/components/HomeComponent.vue'

// Example of using runtime config
const config = useRuntimeConfig()
// console.log('API base:', config.public.apiBase)
</script>

<style scoped>
.container { padding: 1.5rem; }
</style>
