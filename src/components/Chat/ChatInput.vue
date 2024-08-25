<template>
  <div class="flex col q-gutter-sm chatinput">
    <q-input
      autogrow
      rounded
      outlined
      dense
      v-model="chatStore.newMessage"
      class="bg-white col"
      placeholder="Task hinzufügen"
      ref="inputRef"
      @keydown.ctrl.enter="addMessage"
      style="max-height: 120px !important; overflow: auto;"
      @update:model-value="isTyping"
    >
    </q-input>
    <div class="self-end">
      <q-btn
        round
        outline
        icon="send"
        color="primary"
        @click.prevent="addMessage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const inputRef = ref(null)

const emit = defineEmits(['message-sent', 'isTyping']);

const addMessage = async () => {
  await chatStore.addMessage()
  emit('message-sent')
}

const isTyping = () => {
  emit('isTyping')
}
</script>

<style>
.chatinput .q-field__native {
  max-height: 100px;
  max-width: 83%;
  background: yellow;
  margin-left: 10px;
  overflow: none;
}
</style>