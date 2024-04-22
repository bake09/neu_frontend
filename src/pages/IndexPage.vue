<template>
  <q-page class="q-pa-md">
    <h4>Index Page</h4>
    <pre>{{ tasks }}</pre>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { api } from "boot/axios";

const tasks = ref([])

onMounted(() => {
  api.get('/api/task').then(res => {
    console.log(res)
    res.data.forEach(item => {
      tasks.value.push(item)
    })
  }).catch(err => {
    console.log(err)
  })
})
</script>
