<template>
  <div>
    <ContentHeader />
    <div id="content-page" class="content-page">
      <div class="container">
        <div class="row">
          <SocialPoster :avatar="avatar" />
          <input type="hidden" name="page_id" id="page_id" value="0" />
        </div>
        <div class="row">
          <div class="col-lg-12"></div>
        </div>
        <div class="row">
          <div class="col-lg-12 row m-0 p-0">
            <div class="col-sm-12">
              <!-- START USER POSTS -->
              <div id="all-wall-posts">
                <!-- This was previously rendered by a Posts component. After migration, implement Posts in components/includes/Post.vue -->
                <p class="text-muted">Post detail placeholder for post id: {{ post_id }}</p>
              </div>
              <input type="hidden" id="active_post" value="0" />
              <div id="spin_loader"></div>
              <input type="hidden" id="last_loaded_post" value="0" />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContentFooter />
  </div>
</template>

<script setup>
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import SocialPoster from '@/components/includes/SocialPoster.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post_id = route.params.post_id || null
const { useMainStore } = await import('~/stores/main')
const store = useMainStore()
const avatar = store.avatar

definePageMeta({})
</script>

<style scoped>
</style>
