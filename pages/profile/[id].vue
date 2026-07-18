<template>
  <div>
    <h1>Profile ID: {{ id }}</h1>
    <p>Profile page (public)</p>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
</script>
