<script setup>
import { reactive } from 'vue';
import { usePostStore } from '../stores/posts.js';

const postStore = usePostStore();

const post = reactive({
  message: '',
});

function publishPost() {
  if (post.message) {
    return postStore.addPost(post.message);
  }
}
</script>

<template>
  <div class="row pt-5 pl-5">
    <div class="col-12 input-group">
      <span class="input-group-text">New post</span>
      <textarea
        class="form-control"
        aria-label="New post"
        v-model="post.message"
        placeholder="Share something"
      ></textarea>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-12">
      <button class="btn btn-primary" type="submit" @click="publishPost">Submit form</button>
    </div>
  </div>
</template>
