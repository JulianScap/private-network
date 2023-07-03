<script setup>

const credentials = {
  name: 'juju',
  password: '1234'
};

async function signIn() {
  console.log({ ...credentials });
}

</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
      </div>
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text" id="email-addon">@</span>
          <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon"
            v-model="credentials.name" v-validate="required" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="password-addon">#</span>
          <input type="password" class="form-control" placeholder="Password" aria-label="Password"
            aria-describedby="password-addon" v-model="credentials.password" v-validate="required" />
        </div>
      </div>
      <div class="col">
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <button type="button" class="btn btn-primary" @click="signIn">
          Log in!
        </button>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
