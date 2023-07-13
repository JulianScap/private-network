<script setup>
import { RouterView } from 'vue-router';

import AuthView from './views/AuthView.vue';
import NavBarComponent from './components/NavBarComponent.vue';

import { useAuthStore } from './stores/auth.js';

const authStore = useAuthStore();
</script>

<template>
  <NavBarComponent />
  <main class="container p-5">
    <AuthView v-if="!authStore.status.connected" />
    <RouterView v-else />
  </main>
</template>
