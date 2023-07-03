import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    status: 'Logged out',
  });

  async function login(credentials) {
    const response = await fetch('http://localhost:51055/auth', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());

    const { error, body } = response;
    if (!error) {
      user.value = {
        ...body.user,
        status: 'Logged in',
      };
    } else {
      user.value = {
        status: 'Logged out',
      };
    }
  }

  return {
    login,
    user: readonly(user),
  };
});
