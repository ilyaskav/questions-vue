<template>
  <div class="questions-list">
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
    <div class="list-items-container">
      <questions-list-item v-for="question in questions" :key="question.id" :question="question"></questions-list-item>
    </div>
  </div>
</template>

<script>
import QuestionsListItem from '@/components/questions-list-item.vue';
import { questionApiService } from '@/services/question-api-service';

export default {
  components: {
    QuestionsListItem
  },
  data() {
    return {
      questions: null
    };
  },
  created() {
    this.questions = questionApiService.getQuesionsList();
  },
  methods: {

  }
};
</script>

<style scoped>
.questions-list {
  margin-top: 25px;
}
.list-items-container {
  margin-top: 20px;
}
</style>
