<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 300px;">
      <q-card-section>
        <q-form
            @submit.prevent="handleLogin"
            @reset="handleReset"
            class="q-gutter-md"
          >
          <div class="text-h6">Login Page</div>
          <q-input outlined v-model="authStore.loginForm.email" placeholder="Email" />
          <q-input outlined v-model="authStore.loginForm.password" label="Password" type="password"/>
          <div class="row">
            <q-btn label="Login" type="submit" class="col" color="black"/>
          </div>
        </q-form>
        <q-btn label="Noch keinen Account?" to="/register" exact class="q-mt-sm full-width" no-caps color="primary" flat/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
  import { useAuthStore } from "stores/auth-store";
  const authStore = useAuthStore()

  import { useMeta } from 'quasar'
  const metaData = {
    title: 'Login Page',
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

  const handleLogin = async () => {
    console.log("handleLogin triggerd")
    await authStore.handleLogin()
    // await authStore.handleTokenLogin()
  }
  
  const handleReset = () => {
    console.log("handleReset triggerd")
  }
</script>
