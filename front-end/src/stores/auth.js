import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

import { useCurrentUser } from './currentUser.js';
import { post } from '../common/request.js';

const sessionStorageKey = 'bearer';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = useCurrentUser();
  const status = ref({
    connected: !!sessionStorage.getItem(sessionStorageKey),
  });

  async function login(credentials) {
    const response = await post('auth', credentials, false);

    const { error, body } = response;
    if (!error) {
      const { bearer, user } = body;

      status.value.connected = true;
      currentUser.setUser(user);
      sessionStorage.setItem(sessionStorageKey, bearer);
    } else {
      logout();
    }
  }

  function logout() {
    status.value.connected = false;
    sessionStorage.clear();
    currentUser.clearUser();
  }

  return {
    login,
    logout,
    status: readonly(status),
  };
});
