<template>
  <router-view />
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import { computed, watch } from 'vue';
import { useQuasar } from 'quasar'
const $q = useQuasar()
const { system, store } = useColorMode()

// const myColorMode = computed(() => store.value === 'auto' ? system.value : store.value)

watch(() => system.value, val => {
  store.value = val
  if(val == 'dark'){
    $q.dark.set(true)
  }else{
    $q.dark.set(false)
  }
})

watch(() => store.value, val => {
  if(val == 'dark'){
    $q.dark.set(true)
  }else{
    $q.dark.set(false)
  }
})

watch(() => $q.dark.isActive, val => {
  if(val == true){
    store.value = 'dark'
  }else{
    store.value = 'light'
  }
})
</script>

<style>
.q-inner-loading {
  background: rgb(137 137 137 / 60%);
}

.my-gradient{
  background: linear-gradient(360deg, rgb(241 222 180), transparent);
}
</style>