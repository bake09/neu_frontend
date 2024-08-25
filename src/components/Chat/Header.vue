<template>
  <q-header class="shadow-2" ref="headerRef">
    <q-toolbar class="q-px-xs" v-if="route.name == 'chats'">

      <q-item class="col text-white q-px-sm">
        <q-item-section >
          <!-- <q-item-label caption class="bottom-distance text-white text-bold" >Chats</q-item-label> -->
          <div class="text-h6">Chats</div>
        </q-item-section>
      </q-item>

      <q-btn flat round icon="more_vert" @click="goBack" />

    </q-toolbar>

    <q-toolbar class="q-px-xs" v-if="route.name == 'chat'">

      <q-btn
        key="close-button"
        flat
        rounded
        icon="arrow_back"
        class="q-px-none"
        @click="goBack">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </q-btn>

      <q-item clickable v-ripple class="col text-white q-px-sm">
        <q-item-section >
          <q-item-label class="top-distance text-bold"> {{ chatStore.currentChat.name }} {{ chatStore.slicedChatId(chatStore.currentChat.id) }}</q-item-label>
          <q-item-label caption class="bottom-distance text-white" v-if="chatStore.currentChat?.isTyping">{{ chatStore.currentChat.isTyping }}</q-item-label>
          <q-item-label caption class="bottom-distance text-white" v-else >zuletzt Online: 01.01.2024</q-item-label>
        </q-item-section>
      </q-item>

      <q-btn flat round icon="more_vert" @click="goBack" />

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
