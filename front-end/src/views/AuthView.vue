<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();

const credentials = reactive({
  login: 'juju',
  password: '1234',
});

function signIn() {
  return authStore.login(credentials);
}
</script>

<template>
  <div class="row mx-0 justify-content-center">
    <div class="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3 p-5">
      <div class="w-100 rounded-2 p-4 border text-secondary border-secondary">
        <label class="d-block mb-4">
          <span class="form-label d-block text-light">Username</span>
          <input
            name="username"
            type="text"
            class="form-control text-light"
            placeholder="Username"
            v-model="credentials.login"
          />
        </label>

        <label class="d-block mb-4">
          <span class="form-label d-block text-light">Password</span>
          <input
            name="password"
            type="password"
            class="form-control text-light"
            v-model="credentials.password"
          />
        </label>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary" @click="signIn">Log in!</button>
        </div>
      </div>
    </div>
  </div>
</template>
