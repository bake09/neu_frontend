import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from "boot/axios";
import { LocalStorage, Notify } from 'quasar'

export const usePushStore = defineStore('push', () => {
  // State
  const vapidKeys = ref({
    VAPID_PUBLIC_KEY: 'BKneabAy3ho7u9AjgrRH7RXGs77SKinBg4AEWEKGiVp-fVjBq-RdV5Gz3g8MO1lmFYQlWYlSOp68aFmzKV5oWBI',
    VAPID_PRIVATE_KEY: '6O4xHEx0JPw7qPqI0Gc7LGFPtN1mo3yyrUXJrZ7lZDo',
  })

  // Actions
  async function subscribe () {
  }

  return {
    // State
    vapidKeys,

    // Actions
    subscribe,
  }
})