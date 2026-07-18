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
      <div class="row">
        <div class="col-md-12">
          <form class="mt-4" @submit.prevent="handleRegistration">
            <div class="row no-gutters">
              <div class="col-md-6 bg-white">
                <div class="form-group">
                  <label for="f_name">*First Name:</label>
                  <input v-model="f_name" id="f_name" class="form-control mb-0" />
                  <label for="l_name">*Last Name:</label>
                  <input v-model="l_name" id="l_name" class="form-control mb-0" />
                </div>
                <div class="form-group">
                  <label for="email">*Email:</label>
                  <input v-model="email" id="email" class="form-control mb-0" />
                  <label for="password">*New Password:</label>
                  <input v-model="password" id="password" type="password" class="form-control mb-0" />
                </div>
                <button type="submit" class="btn btn-primary">Create my account</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'

const f_name = ref('')
const l_name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const nuxt = useNuxtApp()

async function handleRegistration() {
  if (!f_name.value || !l_name.value || !email.value || !password.value) {
    alert('Please fill in all mandatory fields')
    return
  }
  try {
    const res = await nuxt.$axios.post('api.php?action=userRegister', {
      f_name: f_name.value,
      l_name: l_name.value,
      email: email.value,
      password: password.value
    })
    if (res.data && res.data.response_code === 200) {
      alert('Registration successful')
      router.push('/login')
    } else {
      alert(res.data?.message || 'Registration failed')
    }
  } catch (e) {
    console.error(e)
    alert('Network or server error')
  }
}
</script>

<style scoped>
</style>
