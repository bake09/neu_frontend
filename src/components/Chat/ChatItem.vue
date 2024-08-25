<template>
  <q-item clickable v-ripple class="non-selectable" ref="itemRef" @click="handleClick(chat)">
    <q-item-section avatar>
      <q-avatar color="teal" text-color="white" icon="chat" />
    </q-item-section>

    <q-item-section>
      <!-- <q-icon name="check" class="q-pr-xs" color="blue" style="font-size: 16px;"/>
      <q-icon name="done_all" class="q-pr-xs" color="blue" style="font-size: 16px;"/> -->
      <q-item-label lines="1" class="text-bold" style="max-width: 170px !important;">{{ chat.name}} {{ chatStore.slicedChatId(chat.id) }}</q-item-label>
      <q-item-label lines="1" caption class="text-bold text-green" style="max-width: 50vw !important;" v-if="chat.isTyping">{{ chat.isTyping }}</q-item-label>
      <q-item-label lines="1" caption style="max-width: 50vw !important;" v-else>{{ chat.last_message?.user.name }}: {{ chat.last_message?.content }}</q-item-label>
    </q-item-section>

    <q-item-section side top class="q-gutter-y-xs">
      <q-item-label caption :class="chat.unreadMessages.length ? 'text-green' : ''">{{ chat.last_message?.created_at_human }}</q-item-label>
      <q-avatar color="green" size="xs" text-color="white" v-if="chat.unreadMessages.length">{{ chat.unreadMessages.length }}</q-avatar>
    </q-item-section>
  </q-item>
  <q-separator inset="item" key="separator"/>
</template>

<script setup>
import { ref, nextTick } from "vue";

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const itemRef = ref(null)

const props = defineProps({
  chat: Object
})

import { useRouter } from "vue-router";
const router = useRouter()

const handleClick = async (chat) => {
  await chatStore.setCurrentChat(chat)
  await router.push({ name: 'chat', params:{ id: chat.id}})
  await nextTick()
  // chatStore.clearUnreadMessagesLocally()
}
</script>

<style scoped>
  .q-badge {
    padding: 2px 2px !important;
  }
  .q-badge--floating {
    position: absolute;
    top: unset !important;
    bottom: -4px !important;
    right: -3px;
    cursor: inherit;
    border: 2px white solid;
  }
</style>