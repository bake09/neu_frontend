<template>
  <q-page class="q-pa-md">
    <q-header class="shadow-2">
      <q-toolbar>
        <!-- <q-btn flat dense round icon="arrow_back" @click="goBack" /> -->
        <q-toolbar-title>Index PAGE</q-toolbar-title>
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
    </q-header>

    <h4>Index Page</h4>


    <q-btn label="Top" icon="keyboard_arrow_up" color="primary" @click="open('top')" />

    <div  style="margin-top: 20px !important;">
      <q-dialog v-model="dialog">
        <q-card style="width: 350px">
          <q-linear-progress :value="0.6" color="pink" />

          <q-card-section class="row items-center no-wrap">
            <div>
              <div class="text-weight-bold">The Walker</div>
              <div class="text-grey">Fitz & The Tantrums</div>
            </div>

            <q-space />

            <q-btn flat round icon="fast_rewind" />
            <q-btn flat round icon="pause" />
            <q-btn flat round icon="fast_forward" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

const dialog = ref(false)
const position = ref('top')

const open = (pos) => {
  position.value = pos
  dialog.value = true
}
onMounted(() => {
  // setHeights()
  authStore.getUser()
})
const avatar = ref(`http://${process.env.VUE_APP_SERVER_IP}:8000/avatars/avatar2.png`)
// const avatar = ref(`https://${process.env.VUE_APP_SERVER_IP}/avatars/avatar2.png`)
</script>
