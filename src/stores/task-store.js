import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from "boot/axios";

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref([])
  const tasksIsLoading = ref(false)
  const newTask = ref('')
  const isModalShowing = ref(false)
  const selectedItem = ref(null)
  const selectedItems = ref([])
  const multiSelection = ref(false)
  // Getters: {
  const getTasks = computed(() => {
    return tasks.value
  })
  const getTasksCount = computed(() => {
    return tasks.value.length
  })
  const getSelectedItemsCount = computed(() => {
    return selectedItems.value.length
  })
  // Actions
  async function allTask () {
    tasks.value = []
    tasksIsLoading.value = true
    await api.get('/task').then(res => {
      res.data.data.forEach(item => {
        tasks.value.push(item)
      })
      tasksIsLoading.value = false
    }).catch(err => {
      console.log(err)
      tasksIsLoading.value = false
    })
  }
  async function addTask() {
    tasksIsLoading.value = true
    try {
      const res = await api.post('/task', { content: this.newTask })
      tasksIsLoading.value = false
      newTask.value = ''
      addTaskLocally(res.data.task)
    } catch (err) {
      console.log("task-store : ", err)
      tasksIsLoading.value = false
      newTask.value = ''
    }
  }
  function addTaskLocally(task){
    tasks.value.push(task)
  }
  async function toggleTaskDone(task) {
    selectedItem.value = task
    await api.patch(`/task/toggledone/${task.id}`, { done: !task.done }).then(res => {
      toggleTaskDoneLocally(res.data)
      selectedItem.value = null
    }).catch(err => {
      console.log(err)
      selectedItem.value = null
    })
  }
  function toggleTaskDoneLocally(task) {
    if (findLocalIndexById(task) !== -1) {
        tasks.value[findLocalIndexById(task)] = task
    }
  }
  function deleteTaskDoneLocally(task) {
    if (findLocalIndexById(task) !== -1) {
      tasks.value.splice(this.findLocalIndexById(task), 1);
    }
  }
  function findLocalIndexById(task){
    const localIndex = tasks.value.findIndex(item => item.id === task.id)
    return localIndex
  }
  async function deleteTask(task) {
    selectedItem.value = task
    await api.delete(`/task/${task.id}`).then(res => {
      tasksIsLoading.value = false
      deleteTaskDoneLocally(this.selectedItem)
      selectedItem.value = null
    }).catch(err => {
      selectedItem.value = null
      console.log(err)
    })
  }
  function editTask(task){
    console.log("editTask : ", task)
  }
  function openEditModal(task) {
    isModalShowing.value = !isModalShowing.value
    selectedItem.value = task
  }
  function hideEditModal() {
    selectedItem.value = null
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
  async function setMultipleDone() {
    // Zahlen in selectedItems von klein nach groß sortieren
    selectedItems.value.sort((a, b) => a - b);

    // Alle ausgewählten Aufgaben als erledigt markieren
    await Promise.all(this.selectedItems.map(async (item) => {
      try {
        const res = await api.patch(`/task/toggledone/${item}`, { done: true });
        const updatedTaskIndex = tasks.value.findIndex(task => task.id === res.data.data.id);
        if (updatedTaskIndex !== -1) {
          tasks.value[updatedTaskIndex] = res.data.data;
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }));

    // Alle ausgewählten Elemente aus selectedItems entfernen
    selectedItems.value = [];
  }

  return {
    // State
    tasks,
    tasksIsLoading,
    newTask,
    isModalShowing,
    selectedItem,
    selectedItems,
    multiSelection,

    // Getters
    getTasks,
    getTasksCount,
    getSelectedItemsCount,

    // Actions
    allTask,
    addTask,
    addTaskLocally,
    toggleTaskDone,
    toggleTaskDoneLocally,
    deleteTaskDoneLocally,
    findLocalIndexById,
    deleteTask,
    editTask,
    openEditModal,
    hideEditModal,
    getAvatarColor,
    setMultipleDone
  }
})