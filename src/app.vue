<template>
  <div id="app" class="container-md">
    <router-view />
  </div>
</template>

<script>
import testDataSeed from '@/services/test-data-seed-service';
export default {
  mounted() {
    testDataSeed.seed();
  }
};
</script>

<style scoped>
#app {
  margin-top: 40px;
}
</style>
