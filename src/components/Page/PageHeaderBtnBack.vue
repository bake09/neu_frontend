<template>
    <div class="row items-center q-pa-none q-ma-none">
        <q-btn
            v-ripple.early
            flat
            rounded
            icon="arrow_back"
            class="q-px-none "
            @click="useGoBack">
            <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
        </q-btn>
    </div>
</template>

<script setup>
import useGoBack from "src/use/useGoBack";

</script>