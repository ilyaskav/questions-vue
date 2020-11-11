<template>
  <div class="questions-list">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link :to="{name: 'home', query: {q: 'popular'}}" class="nav-link" :class="{'active': tab === 'popular'}">
          Popular
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'home', query: {q: 'recent'}}" class="nav-link" :class="{'active': tab === 'recent'}">
          Recent
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'home', query: {q: 'unanswered'}}" class="nav-link" :class="{'active': tab === 'unanswered'}">
          Unanswered
        </router-link>
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
  props: {
    tab: String
  },
  watch: {
    tab: function (newVal, oldVal) {
      this.loadQuestions();
    }
  },
  data() {
    return {
      questions: null
    };
  },
  created() {
    this.loadQuestions();
  },
  methods: {
    loadQuestions() {
      let apiMethod = null;

      switch (this.tab) {
        case 'popular':
          apiMethod = questionApiService.getPopular;
          break;
        case 'recent':
          apiMethod = questionApiService.getRecent;
          break;
        case 'unanswered':
          apiMethod = questionApiService.getUnanswered;
          break;
      }

      apiMethod().then((response) => {
        this.questions = response;
      });
    }
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
