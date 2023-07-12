import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';
import { useCurrentUser } from './currentUser.js';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = useCurrentUser();
  const status = ref({
    connected: false,
  });

  async function login(credentials) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/auth`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());

    const { error, body } = response;
    if (!error) {
      const { bearer, user } = body;

      status.value.connected = true;
      currentUser.setUser(user);
      sessionStorage.setItem('bearer', bearer);
    } else {
      status.value.connected = false;
      sessionStorage.removeItem('bearer');
      currentUser.clearUser();
    }
  }

  function logout() {
    status.value.connected = false;
    sessionStorage.removeItem('bearer');
    currentUser.clearUser();
  }

  return {
    login,
    logout,
    status: readonly(status),
  };
});
