<template>
  <div>
    <h1>Profile: @{{ handle }}</h1>
    <p>Profile by handle (public)</p>
  </div>
</template>

<script setup>
const route = useRoute()
const handle = route.params.handle
</script>
