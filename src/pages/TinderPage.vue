<template>
  <q-page class="q-pa-md">
    <q-header class="shadow-2">
      <q-toolbar>
        <q-toolbar-title>Tinder-Style App (Frontend Only)</q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <!-- Swipable Cards Section -->
    <div class="swipe-container">
      <q-card 
        v-if="currentProfile" 
        class="my-card"
        :key="currentProfile.id">
        <q-img :src="currentProfile.image" class="full-width">
          <div class="absolute-bottom bg-black text-white text-center py-2">
            <div class="text-h6">{{ currentProfile.name }}</div>
            <div class="text-subtitle2">{{ currentProfile.age }} Jahre</div>
          </div>
        </q-img>
        <q-card-section>
          <p>{{ currentProfile.bio }}</p>
        </q-card-section>

        <div class="actions text-center">
          <q-btn color="negative" @click="dislike">Dislike</q-btn>
          <q-btn color="positive" @click="like">Like</q-btn>
        </div>
      </q-card>

      <!-- No more profiles message -->
      <div v-else class="text-center">
        <q-icon name="mood" size="100px" color="primary" />
        <div class="text-h6">Keine weiteren Profile</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const profiles = ref([
  { id: 1, name: 'Alice', age: 25, bio: 'Ich liebe Abenteuer!', image: 'https://via.placeholder.com/400x600?text=Alice' },
  { id: 2, name: 'Bob', age: 28, bio: 'Programmierer und Musiker.', image: 'https://via.placeholder.com/400x600?text=Bob' },
  { id: 3, name: 'Charlie', age: 30, bio: 'Fotografie ist meine Leidenschaft.', image: 'https://via.placeholder.com/400x600?text=Charlie' },
]);

const currentIndex = ref(0);
const currentProfile = ref(profiles.value[currentIndex.value]);

const like = () => {
  console.log(`Liked: ${currentProfile.value.name}`);
  nextProfile();
};

const dislike = () => {
  console.log(`Disliked: ${currentProfile.value.name}`);
  nextProfile();
};

const nextProfile = () => {
  currentIndex.value++;
  if (currentIndex.value < profiles.value.length) {
    currentProfile.value = profiles.value[currentIndex.value];
  } else {
    currentProfile.value = null; // No more profiles
  }
};
</script>

<style scoped>
.swipe-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.my-card {
  max-width: 400px;
  width: 100%;
}
</style>
