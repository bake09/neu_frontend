<template>
  <q-page class="background">

    <Header />

    <div class="absolute full-width full-height column q-pb-xl">
      <q-scroll-area
        class="q-scroll-area-custom"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
        ref="chatBox">
        <span
          v-if="chatStore.currentChat"
          v-for="message in chatStore.currentChat.messages"
          :key="message.id">
          <q-chat-message
            :name="message.user.name"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :sent="authStore.user.id == message.user.id ? true : false"
            :bg-color="authStore.user.id == message.user.id ? 'grey-2 shadow-6' : 'green-2 shadow-6'"
            class="q-px-sm"
            >
            <div class="flex">
              <q-item-label>
                <div :class="{ 'text-collapsed': !showMore }" v-html="formattedMessage(message.content)"></div>
                <q-btn v-if="isLongText(message.content)" flat size="md" @click="toggleShowMore">
                  {{ showMore ? 'Weniger' : 'Mehr' }}
                </q-btn>
              </q-item-label>
              <div class="timestamp">{{ message.created_at_time }}
                <q-icon name="check" style="font-size: 14px;"/>
                <q-icon name="done_all"  style="font-size: 14px;"/>
              </div>
            </div>
          </q-chat-message>
        </span>
      </q-scroll-area>

      <q-inner-loading :showing="chatStore.chatIsLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
    
    <div class="shadow-2s custom-footer">
      <ChatInput class="q-pa-xs" @message-sent="animateScroll" @isTyping="chatStore.whisperIsTyping(authStore.user.name)" />
    </div>
  </q-page>
</template>

<script setup>
import { watchArray } from '@vueuse/core'

import Header from "../components/Chat/Header.vue";

import { onMounted, ref, nextTick, onUnmounted } from "vue";
import ChatInput from '../components/Chat/ChatInput.vue'

import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const chatBox = ref(null)

const animateScroll = async () => {
  if (!chatBox.value) return;
  await nextTick(); // Ensure that the DOM is updated
  const scrollTarget = chatBox.value.getScrollTarget();
  const scrollHeight = scrollTarget.scrollHeight;
  chatBox.value.setScrollPosition('vertical', scrollHeight, 0);
  // chatBox.value.setScrollPosition('vertical', scrollHeight, 150);
}

const goBack = () => {
  router.replace('/chats')
}

const formattedMessage = (val) => {
  // Konvertiere Zeilenumbrüche in HTML <br> Tags
  return val.replace(/\n/g, '<br>');
};
const showMore = ref(false);
const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
const isLongText = (val) => {
  const lineCount = val.split('\n').length;
  return lineCount > 5;
};

import { echo } from "../boot/echo";

onMounted(async () => {
  if(!chatStore.currentChat.messages?.length){
    await chatStore.getSingleChat(route.params.id)

    watchArray(chatStore.currentChat.messages, async (newList, oldList, added, removed) => {
      // console.log("newList : ", newList.length) // [1, 2, 3, 4]
      // console.log("oldList : ", oldList.length) // [1, 2, 3]
      // console.log("added : ", added) // [4]
      // console.log("removed : ", removed) // []

      if(newList.length > oldList.length){
        await animateScroll()
      }
    })
  }

  await animateScroll()
  
})

onUnmounted(() => {
  console.log("unmounted")
  chatStore.setCurrentChat(null)
})

const onLoad = (index, done) => {
  console.log("onLoad fired")
  // done()
}
</script>

<style>
.custom-footer{
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
.q-message-text:last-child {
  min-height: 0 !important;
}

.timestamp{
  color: grey;
  font-size: 0.8em;
  padding-top: 8px;
  padding-left: 4px;
  margin-bottom: -6px;
  margin-right: -4px;
  text-align: right;
  align-self: flex-end;
}

.text-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
}

.q-item-label {
  white-space: pre-wrap; /* sorgt dafür, dass Zeilenumbrüche korrekt angezeigt werden */
}
</style>
