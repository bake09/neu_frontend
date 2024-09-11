<template>
  <q-header class="shadow-2">
    <q-toolbar class="q-px-xs">

      <q-btn flat round icon="arrow_back" @click="goBack" />

      <q-item clickable v-ripple class="col text-white q-px-sm ">
        <q-item-section >
          <q-item-label class="top-distance text-bold"> {{ chatStore.currentChat?.name }} {{ chatStore.slicedChatId(chatStore.currentChat?.id) }}</q-item-label>
          <q-item-label caption class="bottom-distance text-white" v-if="chatStore.currentChat?.isTyping">{{ chatStore.currentChat?.isTyping }}</q-item-label>
          <q-item-label caption class="bottom-distance text-white" v-else >zuletzt Online: 01.01.2024</q-item-label>
        </q-item-section>
      </q-item>

      <q-btn flat round icon="arrow_back" @click="goBack" />

    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.replace('/chats')
}
const headerRef = ref(null)
</script>

<style>

.top-distance{
  margin-bottom: -4px !important;
}

.bottom-distance{
  font-size: 10px;
}

</style>
