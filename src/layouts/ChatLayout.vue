<template>
  <q-layout view="lHh Lpr lFf" ref="clientRef">
 
    <q-page-container class="position-relative">
      <router-view ref="bodyRef"/>
    </q-page-container>
    
    <q-inner-loading
      :showing="authStore.isAuthProceeding.loading"
      :label="authStore.isAuthProceeding.label"
      label-class="primary"
      label-style="font-size: 1.1em"
    />
  </q-layout>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

const clientRef = ref(null)
const bodyRef = ref(null)

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

onMounted(async () => {
  if(!chatStore.chats.length){
    await chatStore.getAllChats()
  }
  chatStore.listenForMessagesInAllChats()
  
})

onUnmounted(() => {
  chatStore.stopListenForMessagesInAllChats()
})
</script>

<style>
body {
  /* overflow: hidden; */
}

.background {
  background-image: url('/background.png');
  background-size: contain;
  background-repeat: repeat;
}
</style>