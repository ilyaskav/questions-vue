<template>
  <div class="questions-list">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link :to="{name: 'home', query: {q: 'popular'}}" class="nav-link active">Popular</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'home', query: {q: 'recent'}}" class="nav-link">Recent</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"></a>
        <router-link :to="{name: 'home', query: {q: 'unanswered'}}" class="nav-link">Unanswered</router-link>
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
  methods: {}
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
