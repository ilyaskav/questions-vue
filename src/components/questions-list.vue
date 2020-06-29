<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">Popular</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Recent</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Unanswered</a>
      </li>
    </ul>
    <div v-for="question in questions" :key="question">{{ question.question }}</div>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array
  }
};
</script>

<style>
</style>
