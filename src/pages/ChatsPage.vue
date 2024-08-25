<template>
  <q-page>

    <Header />

    <div class="absolute full-width full-height column">
      <q-scroll-area
        class="q-scroll-area-custom"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
        ref="chatsBox">
        <q-list v-if="!chatStore.chats.length">
          <ItemSkeleton v-for="i in 7" :key="i"/>
        </q-list>
        <q-list>
          <ChatItem v-for="chat in chatStore.chats" :key="chat.id" :chat="chat"/>
        </q-list>
      </q-scroll-area>
    </div>

    <!-- <router-view /> -->
  
    </q-page>
</template>

<script setup>
import Header from "../components/Chat/Header.vue";

import { onMounted, ref, onUnmounted, } from "vue";

import { useMeta } from 'quasar'

import ChatItem from '../components/Chat/ChatItem.vue';
import ItemSkeleton from '../components/ItemSkeleton.vue';

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()


import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.replace('/')
}

const metaData = {
  title: 'Chats Page',
  titleTemplate: title => `${title} - Frontend App`,
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    ogTitle:  {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Frontend App`
      }
    }
  },
}
useMeta(metaData)

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const chatsBox = ref(null)

onMounted(() => {
  chatStore.setCurrentChat(null)
})

</script>
