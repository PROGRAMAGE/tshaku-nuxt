<template>
  <div>
    <input type="hidden" :id="`postz_${post_id}`" />
    <div class="col-sm-12" :id="`post_is_${post_id}`" @click="handlePostClick">
      <div class="card card-block card-stretch card-height">
        <div class="card-body" style="padding:0;">
          <div class="user-post-data">
            <div class="d-flex justify-content-between">
              <div class="me-3">
                <NuxtLink :to="profile_link">
                  <img class="rounded-circle img-fluid" :src="`https://tshaku.com/${post_by_avatar}`" alt="" width="50" />
                </NuxtLink>
              </div>
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="mb-0 d-inline-block">
                      <NuxtLink :to="{ name: 'profile', params: { id: post_by_id } }">{{ post_by_names }}</NuxtLink>
                    </h5>
                    <span class="mb-0 d-inline-block"></span>
                    <p class="mb-0 text-primary">{{ convert_date(post_date) }}</p>
                  </div>
                  <div class="card-post-toolbar">
                    <div class="dropdown">
                      <span class="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                        <i class="ri-more-fill"></i>
                      </span>
                      <div class="dropdown-menu m-0 p-0">
                        <a class="dropdown-item p-3" @click.prevent="repost">
                          <div class="d-flex align-items-top">
                            <div class="h4"><i class="ri-save-line"></i></div>
                            <div class="data ms-2"><h6></h6><p class="mb-0">Repost</p></div>
                          </div>
                        </a>
                        <a v-if="ismypost && isloggedin" class="dropdown-item p-3" @click.prevent="delete_post(post_id)" style="cursor:pointer">
                          <div class="d-flex align-items-top">
                            <i class="ri-close-circle-line h4"></i>
                            <div class="data ms-2"><h6>Delete</h6></div>
                          </div>
                        </a>
                        <a class="dropdown-item p-3" @click.prevent="toogleFollow">
                          <div class="d-flex align-items-top">
                            <i class="ri-user-unfollow-line h4"></i>
                            <div class="data ms-2"><h6 v-if="isSubed()">unfollow</h6><h6 v-else>follow</h6></div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3">
            <p v-if="post_text" v-html="post_text"></p>
            <div v-if="post_image">
              <img :src="`https://tshaku.com/${post_image}`" class="img-fluid" />
            </div>
            <div class="post-stats mt-3 d-flex justify-content-between">
              <div>
                <small>{{ post_likes }} likes</small>
                <small class="ms-3">{{ post_comments }} comments</small>
              </div>
              <div>
                <NuxtLink :to="post_link">Open</NuxtLink>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '~/stores/main'
import { useRouter } from 'vue-router'

const props = defineProps({
  seen_posts: [String, Number],
  post_views: [String, Number],
  post_comments: [String, Number],
  post_date: [String, Number],
  post_user_sub: [String, Number],
  post_text: String,
  post_shares: [String, Number],
  post_link: String,
  post_likes: [String, Number],
  post_page_id: [String, Number],
  post_image: String,
  post_by_avatar: String,
  post_by_id: [String, Number],
  post_by_names: String,
  post_id: [String, Number],
  post_type: String
})

const store = useMainStore()
const router = useRouter()

const isloggedin = computed(() => !!(process.client && localStorage.getItem('token')))
const ismypost = computed(() => String(store.userId) === String(props.post_by_id))

function convert_date(d) {
  try {
    const t = new Date(d)
    return t.toLocaleString()
  } catch (e) {
    return d
  }
}

function repost() {
  // placeholder - implement repost API call
  alert('Repost clicked: ' + props.post_id)
}

function delete_post(id) {
  // placeholder - implement delete API call
  if (confirm('Delete post?')) {
    // call API via $axios if needed
    alert('Deleted ' + id)
  }
}

function toogleFollow() {
  // placeholder
  alert('toggle follow for post: ' + props.post_id)
}

function isSubed() {
  // placeholder: return false by default
  return false
}

function handlePostClick() {
  // might navigate to post detail
  if (props.post_link) router.push(props.post_link)
}
</script>

<style scoped>
.post-stats small { color: #777 }
</style>
