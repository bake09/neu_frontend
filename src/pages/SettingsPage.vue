<template>
  <page class="q-pa-md">
    <page-header>
      <template #buttons-left>
        <page-header-btn-back />
      </template>
      <template #title>
        <div class="row items-center fit q-ma-none q-pa-none">
          <div class="fit q-ma-none q-pa-none">
            <q-item clickable v-ripple class="col q-px-sm">
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
          </div>
        </div>
      </template>
      <template #buttons-right>
        <div class="page-header-btn-right absolute-bottom-right q-mb-xs q-mr-xs">
          <page-header-btn-right />
        </div>
      </template>
    </page-header>

    <!-- :class="$q.dark.isActive ? 'bg-grey-1 text-black' : 'bg-blue-grey-10 text-white'" -->
    <page-body>
      <div class="relative-position fit">
        <q-scroll-area
          :thumb-style="settingsStore.thumbStyle"
          :bar-style="settingsStore.barStyle"
          style="height: calc(100% - 100px);"
          ref="chatBox"
        >
          <h6>Content</h6>
        </q-scroll-area>
      </div>
    </page-body>


    <q-inner-loading :showing="false">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
  </page>
</template>

<script setup>
import { ref, onMounted } from "vue";



import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useSettingsStore } from "stores/settings-store"
const settingsStore = useSettingsStore()

onMounted(() => {
  console.log("SettingsPAGE is mounted")
})

import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.replace('/chats')
}
</script>
