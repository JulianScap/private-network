<script setup>
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
      <a class="navbar-brand" href="#">Private Network</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" href="#">Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Friends</a>
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
