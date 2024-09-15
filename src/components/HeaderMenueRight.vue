<template>
    <q-btn round flat >
        <!-- <q-icon name="person" size="sm" v-show="!authStore.user"/> -->
        <!-- <q-avatar v-show="authStore.user" > -->
        <q-avatar >
            <q-img :src="avatar" v-if="authStore.user" />
        </q-avatar>
        <!-- <q-btn round flat> -->
            <!-- <q-avatar size="40px">
                <img :src="avatar" >
                <q-spinner
                    :thickness="2"
                />
            </q-avatar> -->
        <!-- </q-btn> -->
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
</template>

<script setup>
import { ref } from "vue";

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

const avatar = ref(`http://${process.env.VUE_APP_SERVER_IP}:8000/avatars/avatar2.png`)
// const avatar = ref(`https://${process.env.VUE_APP_SERVER_IP}/avatars/avatar2.png`)

</script>