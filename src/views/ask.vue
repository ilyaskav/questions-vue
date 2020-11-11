<template>
  <div>
    <header>
      <h3>Ask a question</h3>
    </header>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <ValidationProvider rules="required" v-slot="{ classes }">
            <input
              type="text"
              placeholder="What do you want to know"
              class="form-control" :class="classes"
              v-model="post.question"
            />
          </ValidationProvider>
        </div>
        <div class="form-group">
          <editor :initialValue="post.message.text" initialEditType="wysiwyg" ref="toastuiEditor"></editor>
        </div>
        <div class="form-group">
          <v-select taggable multiple push-tags :options="tags" label="name" v-model="post.tags" />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="saveQuestion()" :disabled="invalid">
            Save
          </button>
          &nbsp;
          <router-link :to="{ name: 'home' }" class="btn btn-secondary" role="button">Cancel</router-link>
        </div>
    </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import { tagApiService } from '@/services/tag-api-service.js';
import { questionApiService } from '@/services/question-api-service';

export default {
  props: {
    question: String,
    questionId: {
      type: Number,
      required: false
    }
  },
  components: {
    Editor,
    vSelect
  },
  data() {
    return {
      tags: null,
      post: {
        question: null,
        tags: null,
        message: {}
      }
    };
  },
  created() {
    this.tags = tagApiService.getAll();

    if (this.questionId) {
      this.post = questionApiService.getById(this.questionId);
    } else {
      this.post.question = this.question;
    }
  },
  methods: {
    saveQuestion() {
      this.post.message.text = this.$refs.toastuiEditor.invoke('getMarkdown');

      questionApiService.save(this.post);

      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
</style>
