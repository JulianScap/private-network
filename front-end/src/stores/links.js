import { defineStore } from 'pinia';

import { get, post, put } from '../common/request.js';

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

  async function accept(invite) {
    await post(`links/accept/${invite.id}`);
  }

  return {
    addLink,
    getInvites,
    accept
  };
});
