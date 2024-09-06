<template>
  <q-page class="absolute full-width full-height column "> 
    <q-scroll-area
      class="q-scroll-area-custom"
      :thumb-style="settingsStore.thumbStyle"
      :bar-style="settingsStore.barStyle"
      ref="chatBox">
      <q-infinite-scroll @load="onLoad" reverse>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>

        <!-- <div v-for="(item, index) in items" :key="index" class="caption q-py-sm" >
          <q-badge class="shadow-1">
            {{ items.length - index }}
          </q-badge>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </div> -->

        <span
          v-if="chatStore.currentChat"
          v-for="message in chatStore.currentChat.messages"
          :key="message.id">
          <q-chat-message
            :name="message.user.name"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :sent="authStore.user.id == message.user.id ? true : false"
            :bg-color="authStore.user.id == message.user.id ? 'grey-2 shadow-6' : 'green-2 shadow-6'"
            class="q-px-sm"
            >
            <div class="flex">
              <q-item-label>
                <div :class="{ 'text-collapsed': !showMore }" v-html="formattedMessage(message.content)"></div>
                <q-btn v-if="isLongText(message.content)" flat size="md" @click="toggleShowMore">
                  {{ showMore ? 'Weniger' : 'Mehr' }}
                </q-btn>
              </q-item-label>
              <div class="timestamp">{{ message.created_at_time }}
                <q-icon name="check" style="font-size: 14px;"/>
                <q-icon name="done_all"  style="font-size: 14px;"/>
              </div>
            </div>
          </q-chat-message>
        </span>
      </q-infinite-scroll>
    </q-scroll-area>

    <!-- <q-infinite-scroll @load="onLoad" reverse>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div v-for="(item, index) in items" :key="index" class="caption q-py-sm">
        <q-badge class="shadow-1">
          {{ items.length - index }}
        </q-badge>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </div>
    </q-infinite-scroll> -->
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chatBox = ref(null)
const scrollTargetRef = ref(null)

const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
const onLoad = (index, done) => {
  setTimeout(() => {
    items.value.splice(0, 0, {}, {}, {}, {}, {}, {}, {})
    done()
  }, 2000)
}


import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()


import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()



let scrollIteration = ref(-1)
const onScroll = (info) => {
  if(info.verticalPosition == 0) {
    scrollIteration.value++
    if(scrollIteration.value > 0){
      chatStore.loadMoreShowing = true
      console.log("VERTICAL POSITION == 0 !!!!", scrollIteration.value)
    }
  }
  // done()
}

onMounted(async () => {
  console.log("onMounted triggered")
  await chatStore.getSingleChat('9ce34295-8264-4c38-b4db-f3c6e67e5a75')
  // await chatStore.getSingleChat(route.params.id)
})


</script>

<style>
.q-scroll-area-custom {
  display: flex;
  flex-grow: 1;
}
</style>