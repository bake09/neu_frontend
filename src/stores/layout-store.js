import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
    const headerContent = ref([
      {
        route: '/',
      },
      {
        route: 'tasks',
      },
      {
        route: 'userlist',
      },
  ])
})
