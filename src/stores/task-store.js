import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: []
  }),
  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },
  actions: {
    allTask () {
      api.get('/api/task').then(res => {
        console.log(res)
        res.data.forEach(item => {
          this.tasks.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
