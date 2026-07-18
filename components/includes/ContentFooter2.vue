<template>
  <div>
    <input type="hidden" id="feed_hashtag" value="0" />
    <input type="hidden" id="feed_status" value="0" />
    <footer class="iq-footer bg-white">
    </footer>
  </div>
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
</style>
