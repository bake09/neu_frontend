<template>
  <div 
    class="row items-center justify-between" 
    :class="{ 'transition-reset': resetting, 'wobble-effect': wobbling }"
    :style="`transform: translateX(${offsetX}px)`">
    <!-- Reply icon on the same row -->
    <q-icon name="reply" size="md" class="replyicon q-ml-sm reply-icon" />
    <div class="col">
      <q-chat-message
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :name="message.user.name"
        :sent="authStore.user.id === message.user.id"
        :bg-color="authStore.user.id === message.user.id ? 'grey-2 shadow-3' : 'green-2 shadow-3'"
        class="q-px-sm"
        v-touch-pan.right.prevent.mouse="handlePan">
        <q-card flat class="bg-transparent" :style="[message.image_url ? 'min-width: 160px;' : 'max-width: 35vw;']">
            <q-card-section class="q-pa-none" v-if="message.image_url">
              <q-img :src="message.image_url" height="84px" class="q-mb-xs" />
            </q-card-section>

            <q-card-section class="q-pa-none">
              <div :class="{ 'text-collapsed': !showMore }" v-html="formattedMessage(message.content)"></div>
              <q-btn v-if="isLongText(message.content)" flat size="md" @click="toggleShowMore">
                  {{ showMore ? 'Weniger' : 'Mehr' }}
              </q-btn>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <div class="timestamp">
                  <span>{{ message.created_at_time }}</span>
                  <q-icon name="check" style="font-size: 14px;" />
                  <q-icon name="done_all" style="font-size: 14px;" />
              </div>
            </q-card-section>
        </q-card>
      </q-chat-message>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue"

import { useChatStore } from "stores/chat-store"
const chatStore = useChatStore()

const props = defineProps({
  message: Object,
  authStore: Object,
})

const offsetX = ref(0)
const resetting = ref(false)
const wobbling = ref(false)

const handlePan = ({ evt, ...newInfo }) => {
  // console.log("evt : ", evt)
  // console.log("newInfo : ", newInfo)
  offsetX.value = newInfo.offset.x

  if (newInfo.isFirst) {
    resetting.value = false
  }else if (newInfo.isFinal) {
    resetting.value = true 
    offsetX.value = 0
    if(newInfo.offset.x > 80){
      startRepling()
    }
  }
}

const startRepling = () => {
  chatStore.showReplayBox = true
}
const formattedMessage = (val) => {
  if (!val) return
  return val.replace(/\n/g, "<br>")
}

const showMore = ref(false)
const toggleShowMore = () => {
  showMore.value = !showMore.value
}

const isLongText = (val) => {
  if (!val) return
  const lineCount = val.split("\n").length
  return lineCount > 5
}
</script>
  
<style scoped>
.timestamp {
  padding-left: 4px;
  margin-bottom: -6px;
  margin-right: -4px;
  text-align: right;
  align-self: flex-end;
  color: grey;
  font-size: 0.8em;
}

.text-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
}

.replyicon{
  transform: translateX(0px);
  margin-left: -50px;
}

.transition-reset {
  transition: transform 0.3s ease;
}

@keyframes wobble {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-10px);
  }
  30% {
    transform: translateX(8px);
  }
  45% {
    transform: translateX(-6px);
  }
  60% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}
/* Apply wobble effect when needed */
.wobble-effect {
  animation: wobble 0.6s ease-in-out;
}
</style>