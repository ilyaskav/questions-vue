<template>
  <div class="row">
    <div class="col-md-1 vote">
      <div class="votes-counter">{{question.votesCount}}</div>
      <div class="votes-label">{{question.votesCount === 1 ? 'vote' : 'votes'}}</div>
    </div>
    <div class="col-md-11 question-info">
      <h3>{{question.question}}</h3>
      <span>{{question.answersCount}} answers</span> &bull;
      <span>{{question.creator}}</span> &bull;
      <span>{{question.creationDate}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  }
};
</script>

<style>
</style>
