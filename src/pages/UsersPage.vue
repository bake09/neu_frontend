<template>
  <q-page>
    <div class="absolute full-width full-height column">
      <q-scroll-area
        class="q-scroll-area-custom"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
        ref="usersBox">
        <q-list v-if="!userStore.users.length">
          <ItemSkeleton v-for="i in 7" :key="i"/>
        </q-list>
        <q-list >
          <UserItem v-for="user in userStore.users" :key="user.id" :user="user"/>
        </q-list>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from "vue";

import { useMeta } from 'quasar'
import { watchArray } from '@vueuse/core'

import UserItem from '../components/UserItem.vue';
import ItemSkeleton from '../components/ItemSkeleton.vue';

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

const metaData = {
  title: 'UsersList Page',
  titleTemplate: title => `${title} - Frontend App`,
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    ogTitle:  {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Frontend App`
      }
    }
  },
}
useMeta(metaData)

import { storeToRefs } from 'pinia'

import { useUserStore } from "stores/user-store";
const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const usersBox = ref(null)

const animateScroll = async () => {
  if (!usersBox.value) return;
  await nextTick(); // Ensure that the DOM is updated
  const scrollTarget = usersBox.value.getScrollTarget();
  const scrollHeight = scrollTarget.scrollHeight;
  usersBox.value.setScrollPosition('vertical', scrollHeight, 150);
}

import { echo } from "../boot/echo";

onMounted(async () => {
  if(!userStore.users.length){
    await userStore.allUsers()
  }
})
onUnmounted(() => {
  console.log("unmounted")
})

watchArray(users, (newList, oldList, added, removed) => {
  // only scroll if a new added
  if(oldList.length < newList.length){
    animateScroll()
  }
},{ deep: true })
</script>
