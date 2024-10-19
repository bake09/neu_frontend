<template>
  <page>
    <page-header>
      <template #buttons-left>
        <!-- <page-header-btn-back /> -->
      </template>
      <template #title>
        <div class="row fit">
          <div class="self-center q-pl-sm text-h5 text-weight-bolder">
            Chats
          </div>
        </div>
      </template>
      <template #buttons-right>
        <div class="page-header-btn-right absolute-bottom-right q-mb-xs q-mr-xs">
          <page-header-btn-right />
        </div>
      </template>
    </page-header>

    <page-body>
        <!-- :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle" -->
      <q-scroll-area
        style="height: calc(100vh - 150px);"
        ref="chatsBox">
        <q-list v-if="!chatStore.chats.length">
          <ItemSkeleton v-for="i in 7" :key="i"/>
        </q-list>
        <q-list>
          <ChatItem v-for="chat in chatStore.chats" :key="chat.id" :chat="chat" />
        </q-list>
      </q-scroll-area>
      
      <!-- <q-footer>
        <q-tabs
          indicator-color="yellow"
          class="bg-primary text-white shadow-2"
        >
          <q-route-tab to="/profile" icon="person" label="Profile" />
          <q-route-tab to="/chat/chats" icon="alarm" label="Chat" />
        </q-tabs>
      </q-footer> -->
    </page-body>
  </page>
</template>

<script setup>
import { onMounted, ref, onActivated } from "vue";

import { useMeta } from 'quasar'

import ChatItem from '../components/Chat/ChatItem.vue';
import ItemSkeleton from '../components/ItemSkeleton.vue';

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

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
  // chatStore.setCurrentChat(null)
})
</script>