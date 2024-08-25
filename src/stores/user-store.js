import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from "boot/axios";

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([])
  const editModalShowing = ref(false)
  const usersIsLoading = ref(false)
  const selectedItem = ref(null)
  const columns = ref([
    { name: 'id', label: 'id', align: 'left', field: 'id', sortable: true },
    { name: 'name', label: 'name', align: 'left', field: 'name', sortable: true },
    { name: 'email', label: 'email', field: 'email', sortable: true },
    { name: "actions", label: "Actions", field: "actions" }
  ])
  const selectedUsers = ref([])
  const selectedItems = ref([])
  const multiSelection =  ref(false)
  // Getters
  const getSelectedItemsCount = computed(() =>{
      return selectedItems.value.length
  })
  // Actions
  async function allUsers () {
    users.value = []
    usersIsLoading.value = true
    await api.get('/users').then(res => {
      console.log(res.data.data)
      res.data.data.forEach(item => {
        users.value.push(item)
      })
      usersIsLoading.value = false
    }).catch(err => {
      console.log(err)
      usersIsLoading.value = false
    })
  }
  function openEditModal(user) {
    console.log(user)
    editModalShowing.value = !editModalShowing.value
    selectedItem.value = user
  }
  function hideEditModal() {
    selectedItem.value = null
  }
  function getSelectedString () {
    return selectedUsers.value.length === 0 ? '' : `${selectedUsers.value.length} record${selectedUsers.value.length > 1 ? 's' : ''} selected of ${users.value.length}`
  }
  function getAvatarColor(firstChar) {
    // Hier könntest du eine Logik implementieren, um basierend auf dem ersten Buchstaben eine Farbe zurückzugeben
    // Zum Beispiel könntest du eine Farbpalette haben und basierend auf dem Buchstaben eine Farbe auswählen
    // Hier ist nur ein einfaches Beispiel:

    const charCode = firstChar.charCodeAt(0);
    const colors = ["primary", "secondary", "red", "green", "blue", "grey"]; // Eine Farbpalette

    // Wir könnten den ASCII-Wert des Buchstabens verwenden, um eine Farbe auszuwählen
    const colorIndex = charCode % colors.length;

    return colors[colorIndex];
  }

  return {
    // State
    users,
    editModalShowing,
    usersIsLoading,
    selectedItem,
    columns,

    // Getters
    getSelectedItemsCount,

    // Actions
    allUsers,
    openEditModal,
    hideEditModal,
    getSelectedString,
    getAvatarColor
  }
})