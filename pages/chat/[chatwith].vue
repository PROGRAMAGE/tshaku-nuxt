<template>
  <div>
    <h1>Chat with {{ chatwith }}</h1>
    <p>Chat page placeholder.</p>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const chatwith = route.params.chatwith
</script>
