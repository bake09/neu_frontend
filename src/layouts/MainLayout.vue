<template>
  <q-layout view="lHh Lpr lFf" ref="clientRef">
  <!-- <q-layout view="hHr LpR fFf" ref="clientRef"> -->
    <!-- <Header/> -->
    <!-- <q-header class="shadow-2" ref="headerRef" >
      <q-toolbar class="q-pr-xs" v-show="!taskStore.multiSelection && !userStore.multiSelection">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> wellorder 2.0 / SPA </q-toolbar-title>

        <q-btn round flat size="md">
          <q-icon name="person" size="sm" v-show="!authStore.user"/>
          <q-avatar v-show="authStore.user">
            <q-img :src="avatar" v-if="authStore.user" />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item 
                v-for="link in settingsStore.links"
                :key="link.id"
                clickable 
                exact 
                :to="link.route" 
                exact-active-class="primary"
                v-show="(link.authRequired && authStore.user) || (!authStore.user && !link.authRequired)">
                <q-item-section avatar>
                  <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      
      <q-toolbar class="q-pr-xs" v-show="taskStore.multiSelection">
        <q-btn
          key="close-button"
          flat
          dense
          round
          icon="close"
          @click="toggleMultiSelection"
        />

        <q-toolbar-title key="toolbar-title text-weight-bold">
          <span>{{ taskStore.getSelectedItemsCount }}</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="done_all" key="done-button" @click="taskStore.setMultipleDone"/>
        <q-btn flat round dense icon="delete" key="delete-button"/>
      </q-toolbar>

      <q-toolbar class="q-pr-xs" v-show="userStore.multiSelection">
        <q-btn
          key="close-button"
          flat
          dense
          round
          icon="close"
          @click="toggleMultiSelection"
        />

        <q-toolbar-title key="toolbar-title text-weight-bold">
          <span>{{ userStore.getSelectedItemsCount }}</span>
        </q-toolbar-title>

        <q-btn flat round dense icon="done_all" key="done-button" @click="userStore.setMultipleDone"/>
        <q-btn flat round dense icon="delete" key="delete-button"/>
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-labelheader>Links</q-item-labelheader>
        <q-item 
          v-for="link in settingsStore.links"
          :key="link.id"
          clickable 
          exact 
          :to="link.route" 
          exact-active-class="primary"
          v-show="(link.authRequired && authStore.user) || (!authStore.user && !link.authRequired)">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view v-slot="{ Component }" ref="bodyRef">
        <!-- <TransitionGroup name="mainlayout" appear > -->
          <component :is="Component" key="MainLayout" />
        <!-- </TransitionGroup> -->
      </router-view>
    </q-page-container>
    
    <q-inner-loading
      style="z-index: 3000;"
      :showing="authStore.isAuthProceeding.loading"
      :label="authStore.isAuthProceeding.label"
      label-class="primary"
      label-style="font-size: 1.1em"
    />
  </q-layout>
</template>

<script setup>
// https://casl.js.org/v6/en/package/casl-vue
import { onMounted, ref, TransitionGroup } from 'vue'

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

import { useTaskStore } from 'src/stores/task-store';
const taskStore = useTaskStore()

import { useUserStore } from 'src/stores/user-store';
const userStore = useUserStore()

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const clientRef = ref(null)
const headerRef = ref(null)
const bodyRef = ref(null)

onMounted(() => {
  // setHeights()
  // authStore.getUser()
})
// const setHeights = () => {
//   settingsStore.clientHeight = clientRef.value.$el.clientHeight
//   settingsStore.headerHeight = headerRef.value.$el.clientHeight
//   settingsStore.bodyHeight = bodyRef.value.$el.clientHeight
//   settingsStore.footerHeight = footerRef.value.$el.clientHeight
//   console.log("bodyRef.value.$el.clientHeight : ", bodyRef.value.$el.clientHeight)
// }

// const onResize = () => {
//   console.log('resized')
//   setHeights()
// }

const toggleMultiSelection = () => {
  if(taskStore.multiSelection){
    taskStore.selectedItems = []
    taskStore.multiSelection = false
  }
  if(userStore.multiSelection){
    userStore.selectedItems = []
    userStore.multiSelection = false
  }
}

const avatar = ref(null)
if (process.env.DEV) {
  avatar.value = `http://${process.env.VUE_APP_SERVER_IP}:8000/avatars/avatar2.png`
}else{
  avatar.value = `https://${process.env.VUE_APP_SERVER_IP}/avatars/avatar2.png`
}
</script>

<style>
body {
  overflow: hidden;
}
.q-scroll-area-custom {
  display: flex;
  flex-grow: 1;
}

.mainlayout-enter-active, 
.mainlayout-leave-active {
  transition: opacity 0.3s
}

.mainlayout-enter, 
.mainlayout-leave-active {
  opacity: 0
}
</style>