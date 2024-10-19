<template>
  <div class="right-chat-list col bg-white relative-position">
    <page-header>
      <template #title>
          <div class="row fit">
            <div class="self-center q-pl-sm text-h5 text-weight-bolder">
              Chats
            </div>
          </div>
        </template>
        <template #buttons-right>
          <div class="page-header-btn-right absolute-bottom-right q-mb-xs q-mr-xs">
            <q-btn flat round >
              <q-icon name="add_comment" />
            </q-btn>
            <q-btn flat round >
              <q-icon name="more_vert" />
            </q-btn>
          </div>
        </template>
    </page-header>
    <page-body>
      <div style="height: 100% !important; ">
        <q-scroll-area
          class="full-height"
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
    </page-body>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import ChatItem from '../Chat/ChatItem.vue';
import ItemSkeleton from '../ItemSkeleton.vue';

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const chatsBox = ref(null)

onMounted(() => {
  // console.log("route : ", route)
})
</script>
