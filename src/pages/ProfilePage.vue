<template>
  <q-page class="">
    <q-header bordered class="bg-grey-1 text-black">
      <q-toolbar class="q-px-xs bg-white">
        <q-btn flat rounded icon="arrow_back" @click="goBack" no-caps label="Profil"/>
      </q-toolbar>
    </q-header>

    <div class="flex flex-center q-py-md">
      <div class="relative-position" @click="triggerImageUpload">
        <q-avatar size="120px" >
          <img :src="authStore.getProfileImage" raio="1">
        </q-avatar>
        <div class="flex column items-center absolute" style="bottom: 0; right: 0;">
          <input type="file" accept="image/*" ref="imageUploader" style="display: none" @change="authStore.handleImageUpload" />
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

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

const imageUploader = ref(null)

const triggerImageUpload = () => {
  if (imageUploader.value) {
    imageUploader.value.click();
  }
};
onMounted(() => {

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
