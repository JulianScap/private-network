<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  return false;
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Private Network</RouterLink>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="authStore.status.connected">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Posts</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/links">Links</RouterLink>
          </li>
        </ul>
        <button
          v-if="authStore.status.connected"
          class="btn btn-outline-danger"
          type="submit"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
