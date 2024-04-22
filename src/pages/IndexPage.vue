<template>
  <q-page class="q-pa-md">
    <h4>Index Page</h4>
    <pre>{{ taskStore.tasks }}</pre>
    <q-inner-loading
        :showing="taskStore.tasksIsLoading"
        label="loading..."
        label-class="primary"
        label-style="font-size: 1.1em"
      />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useTaskStore } from "stores/task-store";
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.allTask()
  console.log(taskStore.tasks)
})
</script>
