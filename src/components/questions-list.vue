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
    <questions-list-item v-for="question in questions" :key="question.id" :question="question"></questions-list-item>
  </div>
</template>

<script>
import QuestionsListItem from '@/components/questions-list-item.vue';

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
    this.getQuestions();
  },
  methods: {
    getQuestions() {
      this.questions = [
        {
          id: 1,
          question: 'Как мне увидеть оповещения о вопросе?',
          creator: 'Ilya Skavronskiy',
          creationDate: new Date(),
          votesCount: 1,
          answersCount: 2,
          tags: ['general']
        },
        {
          id: 2,
          question: 'Как часто вы выдаете билды в тестинг?',
          creator: 'Ilya Skavronskiy',
          creationDate: new Date(),
          votesCount: 2,
          answersCount: 0,
          tags: ['build-system']
        }
      ];
    }
  }
};
</script>

<style>
</style>
