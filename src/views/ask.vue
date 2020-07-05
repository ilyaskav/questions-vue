<template>
  <div>
    <h3>Ask a question</h3>
    <div class="form-group">
      <input
        type="text"
        placeholder="What do you want to know"
        class="form-control"
        v-model="question"
      />
    </div>
    <div class="form-group">
      <editor initialEditType="wysiwyg" ref="toastuiEditor"></editor>
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

export default {
  props: {
    question: String
  },
  components: {
    Editor
  },
  data() {
    return {
      editorOptions: {
        hideModeSwitch: true
      }
    };
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
