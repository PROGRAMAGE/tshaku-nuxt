<template>
  <div>
    <div class="social-poster">
      <button @click="openModal">Create Post</button>
    </div>
    <!-- modal placeholder -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
function openModal() { open.value = true }
</script>

<style scoped>
.social-poster { padding: 1rem }
</style>
