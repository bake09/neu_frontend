<template>
    <transition-group
        name="slide"
        enter-active-class="slide-enter-active"
        enter-from-class="slide-enter-from"
        enter-to-class="slide-enter-to"
        leave-active-class="slide-leave-active"
        leave-from-class="slide-leave-from"
        leave-to-class="slide-leave-to"
    >
        <q-card flat class="reply-box bg-white" :style="{ height: '80px', width: `${inputWidth}px` }" v-if="chatStore.showReplayBox">
            <q-card-section class="q-ma-sm bg-grey-2 relative-position flex" style="height: 44px; border-left: 5px solid green;">
                <div class="col text-caption">
                    <div class="col text-green text-bold" style="position: absolute; top: 4px; left: 10px;">Test User</div>
                    <div class="col" style="position: absolute; top: 20px; left: 10px;">Lorem ipsum dolor sit amet...</div>
                </div>
                <q-btn style="position: absolute; right:0; top:0;" color="grey-6" flat padding="xs" icon="close" @click="chatStore.showReplayBox = false"/>
            </q-card-section>
        </q-card>
    </transition-group>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useChatStore } from "stores/chat-store"
const chatStore = useChatStore()

const inputWidth = ref('')

onMounted(() => {
//   inputWidth.value = inputWrapper.value.offsetWidth
  // console.log("inputWrapper : ", inputWrapper.value.offsetWidth)
})
</script>