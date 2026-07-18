<template>
  <div>
    <ContentHeader />
    <div id="content-page" class="content-page">
      <div class="container">
        <div class="row">
          <PostItem
            v-if="post"
            :post_text="post.post_text"
            :post_image="post.post_image"
            :post_by_avatar="post.post_by_avatar"
            :post_by_id="post.post_by_id"
            :post_by_names="post.post_by_names"
            :post_comments="post.post_comments"
            :post_likes="post.post_likes"
            :post_date="post.post_date"
            :post_id="post.post_id"
          />
        </div>
      </div>
    </div>
    <ContentFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import PostItem from '@/components/includes/Post.vue'

const route = useRoute()
const id = route.params.post_id
const nuxt = useNuxtApp()
const post = ref(null)

onMounted(async () => {
  try {
    const res = await nuxt.$axios.get(`post.php?action=get&post_id=${id}`, {
      headers: { Authorization: (process.client && localStorage.getItem('token')) || '' }
    })
    post.value = res.data || null
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
</style>
