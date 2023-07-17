import { defineStore } from 'pinia';

import { post } from '../common/request.js';


export const useLinkStore = defineStore('links', () => {
  async function addLink(credentials) {
    const response = await post('links', credentials);

    const { error, body } = response;
    if (error) {
      throw body;
    }
  }

  return {
    addLink
  };
});
