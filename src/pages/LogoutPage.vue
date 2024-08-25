<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  
  import { useAuthStore } from "stores/auth-store";
  const authStore = useAuthStore()

  import { useMeta } from 'quasar'
  const metaData = {
    title: 'Logout Page',
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

  const handleLogout = async () => {
    await authStore.handleLogout()
    // await authStore.handleTokenLogout()
  }
  
  onMounted(() => {
    handleLogout()
  })

</script>
