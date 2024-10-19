import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // State
    const links = ref([
      {
        id: 1,
        label: 'Home',
        route: '/',
        icon: 'home',
        authRequired: true
      },
      {
        id: 2,
        label: 'Tasks',
        route: '/tasks',
        icon: 'list',
        authRequired: true
      },
      // {
      //   id: 3,
      //   label: 'Users',
      //   route: '/users',
      //   icon: 'group',
      //   authRequired: true
      // },
      {
        id: 4,
        label: 'Chats',
        route: '/chats',
        icon: 'group',
        authRequired: true
      },
      // {
      //   id: 5,
      //   label: 'UsersList',
      //   route: '/userslist',
      //   icon: 'group',
      //   authRequired: true
      // },
      {
        id: 6,
        label: 'Login',
        route: '/login',
        icon: 'person',
        authRequired: false
      },
      {
        id: 7,
        label: 'Register',
        route: '/register',
        icon: 'person_add',
        authRequired: false
      },
      {
        id: 8,
        label: 'Logout',
        route: '/logout',
        icon: 'logout',
        authRequired: true
      },
      // {
      //   id: 9,
      //   label: 'Profile',
      //   route: '/profile',
      //   icon: 'manage_accounts',
      //   authRequired: true
      // },
    ])
    const thumbStyle = ref({
      right: '2px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75
    })
    const barStyle = ref({
      right: '0px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '6px',
      opacity: 0.2
    })
    const headerHeight = ref(null)
    const bodyHeight = ref(null)
    const footerHeight = ref(null)
    const clientHeight = ref(null)

  // Getters
  const getScrollAreaHeight = computed(() => {
    return clientHeight.value - headerHeight.value - footerHeight.value
  })

  return {
    // State
    links,
    thumbStyle,
    barStyle,
    headerHeight,
    bodyHeight,
    footerHeight,
    clientHeight,

    // Getters
    getScrollAreaHeight
  }
})