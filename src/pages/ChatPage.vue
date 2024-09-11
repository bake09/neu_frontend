<template>
  <q-page class="background">

    <Header />

    <div class="absolute fit column q-pb-xl">
      <q-scroll-area
        class="fit q-px-xs"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
        ref="chatBox"
        @scroll="onScroll">

        <div class="flex flex-center" style="height: 40px;" v-show="!chatStore.isLastPage" >
          <q-spinner-dots color="primary" size="40px" v-show="chatStore.loadMoreShowing" />
        </div>
        
        <span
          v-if="chatStore.currentChat"
          v-for="message in chatStore.currentChat.messages"
          :key="message.id">
          <q-chat-message
            :name="message.user.name"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :sent="authStore.user.id == message.user.id ? true : false"
            :bg-color="authStore.user.id == message.user.id ? 'grey-2 shadow-3' : 'green-2 shadow-3'"
            class="q-px-sm"
            >
            <q-card class="bg-transparent q-pa-none relative-position" flat :style="message.image_url ? 'min-width: 35vw;' : 'max-width: 35vw;'">
              <q-card-section class="q-pa-none" v-if="message.image_url">
                <q-img 
                  
                  :src="message.image_url"
                  height="80px"
                  class="q-mb-sm"
                  /> 
              </q-card-section>

              <q-card-section class="q-pa-none">
                <div :class="{ 'text-collapsed': !showMore }" v-html="formattedMessage(message.content)"></div>
                <q-btn v-if="isLongText(message.content)" flat size="md" @click="toggleShowMore">
                  {{ showMore ? 'Weniger' : 'Mehr' }}
                </q-btn>
              </q-card-section>
              
              <q-card-section class="q-pa-none" >
                <div class="timestamp">
                  <span>{{ message.created_at_time }}</span>
                  <q-icon name="check" style="font-size: 14px;"/>
                  <q-icon name="done_all"  style="font-size: 14px;"/>
                </div>
              </q-card-section>
            </q-card>
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
    <FileDialog />
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from "vue";
import { watchArray } from '@vueuse/core'

import ChatInput from '../components/Chat/ChatInput.vue'
import Header from "../components/Chat/Header.vue";
import FileDialog from "../components/Chat/ChatFileDialog.vue";

import { useRoute } from "vue-router";
const route = useRoute()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const chatBox = ref(null)

const animateScroll = async (direction = null) => {
  if (!chatBox.value) return
  // await nextTick() // Ensure that the DOM is updated
  const scrollTarget = chatBox.value.getScrollTarget()
  const scrollHeight = scrollTarget.scrollHeight
  
  if(direction == "up"){
    chatBox.value.setScrollPosition('vertical', 41, 0)
    await nextTick()
    chatStore.loadingMoreMessages = false
  }else{
    chatBox.value.setScrollPosition('vertical', scrollHeight, 0)
    await nextTick()
    chatStore.loadingMoreMessages = false
  }
  // chatBox.value.setScrollPosition('vertical', scrollHeight, 150)
}

const formattedMessage = (val) => {
  // Konvertiere Zeilenumbrüche in HTML <br> Tags
  if(!val) return
  return val.replace(/\n/g, '<br>')
}

const showMore = ref(false)
const toggleShowMore = () => {
  showMore.value = !showMore.value
}

const isLongText = (val) => {
  if(!val) return
  const lineCount = val.split('\n').length
  return lineCount > 5
}

const onScroll = async (info) => {
  if(info.verticalPercentage == 0) {
    chatStore.loadMoreShowingIteration++
    chatStore.loadMoreShowing = true
    if((chatStore.loadMoreShowingIteration) > 0 && (chatStore.loadMoreShowing)) {
      if(!chatStore.isLastPage){
        await chatStore.loadMoreMessages()
        chatStore.loadMoreShowing = false
      }
    }
  }else{
    if(!chatStore.loadMoreShowing){
      chatStore.loadMoreShowing = false
    }
  }
}

onMounted(async () => {
  if(!chatStore.currentChat.messages?.length){
    await chatStore.getSingleChat(route.params.id)
    await nextTick()
    await animateScroll("down")
  }
  
  watchArray(chatStore.currentChat.messages, async (newList, oldList, added, removed) => {
    if(newList.length > oldList.length){
      await nextTick()
      if(chatStore.loadingMoreMessages){
        return await animateScroll("up")
      }else{
        return await animateScroll("down")
      }
    }
  })
})

onUnmounted(() => {
  console.log("unmounted")
  chatStore.setCurrentChat(null)
  chatStore.loadMoreShowing = false
  chatStore.loadingMoreMessages = false
})
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
  padding-left: 4px;
  margin-bottom: -6px;
  margin-right: -4px;
  text-align: right;
  align-self: flex-end;
  color: grey;
  font-size: 0.8em;
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
