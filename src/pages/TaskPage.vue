<template>
  <q-page class="q-pa-md">
    <div class="text-h6">Tasks Page</div>
    <q-scroll-area style="height: 200px; max-width: 100%;" 
      :thumb-style="settingsStore.thumbStyle"
      :bar-style="settingsStore.barStyle">
      <q-list bordered separator v-if="taskStore.tasks.length">
        <q-item clickable v-ripple v-for="task in taskStore.tasks" :key="task.id">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              R
            </q-avatar>
          </q-item-section>

          <q-item-section>{{ task.content }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    
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

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

onMounted(() => {
  taskStore.allTask()
})
</script>
