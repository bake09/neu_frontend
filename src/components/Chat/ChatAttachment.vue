<template>
    <q-btn dense round flat icon="attach_file" class="text-grey self-end attachment-custom  q-mb-xs">
        <q-menu 
            class="attachment-box" 
            transition-show="scale" 
            transition-hide="scale" 
            :offset="[10, 10]" 
            @show="chatStore.showAttachmentDialog = true" 
            @hide="chatStore.showAttachmentDialog = false"
            auto-close>
            <div class="row q-py-md q-px-xl q-gutter-md fit flex flex-center">
                <!-- <div class="flex column items-center">
                    <input type="file" accept="image/*" ref="imageUploader" style="display: none" @change="chatStore.handleImageUpload" />
                    <q-btn padding="md" round dense color="primary" icon="image" @click="triggerImageUpload" />
                    <div>Image</div>
                </div> -->
                <div class="flex column items-center">
                    <q-btn round dense glossy color="primary" padding="md" icon="home" @click="chatStore.showFileDialog = !chatStore.showFileDialog"/>
                    <div>Document</div>
                </div>
                <div class="flex column items-center">
                    <q-btn round dense glossy color="pink-5" padding="md" icon="photo_camera" />
                    <div>Kamera</div>
                </div>
                <div class="flex column items-center">
                    <input type="file" accept="image/*" ref="imageUploader" style="display: none" @change="chatStore.handleImageUpload" />
                    <q-btn round dense glossy color="purple-5" padding="md" icon="image" @click="triggerImageUpload" />
                    <div>Galerie</div>
                </div>
                <div class="flex column items-center">
                    <q-btn round dense glossy color="amber" padding="md" icon="headphones" />
                    <div>Audio</div>
                </div>
                <!-- <div class="flex column items-center">
                    <q-btn round dense glossy color="green" padding="md" icon="location_on" />
                    <div>Standort</div>
                </div> -->
                <div class="flex column items-center">
                    <q-btn round dense glossy color="blue" padding="md" icon="person" />
                    <div>Kontakt</div>
                </div>
                <!-- <div class="flex column items-center">
                    <q-btn round dense glossy color="teal" padding="md" icon="bar_chart" />
                    <div>Umfrage</div>
                </div> -->
            </div>
        </q-menu>
    </q-btn>
</template>

<script setup>
import { ref } from 'vue'

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const imageUploader = ref(null)

const triggerImageUpload = () => {
  if (imageUploader.value) {
    imageUploader.value.click();
  }
};
</script>

<style>
.attachment-box{
  left: 8px !important;
  max-width: calc(100vw - 16px) !important;
}
</style>