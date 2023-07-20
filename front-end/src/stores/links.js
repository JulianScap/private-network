import { defineStore } from 'pinia';

import { get, put } from '../common/request.js';

export const useLinkStore = defineStore('links', () => {
  async function addLink(credentials) {
    const response = await put('links', credentials);

    const { error, body } = response;
    if (error) {
      throw body;
    }
  }

  async function getInvites() {
    const response = await get('links/status/Invited');

    const { error, body } = response;
    if (error) {
      throw body;
    }

    return body;
  }

  return {
    addLink,
    getInvites,
  };
});
