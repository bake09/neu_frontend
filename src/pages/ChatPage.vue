<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back />
      </template>
      <template #title>
        <div class="row items-center fit q-ma-none q-pa-none">
          <div class="fit">
            <q-item clickable v-ripple class="q-px-sm" v-if="chatStore.currentChat">
              <q-item-section>
                <q-item-label class="text-bold">
                  {{ chatStore.currentChat?.name }} {{ chatStore.slicedChatId(chatStore.currentChat?.id) }}
                </q-item-label>
                <q-item-label caption class="bottom-distance" v-if="chatStore.currentChat?.isTyping">
                  {{ chatStore.currentChat?.isTyping }}
                </q-item-label>
                <q-item-label caption class="bottom-distance" v-else >
                  zuletzt Online: 01.01.2024
                </q-item-label>
              </q-item-section>
            </q-item>
            <!-- <div class="fit bg-yellow">
              <div v-if="chatStore.currentChat">
                {{ chatStore.currentChat?.name }} {{ chatStore.slicedChatId(chatStore.currentChat?.id) }}
              </div>
              <div v-if="chatStore.currentChat?.isTyping" class="text-bold">
                {{ chatStore.currentChat?.isTyping }}
              </div>
              <div v-else class="text-bold">
                zuletzt Online: 01.01.2024
              </div>
            </div> -->
          </div>
        </div>
      </template>
      <template #buttons-right>
        <div class="page-header-btn-right absolute-bottom-right q-mb-xs q-mr-xs">
          <page-header-btn-right />
        </div>
      </template>
    </page-header>

    <page-body class="background">
      <div class="relative-position fit">
        <q-scroll-area
          :thumb-style="settingsStore.thumbStyle"
          :bar-style="settingsStore.barStyle"
          style="height: calc(100% - 100px);"
          ref="chatBox"
          @scroll="onScroll"
        >
          <div class="flex flex-center" style="height: 40px;" v-show="!chatStore.isLastPage">
            <q-spinner-dots color="primary" size="40px" v-show="chatStore.loadMoreShowing" />
          </div>

          <span
            v-if="chatStore.currentChat"
            v-for="message in chatStore.currentChat.messages"
            :key="message.id"
          >
            <ChatMessage :message="message" :authStore="authStore" />
          </span>
        </q-scroll-area>
        
        <div class="shadow-2s custom-footer">
          <ChatInput class="q-pa-xs" @message-sent="animateScroll" @isTyping="chatStore.whisperIsTyping(authStore.user.name)" />
        </div>
      </div>
    </page-body>


    <q-inner-loading :showing="chatStore.chatIsLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    <FileDialog />
  </page>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted, watch, onDeactivated, onActivated } from "vue"
import { watchArray } from "@vueuse/core"

import ChatInput from "../components/Chat/ChatInput.vue"
import FileDialog from "../components/Chat/ChatFileDialog.vue"
import ChatMessage from "../components/Chat/ChatMessage.vue"

import { useRoute } from "vue-router"
const route = useRoute()

import { useSettingsStore } from "stores/settings-store"
const settingsStore = useSettingsStore()

import { useAuthStore } from "stores/auth-store"
const authStore = useAuthStore()

import { useChatStore } from "stores/chat-store"
const chatStore = useChatStore()

const chatBox = ref(null)

const animateScroll = async (direction = null, duration = null) => {
  if (!chatBox.value) return
  const scrollTarget = chatBox.value.getScrollTarget()
  const scrollHeight = scrollTarget.scrollHeight

  if (direction == "up") {
    await nextTick()
    chatStore.setScrollData(scrollHeight)
    chatBox.value.setScrollPosition("vertical", chatStore.getUpScrollPosition, 0)
    chatStore.loadingMoreMessages = false
  } else {
    if(duration != null){
      chatBox.value.setScrollPosition("vertical", scrollHeight)
    }
    chatBox.value.setScrollPosition("vertical", scrollHeight, 0)
    await nextTick()
    chatStore.loadingMoreMessages = false
  }
}

const onScroll = async (info) => {
  // console.log("info : ", info);
  if(chatStore.currentChat){
    chatStore.currentChat.scrollData.scrollPos = info.verticalPosition
  }
  if (!isActive.value) return
  if (info.verticalPercentage == 0) {
  // if ((info.verticalSize > info.verticalContainerSize) && info.verticalPercentage == 0) {
    chatStore.loadMoreShowingIteration++
    // console.log('chatStore.loadMoreShowingIteration :>> ', chatStore.loadMoreShowingIteration);
    chatStore.loadMoreShowing = true
    if (chatStore.loadMoreShowingIteration > 0 && chatStore.loadMoreShowing) {
      if (!chatStore.isLastPage) {
        await chatStore.loadMoreMessages()
        chatStore.loadMoreShowing = false
      }
    }
  } else {
    if (!chatStore.loadMoreShowing) {
      chatStore.loadMoreShowing = false
    }
  }
}

const isActive = ref(true)

onActivated(async () => {
  console.log("ChatPage ACTIVATED !!!")
  isActive.value = true
  
  // // set CurrentChat like in onMounted Hook
  if (!chatStore.currentChat.messages?.length) {
    await chatStore.getSingleChat(route.params.id);
    await nextTick();
    // if(chatStore.currentChat.scrollData.scrollPo > 0){
    //   await animateScroll("down");
    // }
    await animateScroll("down");
  } else {
    await nextTick();
    // await animateScroll("down");
  }
  const scrollTarget = chatBox.value.getScrollTarget()
  const scrollHeight = scrollTarget.scrollHeight

  chatStore.setScrollData(scrollHeight)

  watchArray(chatStore.currentChat.messages, async (newList, oldList, added, removed) => {

    if (newList.length > oldList.length) {
      await nextTick();
      
      if (chatStore.loadingMoreMessages) {
        return await animateScroll("up");
      } else {
        return await animateScroll("down");
      }
    }
  });

  watch(() => chatStore.showReplayBox, async (newVal) => {
      if (newVal) {
        // Sobald die ReplayBox angezeigt wird, nach unten scrollen
        await nextTick();
        await animateScroll("down", 100);
      }
    }
  );
})

onDeactivated(() => {
  // console.log("ChatPage DEACTIVATED !!!")
  // chatStore.setCurrentChat(null)
  chatStore.loadMoreShowing = false
  chatStore.loadingMoreMessages = false
  isActive.value = false
})

onMounted(async () => {
  // console.log("ChatPage MOUNTED !!!")
})

onUnmounted(() => {
  // console.log("ChatPage UNMOUNTED !!!")
});
</script>

<style>
.custom-footer{
  position: absolute;
  bottom: 50;
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
