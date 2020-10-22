<template>
  <div id="app" class="container-md">
    <router-view />
  </div>
</template>

<script>
import testDataSeed from '@/services/test-data-seed-service';
export default {
  beforeCreate() {
    testDataSeed.seed();
  },
  beforeDestroy() {
    testDataSeed.clean();
  }
};
</script>

<style scoped>
#app {
  margin-top: 40px;
}
</style>
