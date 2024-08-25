<template>
    <q-item
      key="item"
      clickable 
      v-ripple 
      @click="handleClick(user)"
      v-touch-hold:400.mouse="() => handleHold(user.id)"
      class="non-selectable" 
      :class="{
        // 'bg-blue-grey-1': task.done && !taskStore.selectedItems.includes(task.id),
        // 'bg-green-11': taskStore.selectedItems.includes(task.id)
      }"
      >
      <q-item-section avatar>
        <q-avatar :color="userStore.getAvatarColor(user.name.charAt(0))" text-color="white">
          <span>{{ user.name.charAt(0) }}</span>
          <transition
            appear
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut slow"
          >
            <q-badge floating color="green" rounded v-if="userStore.selectedItems.includes(user.id)">
              <q-icon name="check" color="white" size="14px"/>
            </q-badge>
          </transition>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label  lines="1" class="text-bold" style="max-width: 170px !important;">{{ user.name }}</q-item-label>
        <q-item-label  caption  lines="1"  style="max-width: 170px !important;">{{ user.email }}</q-item-label>
      </q-item-section>

      <q-item-section side top :class="user?.done ? 'text-strike text-italic' : ''">
        <q-item-label caption>5 min ago</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset="item" key="separator"/>
</template>

<script setup>
import { useUserStore } from "stores/user-store";
const userStore = useUserStore()

import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  user: Object
})

const handleClick = (user) => {
  if(!userStore.multiSelection){
    router.push(`chat/${user.id}`)
  }else{
    return
  }
}

const handleHold = (userId) => {
  console.log("handleHold triggered. Event: ", userId);

  if(!userStore.multiSelection){
    userStore.multiSelection = true
  }
  toggleSelection(userId)
}

const toggleSelection = (userId) => {
  const index = userStore.selectedItems.indexOf(userId);
  if (index === -1) {
    // ID hinzufügen, wenn nicht vorhanden
    userStore.selectedItems.push(userId);
  } else {
    // ID entfernen, wenn vorhanden
    userStore.selectedItems.splice(index, 1);
    // Überprüfen, kein Element in selectedItems ist
    if (userStore.selectedItems.length === 0 && !userStore.selectedItems.includes(userId)) {
      // Wenn ja, multiSelection auf false setzen
      userStore.multiSelection = false;
    }
  }
};
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