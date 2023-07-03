import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    status: 'Logged out',
  });

  async function login(credentials) {
    user.value = {
      name: credentials.login,
      status: 'Logged in',
    };
  }

  return {
    login,
    user,
  };
});
