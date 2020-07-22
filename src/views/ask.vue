<template>
  <div>
    <h3>Ask a question</h3>
    <div class="form-group">
      <input
        type="text"
        placeholder="What do you want to know"
        class="form-control"
        v-model="post.question"
      />
    </div>
    <div class="form-group">
      <editor :initialValue="post.description" initialEditType="wysiwyg" ref="toastuiEditor"></editor>
    </div>
    <div class="form-group">
      <v-select taggable multiple push-tags :options="tags" label="name" v-model="post.tags" />
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="saveQuestion()">Save</button>
      &nbsp;
      <router-link :to="{ name: 'home' }" class="btn btn-secondary" role="button">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
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
        description: null,
        tags: null
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
      this.post.description = this.$refs.toastuiEditor.invoke('getMarkdown');

      if (!this.post.id) {
        this.post.creationDate = new Date();
        this.post.creator = 'Ilya Skavronskiy';
        this.post.votesCount = 0;
        this.post.answersCount = 0;
      }

      questionApiService.save(this.post);

      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
</style>
