<template>
  <div class="flex col q-gutter-sm taskinput">
    <q-input
      autogrow
      rounded
      outlined
      dense
      v-model="taskStore.newTask"
      class="bg-white col"
      placeholder="Task hinzufügen"
      ref="inputRef"
      @keydown.ctrl.enter="addTask"
      style="max-height: 120px !important; overflow: auto;"
    >
    </q-input>
    <div class="self-end">
      <q-btn
        round
        outline
        icon="send"
        color="primary"
        @click.prevent="addTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const inputRef = ref(null)
onMounted(() => {
  // inputRef.value.focus()
})
import { useTaskStore } from "stores/task-store";
const taskStore = useTaskStore()

const emit = defineEmits(['task-sent']);

const addTask = async () => {
  await taskStore.addTask()
  emit('task-sent');
  // inputRef.value.focus()
};
</script>

<style>
.taskinput .q-field__native {
  max-height: 100px;
  max-width: 83%;
  background: yellow;
  margin-left: 10px;
  overflow: scroll;
}
</style>