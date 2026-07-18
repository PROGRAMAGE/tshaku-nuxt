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
          <div class="col-lg-12 d-none d-sm-block">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <div class="header-title">
                  <h4 class="card-title">Stories</h4>
                </div>
              </div>
              <div class="card-body">
                <ul class="media-story list-inline m-0 p-0">
                  <li class="d-flex mb-3 align-items-center">
                    <i class="ri-add-line"></i>
                    <div class="stories-data ms-3">
                      <h5>Creat Your Story</h5>
                      <p class="mb-0">time to story</p>
                    </div>
                  </li>
                  <li class="d-flex mb-3 align-items-center active">
                    <img src="https://tshaku.com/view/socialV/assets/images/page-img/s2.jpg" alt="story-img" class="rounded-circle img-fluid">
                    <div class="stories-data ms-3">
                      <h5>Anna Mull</h5>
                      <p class="mb-0">1 hour ago</p>
                    </div>
                  </li>
                  <li class="d-flex mb-3 align-items-center">
                    <img src="https://tshaku.com/view/socialV/assets/images/page-img/s3.jpg" alt="story-img" class="rounded-circle img-fluid">
                    <div class="stories-data ms-3">
                      <h5>Ira Membrit</h5>
                      <p class="mb-0">4 hour ago</p>
                    </div>
                  </li>
                  <li class="d-flex align-items-center">
                    <img src="https://tshaku.com/view/socialV/assets/images/page-img/s1.jpg" alt="story-img" class="rounded-circle img-fluid">
                    <div class="stories-data ms-3">
                      <h5>Bob Frapples</h5>
                      <p class="mb-0">9 hour ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts placeholder -->
        <div class="row">
          <div class="col-sm-12">
            <div id="all-wall-posts">
              <!-- Posts will be rendered here after migration of Posts component -->
              <p class="text-muted">Posts placeholder — migrate Posts component to components/includes/Post.vue to render posts here.</p>
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
import { useMainStore } from '~/stores/main'

const store = useMainStore()
const avatar = store.avatar

definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
</style>
