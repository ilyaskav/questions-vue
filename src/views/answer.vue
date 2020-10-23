<template>
  <div v-if="question">
    <h3>{{question.question}}</h3>
    <div class="row">
      <div class="col-md-1">
        <vote-counter
          :votes="question.votesCount"
          @vote-up="upvote(question.messageId)"
          @vote-down="downvote(question.messageId)"
        ></vote-counter>
      </div>
      <div class="col-md-11">
        <div>
          {{question.creator.name}} {{question.creator.surname}} &bull;
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
        <div v-if="question.creatorId === currentUserId">
          <b-button
            :to="{ name: 'ask', params: { questionId: questionId } }"
            variant="link"
            class="link-btn">
            Edit
          </b-button>
          <b-button @click="deleteQuestion()" variant="link" class="link-btn">Delete</b-button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h5>{{question.answers.length}} {{question.answers.length === 1 ? 'answer' : 'answers'}}</h5>
      <answer-item
        v-for="answer in question.answers"
        :message="answer"
        :questionCreator="question.creatorId"
        :key="answer.id"
        @on-edit="openEditMessageModal"
        @on-remove="deleteMessage"
      ></answer-item>
    </div>
    <div class="form-group">
      <h5>Your answer</h5>
      <editor initialEditType="wysiwyg" ref="createMessageEditor"></editor>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="saveAnswer()">Save</button>
      &nbsp;
      <router-link :to="{ name: 'home' }" class="btn btn-secondary" role="button">Cancel</router-link>
    </div>

    <b-modal id="edit-message-modal" title="Edit Message" size="lg" :static="true" ok-title="Save" @ok="editMessage">
      <editor initialEditType="wysiwyg" ref="editMessageEditor" ></editor>
  </b-modal>
  </div>
</template>

<script>
import { questionApiService } from '@/services/question-api-service';
import { messageApiService } from '@/services/message-api-service';
import { voteApiService } from '@/services/vote-api-service';
import { userService } from '@/services/user-service';
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
    Editor,
    Viewer,
    AnswerItem,
    VoteCounter
  },
  data() {
    return {
      question: null,
      dateFormat: { year: 'numeric', month: 'long', day: 'numeric' },
      currentUserId: userService.getCurrent().id,
      editMessageEditorOptions: {
        minHeight: '150px'
      },
      editedMessage: null
    };
  },
  beforeRouteEnter(to, from, next) {
    questionApiService
      .getQuestionWithAnswers(+to.params.questionId)
      .then((response) => {
        next((vm) => {
          vm.question = response;
        });
      });
  },
  methods: {
    saveAnswer() {
      const answer = {
        questionId: this.question.id,
        votesCount: 0,
        text: this.$refs.createMessageEditor.invoke('getMarkdown'),
        accepted: false
      };

      messageApiService.save(answer).then((savedAnswer) => {
        this.question.answers.push(savedAnswer);
        this.$refs.createMessageEditor.invoke('setMarkdown', '');
      });
    },
    deleteQuestion() {
      this.$bvModal
        .msgBoxConfirm('Are you sure you want to delete this question?', {
          title: 'Confirmation'
        })
        .then((confirmed) => {
          if (!confirmed) return;

          questionApiService.delete(this.question.id).then(() => {
            this.$router.push({ name: 'home' });
          });
        });
    },
    upvote(messageId) {
      voteApiService.upvote(messageId).then((voteChanged) => {
        if (voteChanged) this.question.votesCount++;
      });
    },
    downvote(messageId) {
      voteApiService.downvote(messageId).then((voteChanged) => {
        if (voteChanged) this.question.votesCount--;
      });
    },
    openEditMessageModal(messageId) {
      this.editedMessage = this.question.answers.find(a => a.id === messageId);
      this.$refs.editMessageEditor.invoke('setMarkdown', this.editedMessage.text);
      this.$bvModal.show('edit-message-modal');
    },
    editMessage() {
      this.editedMessage.text = this.$refs.editMessageEditor.invoke('getMarkdown');
      messageApiService.save(this.editedMessage).then(this.loadQuestion);
    },
    deleteMessage(messageId) {
      this.$bvModal
        .msgBoxConfirm('Are you sure you want to delete this message?', {
          title: 'Confirmation'
        })
        .then((confirmed) => {
          if (!confirmed) return;

          messageApiService.delete(messageId).then(this.loadQuestion);
        });
    },
    loadQuestion() {
      questionApiService
        .getQuestionWithAnswers(this.questionId)
        .then((response) => {
          this.question = response;
        });
    }
  }
};
</script>

<style scoped>
.question-description {
  min-height: 32px;
}
.link-btn {
  box-shadow: none;
  padding: 0;
  color: rgb(92, 92, 92);
  text-decoration: none;
  font-size: 0.85rem;
}
.link-btn:not(:last-child)::after {
  content: '•';
  position: relative;
  left: 6px;
  padding-right: 10px;
  cursor: default;
}
</style>
