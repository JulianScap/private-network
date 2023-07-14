import { defineStore } from 'pinia';
import { post } from '../common/request';

export const usePostStore = defineStore('posts', () => {
  async function addPost(message) {
    const response = await post('posts', { message });
    return !response?.error;
  }

  return {
    addPost,
  };
});
