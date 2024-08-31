<template>
  <div class="flex text-black">
    <div class="flex col input-wrapper q-px-sm q-mr-sm bg-white">
        <q-btn dense round flat icon="mood" class="text-grey self-end q-mb-xs q-mr-sm"/>
        <q-input 
          autogrow 
          dense 
          borderless 
          placeholder="Nachricht" 
          class="col chatinput q-mr-sm" 
          v-model="chatStore.newMessage"
          @keydown.ctrl.enter="addMessage"
          @update:model-value="isTyping"
          ref="inputRef"
          />
        <transition-group
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <q-btn dense round flat icon="attach_file" class="text-grey self-end attachment-custom  q-mb-xs" key="1"/>
          <q-btn dense round flat icon="photo_camera" v-if="!chatStore.newMessage" class="text-grey self-end attachment-custom q-mb-xs" key="2"/>
        </transition-group>
    </div>
    <div class="self-end">
      <q-btn outlined round icon="send" class="bg-primary text-white" @click.prevent="addMessage"/>
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
  caret-color: var(--$primary); 
  /* font-weight: bold; */
  /* font-size: 16px; */
}

.input-wrapper{
  border-radius: 22px;
  overflow: hidden;
}
</style>