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

        <div>Quasar v{{ $q.version }}</div>
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
        <q-item clickable exact to="/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>IndexPage</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable exact to="/login">
          <q-item-section>
            <q-item-label>Login</q-item-label>
            <q-item-label caption>LoginPage</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable exact to="/register">
          <q-item-section>
            <q-item-label>Register</q-item-label>
            <q-item-label caption>RegisterPage</q-item-label>
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
  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
</script>
