<template>
  <div class="flex column text-black">
    <!-- <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown slower"
    > -->
    <transition-group
      name="slide"
      enter-active-class="slide-enter-active"
      enter-from-class="slide-enter-from"
      enter-to-class="slide-enter-to"
      leave-active-class="slide-leave-active"
      leave-from-class="slide-leave-from"
      leave-to-class="slide-leave-to"
    >
    <q-card flat class="reply-box bg-white" :style="{ height: '80px', width: `${inputWidth}px` }" v-if="showReplayBox">
      <q-card-section class="q-ma-sm bg-grey-2 relative-position flex" style="height: 44px; border-left: 5px solid green;">
        <div class="col text-caption">
          <div class="col text-green text-bold" style="position: absolute; top: 4px; left: 10px;">Test User</div>
          <div class="col" style="position: absolute; top: 20px; left: 10px;">Lorem ipsum dolor sit amet...</div>
        </div>
        <q-btn style="position: absolute; right:0; top:0;" color="grey-6" flat padding="xs" icon="close" @click="showReplayBox = false"/>
      </q-card-section>
    </q-card>
    </transition-group>

    <div class="row">
      <div class="flex col input-wrapper q-px-sm q-mr-sm bg-white" ref="inputWrapper" >
          <q-btn dense round flat icon="mood" class="text-grey self-end q-mb-xs q-mr-sm" @click="showReplayBox = !showReplayBox"/>
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

            <ChatAttachment key="1"/>

            <q-btn dense round flat icon="photo_camera" v-if="!chatStore.newMessage" class="text-grey self-end attachment-custom q-mb-xs" key="2"/>
          </transition-group>
      </div>
      <div class="self-end">
        <q-btn outlined round icon="send" class="bg-primary text-white" @click.prevent="addMessage" :disable="!chatStore.newMessage || chatStore.chatsIsLoading"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ChatAttachment from ".//ChatAttachment.vue";

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const inputRef = ref(null)

const emit = defineEmits(['message-sent', 'isTyping'])
const addMessage = async () => {
  if(!chatStore.newMessage){
    return
  }
  await chatStore.addMessage()
  emit('message-sent')
}

const isTyping = () => {
  emit('isTyping')
}

const inputWrapper = ref(null)
const inputWidth = ref('')

onMounted(() => {
  console.log("inputWrapper : ", inputWrapper.value.offsetWidth)
  inputWidth.value = inputWrapper.value.offsetWidth
})

const showReplayBox = ref(false)
</script>

<style>
.chatinput .q-field__native {
  max-height: 100px;
  caret-color: #1976D2; 
  font-size: 16px;
  line-height: 20px;
}

.input-wrapper{
  border-radius: 22px;
  overflow: hidden;
}
.reply-box{
  position: absolute;
  bottom: 21px;
}


/* Enter Animation: Von unten nach oben mit Height */
.slide-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease 0.15s, height 0.15s ease; /* Delay opacity for a smoother effect */
}

.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
  height: 0; /* Start height at 0 */
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
  height: 80px; /* Zielhöhe der Box */
}

/* Leave Animation: Von oben nach unten mit Height */
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease, height 0.15s ease;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
  height: 80px; /* Start from the target height */
}

.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
  height: 50; /* End height at 0 */
}
</style>

