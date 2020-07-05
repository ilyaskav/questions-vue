<template>
  <div class="home">
    <div class="row">
      <div class="col-md">
        <div class="form-row question-input">
          <div class="col-md-10">
            <input
              type="text"
              placeholder="What do you want to know"
              class="form-control"
              v-model="question"
            />
          </div>
          <div class="col-md-2">
            <button
              type="button"
              class="btn btn-primary form-control"
              @click="openAskForm()"
            >Ask question</button>
          </div>
        </div>
        <questions-list></questions-list>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionsList from '@/components/questions-list.vue';

export default {
  name: 'home',
  components: {
    QuestionsList
  },
  data() {
    return {
      question: null
    };
  },
  methods: {
    openAskForm() {
      this.$router.push({ name: 'ask', query: { question: this.question } });
    }
  }
};
</script>

<style scoped>
.question-input {
  background-color: #f2f2f2;
  padding: 20px 0;
}
</style>
