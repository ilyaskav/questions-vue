<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Questions</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home', query: { q: 'popular'} }" class="nav-link" role="link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ask' }" class="nav-link" role="link">Ask</router-link>
          </li>
        </ul>
      </div>
      <div>
        Logged as <em>{{ fullName }}</em>
      </div>
    </nav>

    <main class="main-container container-md">
      <router-view />
    </main>
  </div>
</template>

<script>
import testDataSeed from '@/services/test-data-seed-service';
import { userService } from '@/services/user-service';

export default {
  data() {
    return {
      fullName: null
    };
  },
  beforeCreate() {
    if (!testDataSeed.initialDataIsLoaded()) {
      testDataSeed.seed();
    }
  },
  created() {
    const user = userService.getCurrent();
    this.fullName = `${user.name} ${user.surname}`;
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 20px;
}
</style>
