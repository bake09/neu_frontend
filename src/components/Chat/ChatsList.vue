<template>
  <div class="row full-height">

    <LeftMenu />

    <RightChatList />

  </div>
</template>

<script setup>
import { onMounted } from "vue";

import LeftMenu from '../Nav/LeftMenu.vue';
import RightChatList from '../Nav/RightChatList.vue';

import { useRoute } from "vue-router";
const route = useRoute()

onMounted(() => {
  console.log("route : ", route)
})
</script>
