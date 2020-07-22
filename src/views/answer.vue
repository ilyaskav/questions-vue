<template>
  <div>
    <h3>{{question.question}}</h3>
    <div class="row">
      <div class="col-md-1">
        <vote-counter
          :votes="question.votesCount"
          @vote-up="upvote(question.messageId)"
          @vote-down="downvote(question.messageId)"
        ></vote-counter>
        <b-button size="sm" variant="secondary" class="rounded-circle">
          <b-icon-check2></b-icon-check2>
        </b-button>
      </div>
      <div class="col-md-11">
        <div>
          {{question.creator}} &bull;
          <span>{{question.creationDate.toLocaleDateString('en-gb', dateFormat)}}</span>
        </div>
        <div class="question-description">
          <viewer :initialValue="question.message.text"></viewer>
        </div>
        <div class="question-tags">
          <span
            class="badge badge-secondary question-tag"
            v-for="tag in question.tags"
            :key="tag.id"
          >{{tag.name}}</span>
        </div>
        <div>
          <b-button :to="{ name: 'ask', params: { questionId: questionId } }" variant="link">Edit</b-button>&bull;
          <b-button @click="deleteQuestion()" variant="link">Delete</b-button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <h5>{{question.answersCount}} {{question.answersCount === 1 ? 'answer' : 'answers'}}</h5>
      <answer-item v-for="answer in question.answers" :message="answer" :key="answer.id"></answer-item>
    </div>
    <div class="form-group">
      <h5>Your answer</h5>
      <editor initialEditType="wysiwyg" ref="toastuiEditor"></editor>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="saveAnswer()">Save</button>
      &nbsp;
      <router-link :to="{ name: 'home' }" class="btn btn-secondary" role="button">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import { questionApiService } from '@/services/question-api-service';
import { messageApiService } from '@/services/message-api-service';
import { voteApiService } from '@/services/vote-api-service';
import { BIconCheck2 } from 'bootstrap-vue';
import AnswerItem from '@/components/answer-item';
import VoteCounter from '@/components/vote-counter';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/vue-editor';

export default {
  props: {
    questionId: Number
  },
  components: {
    BIconCheck2,
    Editor,
    Viewer,
    AnswerItem,
    VoteCounter
  },
  data() {
    return {
      question: null,
      dateFormat: { year: 'numeric', month: 'long', day: 'numeric' }
    };
  },
  created() {
    this.question = questionApiService.getQuestionWithAnswers(this.questionId);
  },
  methods: {
    saveAnswer() {
      const answer = {
        questionId: this.question.id,
        creator: 'Ilya Skavronskiy',
        creationDate: new Date(),
        votesCount: 0,
        text: this.$refs.toastuiEditor.invoke('getMarkdown')
      };

      const savedAnswer = messageApiService.save(answer);
      this.question.answers.push(savedAnswer);
    },
    deleteQuestion() {},
    upvote(messageId) {
      voteApiService.upvote(messageId).then(voteChanged => {
        if (voteChanged) this.question.votesCount++;
      });
    },
    downvote(messageId) {
      voteApiService.downvote(messageId).then(voteChanged => {
        if (voteChanged) this.question.votesCount--;
      });
    }
  }
};
</script>

<style scoped>
.question-description {
  min-height: 32px;
}
</style>
