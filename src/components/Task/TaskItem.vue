<template>
  <!-- <transition-group
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut slower"
    > -->
    <q-item
      key="item"
      clickable 
      v-ripple 
      @click="handleClick(task)"
      v-touch-hold:400.mouse="() => handleHold(task.id)"
      class="non-selectable" 
      :class="{
        'bg-blue-grey-1': task.done && !taskStore.selectedItems.includes(task.id),
        'bg-green-11': taskStore.selectedItems.includes(task.id)
      }"
      v-touch-pan.prevent.mouse="handlePan"
      ref="itemRef"
      >
      <q-item-section avatar>
        <!-- https://github.com/quasarframework/quasar/discussions/16706 -->
        <!-- <q-avatar color="light-green-13"><img class="q-pa-xs" loading="eager" src="https://cdn.quasar.dev/img/avatar6.jpg" /></q-avatar> -->
        <q-avatar :color="taskStore.getAvatarColor(task.user.name.charAt(0))" text-color="white">
          <span>{{ task.user.name.charAt(0) }}</span>
          <transition
            appear
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut slow"
          >
            <q-badge floating color="green" rounded v-if="taskStore.selectedItems.includes(task.id)">
              <q-icon name="check" color="white" size="14px"/>
            </q-badge>
          </transition>
        </q-avatar>
      </q-item-section>

      <q-item-section :class="task.done ? 'text-strike text-italic' : ''">
        <q-item-label  lines="1" class="text-bold" style="max-width: 170px !important;">{{ task.user.name }}</q-item-label>
        <q-item-label  caption  lines="1"  style="max-width: 170px !important;">{{ task.content }}</q-item-label>
      </q-item-section>

      <q-item-section side top :class="task.done ? 'text-strike text-italic' : ''">
        <q-item-label caption>5 min ago</q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8 q-gutter-xs">
          <q-btn flat dense round icon="delete" color="red-6" @click.stop="taskStore.deleteTask(task)"/>
          <q-btn flat dense round icon="edit" @click.stop="taskStore.openEditModal(task)"/>
        </div>
      </q-item-section>
      <q-inner-loading :showing="taskStore.selectedItem && taskStore.selectedItem.id == task.id">
        <q-spinner-dots size="50px" color="primary" />
      </q-inner-loading>
    </q-item>
    <q-separator inset="item" key="separator"/>
  <!-- </transition-group> -->
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "stores/task-store";
const taskStore = useTaskStore()

const props = defineProps({
  task: Object
})

const handleHold = (taskId) => {
  console.log("handleHold triggered. Event: ", taskId);

  if(!taskStore.multiSelection){
    taskStore.multiSelection = true
  }
  toggleSelection(taskId)
}

const handleClick = (task) => {
  if(taskStore.multiSelection){
    toggleSelection(task.id)
  }else{
    taskStore.toggleTaskDone(task)
  }
}

const toggleSelection = (taskId) => {
  const index = taskStore.selectedItems.indexOf(taskId);
  if (index === -1) {
    // ID hinzufügen, wenn nicht vorhanden
    taskStore.selectedItems.push(taskId);
  } else {
    // ID entfernen, wenn vorhanden
    taskStore.selectedItems.splice(index, 1);
    // Überprüfen, kein Element in selectedItems ist
    if (taskStore.selectedItems.length === 0 && !taskStore.selectedItems.includes(taskId)) {
      // Wenn ja, multiSelection auf false setzen
      taskStore.multiSelection = false;
    }
  }
};
const info = ref(null)
const panning = ref(false)
const itemRef = ref(null)

const handlePan = ({ evt, ...newInfo }) => {
  info.value = newInfo

  // native Javascript event
  // console.log(itemRef.value.$el.style)
  console.log(evt)
  if (newInfo.isFirst) {
    panning.value = true
  }
  else if (newInfo.isFinal) {
    panning.value = false
  }
}
</script>

<style scoped>
.q-badge {
  padding: 2px 2px !important;
}
.q-badge--floating {
  position: absolute;
  top: unset !important;
  bottom: -4px !important;
  right: -3px;
  cursor: inherit;
  border: 2px white solid;
}
</style>