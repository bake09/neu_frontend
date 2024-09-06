<template>
  <q-dialog
    v-model="chatStore.showFileDialog"
    persistent
    maximized
    transition-show="slide-left"
    transition-hide="slide-right"
    transition-duration="200"
    @show="chatStore.showFileDialog = true"
    @hide="chatStore.showFileDialog = false"
  >
    <q-card class="bg-blue-grey-10 text-white column">
      <q-card-section class="bg-blue-grey-10 col">
        <div class="row items-center q-gutter-md">
          <q-btn icon="arrow_back" round v-close-popup />
          <div class="text-h6">Image Upload</div>
        </div>
      </q-card-section>

      <q-card-section class="bg-blue-grey-10 col q-pa-none">
        <!-- class="fit" -->
            <!-- :ratio="chatStore.selectedImageRatio" -->
          <q-img
            class="fit"
            :src="chatStore.selectedImageUrl"
            :ratio="1"
          />
      </q-card-section>

      <q-card-section class="bg-blue-grey-10 col">
        <div class="flex fit justify-end column">
          <q-input rounded outlined dense v-model="text"  bg-color="blue-grey-4" placeholder="Bildunterschrift hinzufügen">
            <template v-slot:append>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
              </q-avatar>
            </template>
          </q-input>

          <div class="row q-pt-md">
            <q-space />
            <q-btn round icon="send" color="primary" @click.prevent="chatStore.addMessage"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const text = ref('')

</script>