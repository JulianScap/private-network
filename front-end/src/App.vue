<script setup>
import AuthView from '@/views/AuthView.vue';
import MainView from '@/views/MainView.vue';

import { useAuthStore } from './stores/auth.js';

const authStore = useAuthStore();
</script>

<template>
  <div class="container">
    <AuthView v-if="!authStore.status.connected" />
    <MainView v-else />
  </div>
</template>
