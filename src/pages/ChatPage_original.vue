<template>
  <q-page class="overflow-hidden background">
    <Header />

    <div class="absolute fit column q-pb-xl">
      <q-scroll-area
        class="fit"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
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
        <div class="thePaddingBox" />
      </q-scroll-area>

      <q-inner-loading :showing="chatStore.chatIsLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>

    <div class="shadow-2s custom-footer">
      <!-- <ChatReplyBox /> -->
      <ChatInput class="q-pa-xs" @message-sent="animateScroll" @isTyping="chatStore.whisperIsTyping(authStore.user.name)" />
    </div>
    <FileDialog />
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted, watch } from "vue"
import { watchArray } from "@vueuse/core"

import ChatInput from "../components/Chat/ChatInput.vue"
import Header from "../components/Chat/Header.vue"
import FileDialog from "../components/Chat/ChatFileDialog.vue"
import ChatMessage from "../components/Chat/ChatMessage.vue"
import ChatReplyBox from "../components/Chat/ChatReplyBox.vue"

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
};


const onScroll = async (info) => {
  if (info.verticalPercentage == 0) {
    chatStore.loadMoreShowingIteration++
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
};

onMounted(async () => {
  if (!chatStore.currentChat.messages?.length) {
    await chatStore.getSingleChat(route.params.id);
    await nextTick();
    await animateScroll("down");
  } else {
    await nextTick();
    await animateScroll("down");
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
});

onUnmounted(() => {
  chatStore.setCurrentChat(null);
  chatStore.loadMoreShowing = false;
  chatStore.loadingMoreMessages = false;
});
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

.thePaddingBox{
  /* height: 100px; */
}
</style>