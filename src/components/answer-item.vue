<template>
  <div class="message-item">
    <div class="row">
      <div class="col-md-1 vote-section">
        <vote-counter
          :votes="message.votesCount"
          @vote-up="upvote(message.messageId)"
          @vote-down="downvote(message.messageId)"
        ></vote-counter>
      </div>
      <div class="col-md-11">
        <div>
          {{message.creator}} &bull;
          <span>{{message.creationDate.toLocaleDateString('en-gb', dateFormat)}}</span>
        </div>
        <div class="message-description">
          <viewer :initialValue="message.text"></viewer>
        </div>
        <div>
          <b-button :to="{ name: 'ask', params: { questionId: 1 } }" variant="link">Edit</b-button>&bull;
          <b-button @click="deleteAnswer()" variant="link">Delete</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/vue-editor';
import VoteCounter from '@/components/vote-counter';

import { voteApiService } from '@/services/vote-api-service';

export default {
  props: {
    message: Object
  },
  components: {
    Viewer,
    VoteCounter
  },
  data() {
    return {
      dateFormat: { year: 'numeric', month: 'long', day: 'numeric' }
    };
  },
  methods: {
    upvote(messageId) {
      voteApiService.upvote(messageId).then(voteChanged => {
        if (voteChanged) this.question.votesCount++;
      });
    },
    downvote(messageId) {
      voteApiService.downvote(messageId).then(voteChanged => {
        if (voteChanged) this.question.votesCount--;
      });
    },
    deleteAnswer() {}
  }
};
</script>

<style scoped>
.message-item {
  border-top: lightgray 2px solid;
}
</style>
