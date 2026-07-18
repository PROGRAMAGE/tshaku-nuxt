<template>
  <div>
    <ContentHeader />
    <div class="container">
      <div v-if="!results_found" class="alert alert-danger">{{ results_message }}</div>
      <div v-else class="row">
        <div class="col-md-6" v-for="result in results" :key="result.id">
          <div class="card" v-if="result.names">
            <div class="card-body profile-page p-0">
              <div class="profile-header-image">
                <div class="cover-container">
                  <img :src="`https://tshaku.com/${result.page_banner}`" class="rounded img-fluid w-100" />
                </div>
                <div class="profile-info p-4">
                  <div class="user-detail">
                    <div class="d-flex flex-wrap justify-content-between align-items-start">
                      <div class="profile-detail d-flex">
                        <div class="profile-img pe-4">
                          <img :src="`https://tshaku.com/${result.avatar}`" class="avatar-130 img-fluid" />
                        </div>
                        <div class="user-data-block">
                          <h4><NuxtLink :to="`/profile/${result.id}`">{{ result.names }}</NuxtLink></h4>
                          <h6>{{ result.city }}</h6>
                          <p>{{ result.country }}</p>
                        </div>
                      </div>
                      <button v-if="result.isFollower" class="btn btn-primary">Un-Follow</button>
                      <button v-else class="btn btn-primary">Follow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-for="post in posts" :key="'post-' + post.post_id">
          <NuxtLink :to="`/post/${post.post_id}`" class="card text-decoration-none">
            <div class="card-body"><h5>{{ post.post_title }}</h5><p>{{ post.post_text }}</p></div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <ContentFooter2 />
  </div>
</template>

<script setup>
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter2 from '@/components/includes/ContentFooter2.vue'
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const results = ref([])
const posts = ref([])
const results_found = ref(true)
const results_message = ref('')
const nuxt = useNuxtApp()

onMounted(async () => {
  try {
    const res = await nuxt.$axios.get('search.php?action=default')
    // placeholder parsing
    results.value = res.data?.results || []
    posts.value = res.data?.posts || []
    results_found.value = results.value.length > 0 || posts.value.length > 0
    results_message.value = res.data?.message || 'No results'
  } catch (e) {
    results_found.value = false
    results_message.value = 'Search error'
  }
})
</script>

<style scoped>
</style>
