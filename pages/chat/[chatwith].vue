<template>
  <div>
    <ContentHeader />
    <div class="container" style="max-height:100%;overflow:hidden;">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body chat-page p-0">
              <div class="chat-data-block">
                <div class="row">
                  <div class="col-lg-3 chat-data-left scroller">
                    <div class="chat-search pt-3 ps-3">
                      <div class="d-flex align-items-center">
                        <div class="chat-profile me-3">
                          <img :src="avatar" alt="chat-user" class="avatar-60" />
                        </div>
                        <div class="chat-caption">
                          <h5 class="mb-0">{{ f_name }}</h5>
                          <p class="m-0">Online</p>
                        </div>
                        <button type="submit" class="close-btn-res p-3"><i class="ri-close-fill"></i></button>
                      </div>
                      <div id="user-detail-popup" class="scroller">
                        <div class="user-profile">
                          <div class="user text-center mb-4">
                            <a class="avatar m-0">
                              <img :src="avatar" alt="avatar" style="width:100%;" />
                            </a>
                            <div class="user-name mt-4">
                              <h4 class="text-center">{{ f_name }} {{ l_name }}</h4>
                            </div>
                            <div class="user-desc">
                              <p class="text-center">(Me)</p>
                            </div>
                          </div>
                          <hr />
                          <div class="user-detail text-left mt-4 ps-4 pe-4">
                            <h5 class="mt-4 mb-4">About</h5>
                            <p>Profile page</p>
                            <h5 class="mt-3 mb-3">Status</h5>
                            <ul class="user-status p-0">
                              <li class="mb-1"><i class="ri-checkbox-blank-circle-fill text-success pe-1"></i><span>Online</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="chat-searchbar mt-4">
                        <div class="form-group chat-search-data m-0">
                          <input type="text" class="form-control round" id="chat-search" placeholder="Search" />
                          <i class="ri-search-line"></i>
                        </div>
                      </div>
                    </div>
                    <div class="chat-sidebar-channel scroller mt-4 ps-3">
                      <h5 class="mt-3">Tshats :)</h5>
                      <ul class="iq-chat-ui nav flex-column nav-pills">
                        <li v-for="conv in conversations" :key="conv.id" class="conversation-item" @click="goToChat(conv.otherUser.id)">
                          <a :href="`/chats/${conv.otherUser.id}`">
                            <div class="d-flex align-items-center">
                              <div class="avatar me-2">
                                <img :src="conv.otherUser.avatar" :alt="conv.otherUser.name" class="avatar-50" />
                                <span class="avatar-status"><i class="ri-checkbox-blank-circle-fill text-dark"></i></span>
                              </div>
                              <div class="chat-sidebar-name">
                                <h6 class="mb-0">{{ conv.otherUser.name }}</h6>
                                <p class="mb-0">{{ conv.lastMessage }}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Right side chat area -->
                  <div class="col-lg-9 chat-data-right scroller">
                    <div class="chat-area">
                      <div class="chat-header d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <div class="avatar me-3">
                            <img :src="activeConversationAvatar" alt="avatar" class="avatar-50" />
                          </div>
                          <div class="chat-user-detail">
                            <h6 class="mb-0">{{ activeConversationName }}</h6>
                            <p class="mb-0">Active now</p>
                          </div>
                        </div>
                      </div>

                      <div class="chat-content">
                        <!-- messages will render here after full migration -->
                        <div v-for="m in messages" :key="m.id" class="message-item">{{ m.text }}</div>
                        <div ref="bottomMarker"></div>
                      </div>

                      <div class="chat-footer">
                        <input v-model="newMessage" class="form-control" placeholder="Write a message..." @keyup.enter="sendMessage" />
                      </div>
                    </div>
                  </div>

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

<script setup>
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import { ref } from 'vue'
import { useMainStore } from '~/stores/main'
import { useRoute, useRouter } from 'vue-router'

const store = useMainStore()
const avatar = store.avatar
const f_name = store.firstName
const l_name = store.lastName

const conversations = ref([])
const messages = ref([])
const router = useRouter()

function goToChat(id) { router.push(`/chat/${id}`) }

const activeConversationAvatar = ''
const activeConversationName = ''

function sendMessage() {
  if (!newMessage.value) return
  messages.value.push({ id: Date.now(), text: newMessage.value })
  newMessage.value = ''
}

const newMessage = ref('')
</script>

<style scoped>
.chat-page { min-height: 60vh }
</style>
