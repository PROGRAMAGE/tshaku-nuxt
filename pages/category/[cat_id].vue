<template>
  <div>
    <h1>Category: {{ cat_id }}</h1>
    <p>Category listing (public)</p>
  </div>
</template>

<script setup>
const route = useRoute()
const cat_id = route.params.cat_id
</script>
