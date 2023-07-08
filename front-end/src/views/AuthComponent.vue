<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();

const credentials = reactive({
  login: 'juju',
  password: '1234',
});

async function signIn() {
  await authStore.login(credentials);
}
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text" id="email-addon">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="email-addon"
            v-model="credentials.login"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="password-addon">#</span>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="password-addon"
            v-model="credentials.password"
          />
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <button type="button" class="btn btn-primary" @click="signIn">Log in!</button>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
