<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Tasks Page</div> 
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="task in taskStore.tasks" :key="task.id">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            R
          </q-avatar>
        </q-item-section>

        <q-item-section>{{ task.content }}</q-item-section>
      </q-item>
    </q-list>
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
})
</script>
