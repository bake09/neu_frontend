import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from "boot/axios";
import { LocalStorage, Notify } from 'quasar'

export const useAuthStore = defineStore('auth', () => {
  // State
  const loginForm = ref({
    email: 'test@test.com',
    password: 'password',
  })
  const user = ref(LocalStorage.getItem('user') || null) // Initialisieren direkt aus dem LocalStorage
  const isAuthProceeding = ref({
    loading: false,
    label: ''
  })
  const token = ref(LocalStorage.getItem('token') || null)

  // Actions
  async function handleLogin () {
    isAuthProceeding.value.loading = true
    isAuthProceeding.value.label = 'Logging in...'
    try {
      const res = await api.post('auth/login', loginForm.value)
      console.log("auth-store : ", res)
      await getUser()
      isAuthProceeding.value.loading = false // Auf await achten, um sicherzustellen, dass der Benutzer geladen wird
      this.router.replace('/chats')
    } catch (err) {
      console.error(err)
      isAuthProceeding.value.loading = false
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'negative',
        message: 'Login failed. Please check your credentials and try again.',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    }
  }
  async function handleTokenLogin () {
    isAuthProceeding.value.loading = true
    isAuthProceeding.value.label = 'Logging in...'
    try {
      const res = await api.post('auth/token/login', loginForm.value)
      console.log("auth-store TOKEN: ", res)
      token.value = res.data.token
      LocalStorage.setItem('token', res.data.token)
      await getUser()
      isAuthProceeding.value.loading = false // Auf await achten, um sicherzustellen, dass der Benutzer geladen wird
      this.router.replace('/chats')
    } catch (err) {
      console.error(err)
      isAuthProceeding.value.loading = false
      // Notify.create({
      //   position: 'top',
      //   progress: true, 
      //   timeout: 3500,
      //   type: 'negative',
      //   message: 'Login failed. Please check your credentials and try again.',
      //   actions: [
      //     { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      //   ]
      // })
    }
  }
  async function getUser () {
    try {
      const res = await api.get('/user')
      console.log("getUser : ", res.data)
      user.value = res.data
      LocalStorage.setItem('user', res.data)
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'positive',
        message: res.data.email,
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    } catch (err) {
      console.error(err)
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'negative',
        message: 'Login Failed. Please Login again.',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    }
  }
  async function handleLogout() {
    isAuthProceeding.value.loading = true
    isAuthProceeding.value.label = 'Logging out...'
    try {
      const res = await api.post('auth/logout')
      user.value = null
      LocalStorage.removeItem('user')
      LocalStorage.removeItem('chats')
      isAuthProceeding.value.loading = false
      this.router.replace('/login')
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'positive',
        message: 'Logout success',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    } catch (err) {
      console.error(err)
      isAuthProceeding.value.loading = false
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'negative',
        message: 'Logout failed. Please try again.',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    }
  }
  async function handleTokenLogout() {
    isAuthProceeding.value.loading = true
    isAuthProceeding.value.label = 'Logging out...'
    try {
      const res = await api.post('auth/token/logout')
      user.value = null
      token.value = null
      LocalStorage.removeItem('user')
      LocalStorage.removeItem('token')
      LocalStorage.removeItem('chats')
      isAuthProceeding.value.loading = false
      this.router.replace('/login')
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'positive',
        message: 'Logout success',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    } catch (err) {
      console.error(err)
      isAuthProceeding.value.loading = false
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'negative',
        message: 'Logout failed. Please try again.',
        actions: [
          { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
        ]
      })
    }
  }
  async function clearUser() {
    LocalStorage.removeItem('user')
    user.value = null
    this.router.replace('/login')
  }

  return {
    // State
    loginForm,
    user,
    isAuthProceeding,
    token,

    // Actions
    handleLogin,
    getUser,
    handleLogout,
    clearUser,
    handleTokenLogin,
    handleTokenLogout
  }
})