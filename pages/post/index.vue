<script setup>
import { useRuntimeConfig } from '#imports'
import { useAsyncData } from '#app'
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const config = useRuntimeConfig()

const { data: postsData, error } = await useAsyncData('posts', async () => {
  const cat_id = store.cat_id || 0
  const base = config.public.apiBase || ''
  // fetch via runtime api base so this works server-side too
  return await $fetch(base + '/post.php?action=load&cat_id=' + cat_id)
})

const posts = postsData || []
</script>

<template>
  <div>
    <ContentHeader />
    <div id="content-page" class="content-page">
      <div class="container">
        <div class="row">
          <SocialPoster :avatar="useMainStore().avatar" />
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div id="all-wall-posts">
              <div v-if="error">Failed to load posts</div>
              <div v-else>
                <div v-for="post in posts" :key="post.post_id">
                  <PostItem
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
          </div>
        </div>
      </div>
    </div>
    <ContentFooter />
  </div>
</template>

<script>
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import SocialPoster from '@/components/includes/SocialPoster.vue'
import PostItem from '@/components/includes/Post.vue'
import { useMainStore } from '~/stores/main'
export default {
  components: { ContentHeader, ContentFooter, SocialPoster, PostItem }
}
</script>
