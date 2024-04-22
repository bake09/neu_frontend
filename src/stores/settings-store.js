import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    counter: 0,
    links: [
      {
        id: 1,
        label: 'Home',
        route: '/',
        icon: 'home'
      },
      {
        id: 2,
        label: 'Login',
        route: '/login',
        icon: 'person'
      },
      {
        id: 3,
        label: 'Register',
        route: '/register',
        icon: 'person_add'
      },
    ]
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
