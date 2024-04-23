import { defineStore } from 'pinia'
import { api } from "boot/axios";

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    tasksIsLoading: false,
    newTask: ''
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
    },
    addTask() {
      this.tasksIsLoading = true
      api.post('/api/task', { content: this.newTask}).then(res => {
        this.tasksIsLoading = false
        this.newTask = ''
        this.tasks.push(res.data.task)
      }).catch(err => {
        console.log(err)
        this.tasksIsLoading = false
        this.newTask = ''
      })
    },
    updateTask(task) {
      console.log(task)
    },
    deleteTask(task) {
      this.tasksIsLoading = true
      api.delete(`/api/task/${task.id}`).then(res => {
        this.tasksIsLoading = false
        this.tasks.forEach((item, index) => {
          if (item.id === task.id) {
            this.tasks.splice(index, 1);
          }
        });
      }).catch(err => {
        this.tasksIsLoading = false
        console.log(err)
      })
    }
  }
})
