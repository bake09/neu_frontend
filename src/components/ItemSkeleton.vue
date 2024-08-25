<template>
  <span>
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" height="40px" width="40px"/>
      </q-item-section>
  
      <q-item-section>
        <q-item-label caption>
          <q-skeleton type="text" width="40%" />
        </q-item-label>
        <q-item-label>
          <q-skeleton type="text" width="60%" />
        </q-item-label>
      </q-item-section>
  
      <q-item-section top>
        <q-item-label caption>
          <q-skeleton type="text" width="50%" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset="item" />
  </span>
</template>

<script setup>
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