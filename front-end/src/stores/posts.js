import { defineStore } from 'pinia';

export const usePostStore = defineStore('posts', () => {
  async function addPost(message) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/posts`, {
      method: 'POST',
      body: JSON.stringify({
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());

    return !response?.error;
  }

  return {
    addPost,
  };
});
