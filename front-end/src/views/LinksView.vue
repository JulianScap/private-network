<script setup>
import { onMounted, reactive } from 'vue';

import { useLinkStore } from '../stores/links.js';

const linkStore = useLinkStore();

const link = reactive({
  uri: 'http://bob.pn.co.nz:5174/',
});

const invites = reactive([]);

function addLink() {
  try {
    new URL(link.uri);
    return linkStore.addLink(link);
  } catch (error) {
    console.error('Invalid Url', error);
  }
}

function accept(invite) {
  return linkStore.accept(invite);
}

onMounted(async () => {
  invites.push(...(await linkStore.getInvites()));
});
</script>

<template>
  <div class="row mx-0 justify-content-center">
    <div class="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3 p-5">
      <div class="w-100 rounded-2 p-4 border text-secondary border-secondary">
        <label class="d-block mb-4">
          <span class="form-label d-block text-light">Link Uri</span>
          <input name="linkUri" type="url" class="form-control text-light" v-model="link.uri" />
        </label>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary" @click="addLink">Add Link</button>
        </div>
      </div>
    </div>
  </div>
  <div v-for="(invite, index) in invites" :key="index">
    <span>From: {{ invite.uri.frontEnd }}</span>
    <div class="btn-group" role="group">
      <button class="btn btn-outline-success" @click="accept(invite)">Accept?</button>
      <button class="btn btn-outline-danger">Decline</button>
    </div>
  </div>
</template>
