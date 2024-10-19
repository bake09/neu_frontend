<template>
  <q-page padding class="bg-blue-grey-10s">
    <q-header bordered class="bg-grey-1 text-black">
      <q-toolbar class="q-px-xs bg-white">
        <q-btn flat rounded icon="arrow_back" @click="router.push('/profile')" no-caps label="Profil"/>
      </q-toolbar>
    </q-header>

    <div class="main-content" style="height: calc(100vh -51px) ;">
      <div class="column q-col-gutter-md" style="height: 250px">
        <div class="col-3">
          <q-card 
            :class="`fit cursor-pointer column col-12 bg-blue`" 
            v-ripple > 
            <q-card-section class="absolute-center">
              <div class="text-h6">asdasdasd</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <q-card 
            :class="`fit cursor-pointer column col-12 bg-blue`" 
            v-ripple > 
            <q-card-section class="absolute-center">
              <div class="text-h6">asdasdasd</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <q-card 
            :class="`fit cursor-pointer column col-12 bg-blue`" 
            v-ripple > 
            <q-card-section class="absolute-center">
              <div class="text-h6">asdasdasd</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <q-card 
            :class="`fit cursor-pointer column col-12 bg-blue`" 
            v-ripple > 
            <q-card-section class="absolute-center">
              <div class="text-h6">asdasdasd</div>
            </q-card-section>
          </q-card>
        </div>  
    </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const categories = ref([
  {
    id: 1,
    title: 'Gruppe',
    color: 'green',
    icon: 'home',
    unlocked: true,
  },
  {
    id: 2,
    title: 'zu ZWEIT',
    color: 'red',
    icon: 'home',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Erwachsene',
    color: 'purple',
    icon: 'home',
    unlocked: true,
  },
  {
    id: 4,
    title: 'Extreme',
    color: 'yellow',
    icon: 'home',
    unlocked: true,
  }
])

const categoryClick = (category) => {
  console.log("clicked category => : ", category)
}

onMounted(() => {

})

</script>
