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
              <div id="all-wall-posts"></div>
            </div>
            <div class="col-sm-12 text-center"></div>
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
</script>

<style scoped>
</style>
