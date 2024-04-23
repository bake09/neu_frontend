<template>
  <q-page class="q-pa-md">
    <div class="text-h6">Tasks Page</div>
    <div class="row q-mb-md column">
      <q-input
        rounded
        outlined
        dense
        bottom-slots
        v-model="taskStore.newTask"
        label="Label"
        :dense="dense">
        <template v-slot:hint>
          Field hint
        </template>
  
        <template v-slot:after>
          <q-btn
            round
            flat
            icon="send"
            @click.prevent="taskStore.addTask" />
        </template>
      </q-input>
    </div>

    <q-scroll-area
      style="height: 300px; max-width: 100%;"
      :thumb-style="settingsStore.thumbStyle"
      :bar-style="settingsStore.barStyle"
      ref="tasksBox">
      <q-list bordered separator v-if="taskStore.tasks.length">
        <q-item clickable v-ripple v-for="task in taskStore.tasks" :key="task.id">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              R
            </q-avatar>
          </q-item-section>

          <q-item-section>{{ task.content }}</q-item-section>
          <q-item-section avatar>
            <q-btn flat round color="red" icon="delete" @click.stop="taskStore.deleteTask(task)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-inner-loading
        :showing="taskStore.tasksIsLoading"
        label="loading..."
        label-class="primary"
        label-style="font-size: 1.1em"
      />
    </q-scroll-area>
    
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useMeta } from 'quasar'

const metaData = {
  // sets document title
  title: 'Tasks Page',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - Frontend App`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - Frontend App`
      }
    }
  },
}

useMeta(metaData)







import { useTaskStore } from "stores/task-store";
const taskStore = useTaskStore()

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

const tasksBox = ref(null)

const position = ref(300)
const animateScroll = () => {
  tasksBox.value.setScrollPosition('vertical', position.value, 300)
}

onMounted(() => {
  taskStore.allTask()
  console.log(tasksBox.value)
  nextTick()
  animateScroll()
})
</script>
