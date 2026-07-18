<template>
  <section class="sign-in-page">
    <div id="container-inside">
      <div id="circle-small"></div>
      <div id="circle-medium"></div>
      <div id="circle-large"></div>
      <div id="circle-xlarge"></div>
      <div id="circle-xxlarge"></div>
    </div>
    <div class="container p-0">
      <div class="row no-gutters">
        <div class="col-md-6 text-center pt-5">
          <div class="sign-in-detail text-white">
            <a class="sign-in-logo mb-5" href="#"><h2>TshaKu</h2></a>
          </div>
        </div>
        <div class="col-md-6 bg-white pt-5 pb-lg-0 pb-5">
          <div class="sign-in-from">
            <h1 class="mb-0">Sign in</h1>
            <p>Enter your email address and password to access your account.</p>
            <form class="mt-4" @submit.prevent="handleLogin">
              <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input v-model="email" type="email" class="form-control mb-0" id="email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input v-model="password" type="password" class="form-control mb-0" id="password" placeholder="Password">
              </div>
              <div class="d-inline-block w-100">
                <button type="submit" class="btn btn-primary float-end">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNuxtApp } from '#app'

const email = ref('')
const password = ref('')
const router = useRouter()
const nuxt = useNuxtApp()

async function handleLogin() {
  try {
    const res = await nuxt.$axios.post('api.php?action=login', {
      email: email.value,
      password: password.value
    })
    if (res.data && res.data.token) {
      localStorage.setItem('token', res.data.token)
      // Optionally fetch user info
      router.push('/')
    } else {
      alert('Login failed')
    }
  } catch (e) {
    console.error(e)
    alert('Network or server error')
  }
}
</script>

<style scoped>
.sign-in-page { padding: 2rem 0 }
</style>
