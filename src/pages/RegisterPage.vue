<template>
  <q-page class="flex flex-center">
    <q-card style="width: 300px;">
      <q-card-section>
        <q-form
            @submit.prevent="handleLogin"
            @reset="handleReset"
            class="q-gutter-md"
          >
          <div class="text-h6">Register Page</div>
          <q-input outlined v-model="form.name" placeholder="Name" clearable clear-icon="close"/>
          <q-input outlined v-model="form.email" placeholder="Email" clearable clear-icon="close"/>
          <q-input outlined v-model="form.password" label="Password" type="password" clearable clear-icon="close"/>
          <q-input outlined v-model="form.password_conformation" label="Confirm Password" type="password" clearable clear-icon="close"/>
          <div class="row">
            <q-btn label="Register" type="submit" class="col" color="black"/>
          </div>
        </q-form>
        <q-btn label="Account bereits vorhanden?" to="/login" exact class="q-mt-sm full-width" no-caps color="primary" flat/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
  import { ref } from "vue";
  
  import { useMeta } from 'quasar'
  const metaData = {
    title: 'Register Page',
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

  const form = ref({
    name: '',
    email: '',
    password: '',
    password_conformation: ''
  })

  const handleLogin = () => {
    console.log("handleLogin triggerd")
  }
  
  const handleReset = () => {
    console.log("handleReset triggerd")
  }

</script>
