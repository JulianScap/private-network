<script setup>
import AuthView from '@/views/AuthView.vue';
import MainView from '@/views/MainView.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';

import { useAuthStore } from './stores/auth.js';

const authStore = useAuthStore();
</script>

<template>
  <NavBarComponent />
  <main class="container p-5">
    <AuthView v-if="!authStore.status.connected" />
    <MainView v-else />
  </main>
</template>
