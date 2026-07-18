<template>
  <div>
    <h1>Search: {{ q }}</h1>
    <p>Search results (protected)</p>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const q = route.params.q
</script>
