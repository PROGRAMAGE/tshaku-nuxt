<template>
  <div>
    <h1>Post: {{ post_id }}</h1>
    <p>Post detail (public)</p>
  </div>
</template>

<script setup>
const route = useRoute()
const post_id = route.params.post_id
</script>
