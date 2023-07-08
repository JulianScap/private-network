import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

export const useCurrentUser = defineStore('currentUser', () => {
  const currentUser = ref(null);

  function setUser(user) {
    if (typeof user === 'undefined') {
      throw 'User is undefined';
    }
    currentUser.value = user;
  }

  function clearUser() {
    currentUser.value = null;
  }

  return {
    currentUser: readonly(currentUser),
    setUser,
    clearUser,
  };
});
