import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    tasksIsLoading: false
  }),
  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },
  actions: {
    allTask () {
      this.tasks = []
      this.tasksIsLoading = true
      api.get('/api/task').then(res => {
        console.log(res)
        res.data.forEach(item => {
          this.tasks.push(item)
        })
        this.tasksIsLoading = false
      }).catch(err => {
        console.log(err)
        this.tasksIsLoading = false
      })
    }
  }
})
