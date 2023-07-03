<script setup>
import AuthComponent from '@/views/AuthComponent.vue';
import MainComponent from '@/views/MainComponent.vue';

import { useAuthStore } from './stores/auth.js';

const authStore = useAuthStore();
</script>

<template>
  <AuthComponent v-if="!authStore.status.connected" />
  <MainComponent v-else />
</template>
