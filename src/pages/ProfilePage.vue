<template>
  <!-- <q-page>
    <q-header bordered class="bg-grey-1 text-black">
      <q-toolbar class="q-px-xs bg-white">
        <q-btn flat rounded icon="arrow_back" @click="router.push('/')" no-caps label="Home"/>
      </q-toolbar>
    </q-header>

    <div class="main-content" style="height: calc(100vh -51px) ;">
      <div class="flex flex-center q-py-md">
        <div class="relative-position" @click="triggerImageUpload">
          <q-avatar size="120px" class="cursor-pointer">
            <img :src="authStore.getProfileImage" raio="1">
          </q-avatar>
          <div class="flex column items-center absolute" style="bottom: 0; right: 0;">
            <input type="file" accept="image/*" ref="imageUploader" style="display: none" @change="authStore.updateProfile" />
            <q-btn round unelevated color="primary" icon="photo_camera" class="absolute" style="bottom: 0; right: 0;" :ripple="false"/>
          </div>
        </div>
      </div>

      <q-list class="q-py-lg">
        <q-item clickable v-ripple>
          <q-item-section top avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption class="text-bold">Name</q-item-label>
            <q-item-label class="text-bold">{{ authStore.user.name }}</q-item-label>
            <q-item-label caption lines="2">Hier steht dein AnzeigeName . Lorem ipsum dolor sit amet, consectetur adipiscit elit.Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-icon name="edit" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" style="margin-top:0;margin-bottom:0;"/>

        <q-item clickable v-ripple>
          <q-item-section top avatar>
            <q-icon color="primary" name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption class="text-bold" v-if="!showTextInput">Info</q-item-label>
            <q-item-label class="text-bold" lines="1" v-if="!showTextInput">StatusInfo</q-item-label>
            <q-input v-model="text" dense label="Info" v-if="showTextInput">
              <template v-slot:label>
                <div  class="text-overline q-mb-md">Info</div>
              </template>
            </q-input>
          </q-item-section>
          <q-item-section side top>
            <q-icon name="edit" @click.stop="showTextInput = !showTextInput"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page> -->

  <page class="q-pa-md">
    <page-header>
      <!-- <template #buttons-left>
        <page-header-btn-back />
      </template> -->
      <template #title>
        <div class="row items-center fit q-ma-none q-pa-none">
          <div class="fit q-ma-none q-pa-none">
            <q-item clickable v-ripple class="col q-px-sm">
              <q-item-section>
                Profile
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

    <page-body >
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

const imageUploader = ref(null)

const triggerImageUpload = () => {
  if (imageUploader.value) {
    imageUploader.value.click();
  }
};
onMounted(() => {
  console.log("Profile PAGE is mounted")
})

const text = ref('StatusInfo')
const showTextInput = ref(false)

import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.replace('/chats')
}
</script>
