<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <button class="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse">
        Bootstrap collapse
      </button>
      <div class="collapse py-2" id="collapseTarget">
        This is the toggle-able content!
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
