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
                          <a :href="`/chat/${conv.otherUser.id}`">
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
                            <img :src="activeConversationAvatar || 'https://tshaku.com/view/socialV/assets/images/user/04.jpg'" alt="avatar" class="avatar-50" />
                          </div>
                          <div class="chat-user-detail">
                            <h6 class="mb-0">{{ activeConversationName || 'Chat' }}</h6>
                            <p class="mb-0">Active now</p>
                          </div>
                        </div>
                      </div>

                      <div class="chat-content" ref="messagesContainer">
                        <div v-for="m in messages" :key="m.id" class="message-item">{{ m.text }}</div>
                        <div ref="bottomMarker"></div>
                      </div>

                      <div class="chat-footer d-flex gap-2 mt-3">
                        <input v-model="newMessage" class="form-control" placeholder="Write a message..." @keyup.enter="sendMessage" />
                        <button class="btn btn-primary" @click="sendMessage">Send</button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ContentHeader from '@/components/includes/ContentHeader.vue'
import ContentFooter from '@/components/includes/ContentFooter.vue'
import { useMainStore } from '~/stores/main'
import { useRoute, useRouter } from 'vue-router'

const store = useMainStore()
const avatar = store.avatar
const f_name = store.firstName
const l_name = store.lastName

const route = useRoute()
const router = useRouter()
const chatWith = route.params.chatwith

const conversations = ref([])
const messages = ref([])
const newMessage = ref('')
const messagesContainer = ref(null)
let unsubscribe = null

const activeConversationAvatar = ref('')
const activeConversationName = ref('')

function goToChat(id) { router.push(`/chat/${id}`) }

async function initFirebaseAndListen() {
  // initialize firebase client-side and listen to messages if available
  if (typeof window === 'undefined') return
  try {
    const init = (await import('/@/plugins/firebase.client.ts')).default
    const fb = await init()
    if (!fb || !fb.db) return
    const { collection, query, where, orderBy, onSnapshot } = await import('firebase/firestore')
    // messages collection structure assumed: documents with { participants: [uid1, uid2], createdAt, text, from }
    const currentUserId = store.userId || null
    if (!currentUserId) return
    const q = query(collection(fb.db, 'messages'), where('participants', 'array-contains', currentUserId), orderBy('createdAt'))
    unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = []
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() })
      })
      // filter messages to conversation with chatWith
      messages.value = msgs.filter(m => m.participants && m.participants.includes(String(chatWith)))
      // update active conversation meta if available
      if (messages.value.length) {
        const last = messages.value[messages.value.length - 1]
        activeConversationName.value = last.fromName || ''
        activeConversationAvatar.value = last.fromAvatar || ''
      }
      // scroll to bottom
      nextTickScroll()
    })
  } catch (e) {
    console.warn('Firebase chat init failed', e)
  }
}

function nextTickScroll() {
  setTimeout(() => {
    const el = messagesContainer.value
    if (el) el.scrollTop = el.scrollHeight
  }, 50)
}

async function sendMessage() {
  if (!newMessage.value) return
  // try to write to Firestore if available, else push locally
  try {
    const init = (await import('/@/plugins/firebase.client.ts')).default
    const fb = await init()
    if (fb && fb.db) {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(fb.db, 'messages'), {
        participants: [String(store.userId), String(chatWith)],
        text: newMessage.value,
        from: store.userId,
        fromName: store.firstName,
        fromAvatar: store.avatar,
        createdAt: serverTimestamp()
      })
      newMessage.value = ''
    } else {
      messages.value.push({ id: Date.now(), text: newMessage.value, from: store.userId })
      newMessage.value = ''
      nextTickScroll()
    }
  } catch (e) {
    console.error('sendMessage error', e)
  }
}

onMounted(() => {
  initFirebaseAndListen()
})

onBeforeUnmount(() => {
  if (typeof unsubscribe === 'function') unsubscribe()
})
</script>

<style scoped>
.chat-page { min-height: 60vh }
.chat-content { max-height: 60vh; overflow-y: auto; padding: 1rem }
.message-item { padding: .5rem; border-radius: 6px; margin-bottom: .5rem; background: #f1f1f1 }
</style>
