import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
  const selectedImage = ref(null)
  const selectedImageUrl = ref(null)
  const selectedImageRatio = ref(null)
  
  // getters
  const getProfileImage = computed(() => {
    if(selectedImageUrl.value){
      return selectedImageUrl.value
    }else{
      return '/avatar.png'
    }
  })

  // Actions
  async function handleLogin () {
    isAuthProceeding.value.loading = true
    isAuthProceeding.value.label = 'Logging in...'
    try {
      const res = await api.post('auth/login', loginForm.value)
      console.log("auth-store : ", res)
      await getUser()
      isAuthProceeding.value.loading = false // Auf await achten, um sicherzustellen, dass der Benutzer geladen wird
      this.router.replace('/chat/chats')
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
      console.log("auth-store : ", res)
      token.value = res.data.token
      user.value = res.data.user
      LocalStorage.setItem('token', res.data.token)
      LocalStorage.setItem('user', res.data.user)
      await getUser()
      isAuthProceeding.value.loading = false // Auf await achten, um sicherzustellen, dass der Benutzer geladen wird
      this.router.replace('/chat/chats')
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
    const id = user.value.id
    try {
      const res = await api.get(`/user/${id}`)
      user.value = res.data.data
      LocalStorage.setItem('user', res.data.data)
      Notify.create({
        position: 'top',
        progress: true, 
        timeout: 3500,
        type: 'positive',
        message: res.data.data.email,
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
  const handleImageUpload = (event) => {
    const target = event.target
    const file = target.files?.[0]

    if (file) {
      selectedImage.value = file
      selectedImageUrl.value = URL.createObjectURL(file)
      
      // Bild-Element erstellen, um das Verhältnis zu berechnen
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const width = img.width
        const height = img.height

        // Berechne das Verhältnis
        const aspectRatio = width / height;

        // Standard-Verhältnisse und deren numerische Werte
        const aspectRatios = {
          '16/9': 16 / 9,
          '4/3': 4 / 3,
          '1/1': 1 / 1,
          '3/4': 3 / 4,
          '9/16': 9 / 16,
        };

        // Funktion zum Finden des am nächsten liegenden Verhältnisses
        const closestRatio = Object.keys(aspectRatios).reduce((prev, curr) => {
          return Math.abs(aspectRatios[curr] - aspectRatio) < Math.abs(aspectRatios[prev] - aspectRatio) ? curr : prev;
        });

        selectedImageRatio.value = closestRatio;
      }
    }
  }
  async function updateProfile () {
    console.log("updateProfile triggered")
  }
  // Return everything
  return {
    // State
    loginForm,
    user,
    isAuthProceeding,
    token,
    selectedImage,
    selectedImageUrl,
    selectedImageRatio,

    // Getters
    getProfileImage,

    // Actions
    handleLogin,
    getUser,
    handleLogout,
    clearUser,
    handleTokenLogin,
    handleTokenLogout,
    handleImageUpload,
    updateProfile,
  }
})