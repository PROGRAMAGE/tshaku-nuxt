<template>
  <footer class="iq-footer bg-white">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6">
          <ul class="list-inline mb-0">
            <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
            <li class="list-inline-item"><a href="#">Terms of Use</a></li>
          </ul>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
          Copyright &copy;&nbsp; <a href="#">Tshaku</a> All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
  <nav class="iq-float-menu">
    <input type="checkbox" class="iq-float-menu-open" name="menu-open" id="menu-open" />
    <label class="iq-float-menu-open-button" for="menu-open">
      <span class="lines line-1"></span>
      <span class="lines line-2"></span>
      <span class="lines line-3"></span>
    </label>
    <button class="iq-float-menu-item bg-danger" title="Scroll to Active Post" @click="scroll_to_active_post"><i class="ri-play-circle-line"></i></button>
    <button class="iq-float-menu-item bg-warning" title="Scroll to top" @click="scrollToTop"><i class="ri-arrow-up-fill"></i></button>
    <button class="iq-float-menu-item bg-danger" title="Tshaps" @click="goToTshaps"><i class="ri-video-line"></i></button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function scroll_to_active_post() {
  try {
    const active_post = document.getElementById('active_post')?.value
    if (active_post) document.getElementById(active_post).scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' })
  } catch (e) {}
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
function goToTshaps() { router.push('/tshaps') }
</script>

<style scoped>
.iq-footer { padding: 1rem 0 }
.iq-float-menu { position: fixed; right: 1rem; bottom: 1rem }
</style>
