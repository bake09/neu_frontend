<template>
  <q-page>
    <q-header class="shadow-2">
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="goBack" />
        <q-toolbar-title>Tasks PAGE</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- <Header></Header> -->
    <div class="absolute full-width full-height column">
      <q-scroll-area
        class="q-scroll-area-custom"
        :thumb-style="settingsStore.thumbStyle"
        :bar-style="settingsStore.barStyle"
        ref="tasksBox">
        <q-list v-if="!taskStore.tasks.length">
          <ItemSkeleton v-for="i in 7" :key="i"/>
        </q-list>
        <q-list v-else>
          <TaskItem v-for="task in taskStore.tasks" :key="task.id" :task="task"/>
        </q-list>
      </q-scroll-area>
    </div>

    <q-footer class="shadow-2" ref="footerRef">
      <q-toolbar class="bg-white">
        <TaskInput class="q-pa-xs" @task-sent="animateScroll"/>
      </q-toolbar>
    </q-footer>

    <q-dialog v-model="taskStore.isModalShowing" @before-hide="taskStore.hideEditModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ taskStore.selectedItem.id }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined v-model="taskStore.selectedItem.content" label="Outlined" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from "vue";
import { useMeta } from 'quasar'
import TaskItem from '../components/Task/TaskItem.vue';
import ItemSkeleton from '../components/ItemSkeleton.vue';
import Header from '../components/Header.vue';

import { useSettingsStore } from "stores/settings-store";
const settingsStore = useSettingsStore()

const footerRef = ref(null)
import TaskInput from '../components/Task/TaskInput.vue';

const metaData = {
  title: 'Tasks Page',
  titleTemplate: title => `${title} - Frontend App`,
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    ogTitle:  {
      property: 'og:title',
      template (ogTitle) {
        return `${ogTitle} - Frontend App`
      }
    }
  },
}
useMeta(metaData)

import { storeToRefs } from 'pinia'
import { useTaskStore } from "stores/task-store";

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const tasksBox = ref(null)

const animateScroll = async () => {
  if (!tasksBox.value) return;
  await nextTick(); // Ensure that the DOM is updated
  const scrollTarget = tasksBox.value.getScrollTarget();
  const scrollHeight = scrollTarget.scrollHeight;
  tasksBox.value.setScrollPosition('vertical', scrollHeight, 150);
}

import { echo } from "../boot/echo";

onMounted(async () => {
  await taskStore.allTask()
  animateScroll()

  echo.channel(`todochannel.1`)
  .listen('.addTodo', (payload) => {
    taskStore.addTaskLocally(payload.task)
    animateScroll()
  })
  .listen('.toggleTodo', (payload) => {
    taskStore.toggleTaskDoneLocally(payload.task)
  })
  .listen('.deleteTodo', (payload) => {
    taskStore.deleteTaskDoneLocally(payload.task)
  });
})
onUnmounted(() => {
  console.log("unmounted")
  echo.leaveChannel(`todochannel.1`)
})
</script>
