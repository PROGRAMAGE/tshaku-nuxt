<template>
  <div class="reels-wrapper">
    <header class="header">
      <NuxtLink to="/tshaps">
        <img src="https://tshaku.com/view/socialV/assets/images/logo.png" class="img-fluid" alt="" style="height:20px;" />
        <span>Tshaps</span>
      </NuxtLink>
    </header>

    <div class="reels-container" ref="containerRef">
      <div v-for="(video, index) in videos" :key="index" class="reel">
        <video :src="video.src" :muted="isMuted" playsinline loop preload="metadata" class="video" @click="handleVideoClick(index)" @loadeddata="markVideoLoaded(index)"></video>
      </div>
    </div>

    <nav class="bottom-nav">
      <button @click="goTo('home')">🏠</button>
      <button @click="goTo('search')">🔍</button>
      <button @click="openAddTshapModal">➕</button>
      <button @click="goToProfile(id)"><img class="avatar" :src="avatar" alt="Profile" /></button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '~/stores/main'

const router = useRouter()
const store = useMainStore()
const avatar = store.avatar
const id = store.userId

const videos = ref([
  { src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', caption: 'Sample' }
])
const isMuted = ref(true)

function handleVideoClick(i) { /* toggle play/pause */ }
function markVideoLoaded(i) { /* placeholder */ }
function goTo(page) { if (page === 'home') router.push('/') }
function openAddTshapModal() { /* placeholder */ }
function goToProfile(uid) { router.push(`/profile/${uid}`) }
</script>

<style scoped>
.reels-wrapper { padding: 1rem }
.video { width: 100%; height: auto }
</style>
