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
      <editor initialEditType="wysiwyg" ref="toastuiEditor"></editor>
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

export default {
  props: {
    question: String
  },
  components: {
    Editor,
    vSelect
  },
  data() {
    return {
      editorOptions: {
        hideModeSwitch: true
      },
      tags: null,
      selectedTags: null,
      post: {
        question: null,
        description: null,
        tags: null
      }
    };
  },
  created() {
    this.tags = tagApiService.getAll();
    this.post.question = this.question;
  },
  methods: {
    saveQuestion() {
      // const markdown = this.$refs.toastuiEditor.invoke('getMarkdown');

      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
</style>
