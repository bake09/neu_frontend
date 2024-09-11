<template>
  <q-page class="absolute full-width full-height">
  <q-btn label="loadMore"/>
    <div ref="scrollTargetRef" class="q-pa-md scroll" style="max-height: 250px; overflow: auto;">
      <q-infinite-scroll @load="onLoadRef" :offset="250" :scroll-target="scrollTargetRef" reverse>
        <!-- <div v-for="(item, index) in itemsRef" :key="index" class="caption"> -->
        <div
          v-if="chatStore.currentChat"
          v-for="message in chatStore.currentChat.messages"
          :key="message.id">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Rerum repellendus sit voluptate voluptas eveniet porro. 
            Rerum blanditiis perferendis totam, ea at omnis vel numquam 
            exercitationem aut, natus minima, porro labore.
          </p>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { scroll } from 'quasar'
const { getScrollTarget } = scroll

import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const itemsRef = ref([ {}, {}, {}, {}, {}, {}, {} ])
const scrollTargetRef = ref(null)

const onLoadRef = async (index, done) => {
  console.log("onLoad triggered")
  // setTimeout(() => {
  //   itemsRef.value.push({}, {}, {}, {}, {}, {}, {})
  //   done()
  // }, 2000)
  await chatStore.loadMoreMessages('9cf3b300-c52f-40af-946e-8e31433d6e4d')
  done()
}

onMounted(async () => {
  console.log("onMounted triggered")
  
  if(!chatStore.currentChat.messages?.length){
    await chatStore.getSingleChat('9cf3b300-c52f-40af-946e-8e31433d6e4d')
  }
})


</script>

<style>
.q-scroll-area-custom {
  display: flex;
  flex-grow: 1;
}
</style>