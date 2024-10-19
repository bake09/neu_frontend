<template>
  <!-- TODOS
    - chat scrollData has to be in the individoal chat obj under the chatStore chatsArray
      to maintain all the scroll data individually, because due switch between chats the scrollPosition is loosed

    - Clicking to open/load a chat doesn't work well. Transfer logic from inMounted to onActivated in ChatPage.vue

    - The Routing tree is very pretty for chats EXAMPLE: 'chat/chats/955564-5234-21-54531-234-'  
    
  -->
  <div class="WAL bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" ref="clientRef" class="WAL__layout" :style="styleinner" >
    <!-- <q-layout view="lHh Lpr lFf" ref="clientRef" > -->
  
      <div class="fit">
        <div class="row full-height">
          <div class="left-menu" v-if="$q.screen.gt.xs" :class="$q.screen.gt.xs ? 'col-5 col-md-4' : ''">
              <ChatsList />
          </div>
          <div class="relative-position" :class="$q.screen.gt.xs ? 'col-7 col-md-8' : 'col-12'">
            <router-view v-slot="{ Component }" ref="bodyRef">
              <keep-alive>
                  <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </div>
      
      <q-inner-loading
        :showing="authStore.isAuthProceeding.loading"
        :label="authStore.isAuthProceeding.label"
        label-class="primary"
        label-style="font-size: 1.1em"
      />
    </q-layout>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'

import ChatsList from '../components/Chat/ChatsList.vue'

import { useAuthStore } from "stores/auth-store"
const authStore = useAuthStore()

const clientRef = ref(null)
const bodyRef = ref(null)

import { useChatStore } from "stores/chat-store"
const chatStore = useChatStore()

import { useQuasar } from 'quasar'
const $q = useQuasar()

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))

const styleinner = computed(() => ({
  'min-height': $q.screen.height - '40' + 'px'
}))

onMounted(async () => {
  // console.log('$q.screen :>> ', $q.screen.lt)
  if(!chatStore.chats.length){
    await chatStore.getAllChats()
  }
  chatStore.listenForMessagesInAllChats()
})

onUnmounted(() => {
  chatStore.stopListenForMessagesInAllChats()
})
</script>

<style>
.background {
  background-image: url('/background.png');
  background-size: contain;
  background-repeat: repeat;
}


.left-menu-header{
  border-bottom: 1px solid #d3d3d3;
}
</style>

<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: '';
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #00a884;
    // background-color: var(--q-primary);
  }
  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 1700px;
    border-radius: 5px;
  }
  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }
  .q-drawer--standard {
    .WAL__drawer-close {
      display: none;
    }
  }
}

@media (max-width: 850px) {
  .WAL {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
@media (min-width: 691px) {
  .WAL {
    &__drawer-open {
      display: none;
    }
  }
}
.conversation__summary {
  margin-top: 4px;
}
.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>