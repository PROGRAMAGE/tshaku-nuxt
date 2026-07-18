<template>  
 <ContentHeader />
  <div id="content-page" class="content-page">
  <div class="container">
    <div class="row">   
        <SocialPoster :avatar="avatar"/>
        <input type="hidden" name="page_id" id="page_id" value="0"/>

    </div>
    <div class="row">
        <div class="col-lg-12">            
        </div>
    </div>
    <div class="row">           
        <div class="col-lg-12 row m-0 p-0">
            <div class="col-sm-12">         
                <!-- START USER POSTS -->                     
                <div id="all-wall-posts">                        
                    <!-- END USER POSTS -->     
                    <div v-for="post in posts" :key="post.post_id">
                        <PostItem
                          :seen_posts="seen_posts"
                          :post_views="post.post_views"
                          :post_comments="post.post_comments"
                          :post_date="post.post_date"
                          :post_user_sub="post.user_sub"
                          :post_text="post.post_text"
                          :post_shares="post.post_shares"
                          :post_link="`/post/${post.post_id}`"
                          :post_likes="post.post_likes"
                          :post_page_id="post.post_page_id"
                          :post_image="post.post_image"
                          :post_by_avatar="post.post_by_avatar"
                          :post_by_id="post.post_by_id"
                          :post_by_names="post.post_by_names"
                          :post_id="post.post_id"
                          :post_type="post.post_type"
                        />
                    </div>       
                </div>  
                <input type="hidden" id="active_post" value="0"/>
                <div id="spin_loader"></div>         
                    <input type="hidden" id="last_loaded_post" value="0"/>
                    <br/>                               
                </div> 
            </div>
            <div class="col-sm-12 text-center">                            
            </div>
        </div>
    </div>
  </div>
  <ContentFooter/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import SocialPoster from '@/components/includes/SocialPoster.vue'
import PostItem from '@/components/includes/Post.vue'
import { useMainStore } from '~/stores/main'
import { useNuxtApp } from '#app'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

const store = useMainStore()
const avatar = store.avatar

const posts = ref([])
const seen_posts = ref('')
const posts_loaded = ref(false)

const route = useRoute()
const post_id = route.params.post_id || null

const nuxt = useNuxtApp()

useHead({ title: `Tshaku - Post ${post_id || ''}` })

async function load_posts() {
  posts.value = []
  try {
    const cat_id = store.cat_id || 0
    const res = await nuxt.$axios.get(`post.php?action=load&cat_id=${cat_id}`, {
      headers: { Authorization: (process.client && localStorage.getItem('token')) || '' }
    })
    posts.value = res.data || []
    posts_loaded.value = true
    // After loading, you may want to set up observers etc.
  } catch (e) {
    console.error('load_posts error', e)
    posts_loaded.value = false
  }
}

onMounted(() => {
  load_posts()
})
</script>

<style scoped>
</style>
