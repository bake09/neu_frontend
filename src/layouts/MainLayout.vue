<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Frontend App
        </q-toolbar-title>

        <q-btn flat round dense icon="more_vert">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item 
                v-for="link in settingsStore.links"
                :key="link.id"
                clickable 
                exact 
                :to="link.route" 
                exact-active-class="primary">
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Links
        </q-item-label>

        <q-item 
          v-for="link in settingsStore.links"
          :key="link.id"
          clickable 
          exact 
          :to="link.route" 
          exact-active-class="primary">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
</script>
