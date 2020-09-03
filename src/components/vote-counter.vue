<template>
  <div class="vote-counter">
    <b-button size="sm" variant="outline-secondary" class="rounded-circle px-1 py-0" @click="$emit('vote-up')">
      <b-icon-chevron-up></b-icon-chevron-up>
    </b-button>
    <h4 class="mt-1">{{votes}}</h4>
    <b-button size="sm" variant="outline-secondary" class="rounded-circle px-1 py-0" @click="$emit('vote-down')">
      <b-icon-chevron-down></b-icon-chevron-down>
    </b-button>
  </div>
</template>

<script>
import { BIconChevronUp, BIconChevronDown } from 'bootstrap-vue';

export default {
  props: {
    votes: Number
  },
  components: {
    BIconChevronUp,
    BIconChevronDown
  }
};
</script>

<style scoped>
.vote-counter {
  text-align: center;
}
</style>
