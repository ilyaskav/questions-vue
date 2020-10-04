<template>
  <div class="questions-list-item">
    <div class="row question-container">
      <div class="col-md-1 vote">
        <div class="votes-counter">{{question.votesCount}}</div>
        <div class="votes-label">{{question.votesCount === 1 ? 'vote' : 'votes'}}</div>
      </div>
      <div class="col-md-11 question-info">
        <router-link :to="{ name: 'answer', params: { questionId: question.id }}"> <h5>{{question.question}}</h5> </router-link>
        <span class="answers-counter" :class="{'text-danger': question.answersCount === 0}">
          {{question.answersCount}}
        </span> answers &bull;
        <span>{{question.creator.name}} {{question.creator.surname}}</span> &bull;
        <span>{{question.creationDate.toLocaleDateString('en-gb', dateFormat)}}</span>
        <div class="question-tags">
          <span class="badge badge-secondary question-tag" v-for="tag in question.tags" :key="tag.id">{{tag.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      dateFormat: { year: 'numeric', month: 'long', day: 'numeric' }
    };
  }
};
</script>

<style scoped>
.questions-list-item {
  border-bottom: 2px solid lightgray;
}
.question-tags {
  margin-bottom: 10px;
}
.question-tag {
  margin-right: 5px;
}
.question-container {
  padding-top: 5px;
}
.answers-counter {
  font-weight: bold;
}
.vote {
  text-align: center;
}
.votes-counter {
  font-size: 20px;
}
</style>
