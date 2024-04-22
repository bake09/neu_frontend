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
    ],
    thumbStyle: {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75
    },
    barStyle: {
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2
    }
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
