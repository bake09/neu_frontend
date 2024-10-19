<template>
  <div class="left-menu" style="background: #f0f2f5; width: 64px;">
    <div class="column justify-between" style="height: 100%">
      <div class="col">
        <q-tabs
          class="text-grey-8"
          active-class="text-black"
          v-model="tab1"
          vertical
        >
          <q-route-tab to="/chat/chats" exact icon="chat" />
          <q-route-tab to="alarms" exact icon="alarm" />
          <q-route-tab to="movies" exact icon="movie" />
        </q-tabs>
      </div>
      <div class="col-auto">
        <div class="justify-end">
          <div class="q-pa-md">
            <q-btn outline round dense color="grey" :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="toggleDark"/>
          </div>
          <q-tabs
            class="text-grey-8"
            active-class="text-black"
            v-model="tab2"
            vertical
          >
            <q-route-tab to="/settings" icon="settings" />
            <q-route-tab to="/profile" icon="person" />
          </q-tabs>
          <q-separator inset />
          <div class="col column q-pa-md">
            <q-btn dense round flat >
              <q-icon name="person" size="md" v-show="!authStore.user"/>
              <q-avatar size="md" v-show="authStore.user && !authStore.isAuthProceeding.loading">
                <q-img :src="avatar" v-if="authStore.user && !authStore.isAuthProceeding.loading" />
              </q-avatar>
              <q-menu
                transition-show="scale"
                transition-hide="scale">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref } from "vue";
  import { useQuasar } from 'quasar'
  
  const $q = useQuasar()
  const toggleDark = () => {
    $q.dark.toggle()
  }
  
  import { useSettingsStore } from "stores/settings-store";
  const settingsStore = useSettingsStore()
  
  import { useAuthStore } from "stores/auth-store"
  const authStore = useAuthStore()
  
  const tab1 = ref('chat')
  const tab2 = ref('settings')

  const avatar = ref(null)
  if (process.env.DEV) {
    avatar.value = `http://${process.env.VUE_APP_SERVER_IP}:8000/avatars/avatar2.png`
  }else{
    avatar.value = `https://${process.env.VUE_APP_SERVER_IP}/avatars/avatar2.png`
  }
</script>
  