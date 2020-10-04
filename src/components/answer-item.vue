<template>
  <div class="message-item">
    <div class="row">
      <div class="col-md-1 vote-section">
        <vote-counter
          :votes="message.votesCount"
          @vote-up="upvote(message.messageId)"
          @vote-down="downvote(message.messageId)"
        ></vote-counter>
        <p class="h4" v-if="message.accepted">
          <b-icon-check-circle-fill variant="success"></b-icon-check-circle-fill>
        </p>
      </div>
      <div class="col-md-11">
        <div>
          {{message.creator.name }} {{ message.creator.surname}} &bull;
          <span>{{message.creationDate.toLocaleDateString('en-gb', dateFormat)}}</span>
        </div>
        <div class="message-description">
          <viewer :initialValue="message.text"></viewer>
        </div>
        <div>
          <span v-if="questionCreator === currentUserId && !message.accepted">
            <b-button @click="acceptAnswer()" variant="link" class="link-btn">Accept Answer</b-button>&bull;
          </span>
          <span v-if="message.creatorId === currentUserId">
            <b-button @click="$emit('on-edit', message.id)" variant="link" class="link-btn">Edit</b-button>
            <b-button @click="$emit('on-remove', message.id)" variant="link" class="link-btn">Delete</b-button>
          </span>
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
import { BIconCheckCircleFill } from 'bootstrap-vue';

import { voteApiService } from '@/services/vote-api-service';
import { messageApiService } from '@/services/message-api-service';
import { userService } from '@/services/user-service';

export default {
  props: {
    message: Object,
    questionCreator: Number
  },
  components: {
    Viewer,
    VoteCounter,
    BIconCheckCircleFill
  },
  data() {
    return {
      dateFormat: { year: 'numeric', month: 'long', day: 'numeric' },
      currentUserId: userService.getCurrent().id
    };
  },
  methods: {
    upvote(messageId) {
      voteApiService.upvote(messageId).then((voteChanged) => {
        if (voteChanged) this.message.votesCount++;
      });
    },
    downvote(messageId) {
      voteApiService.downvote(messageId).then((voteChanged) => {
        if (voteChanged) this.message.votesCount--;
      });
    },
    acceptAnswer() {
      messageApiService.acceptAnswer(this.message.id).then(() => {
        this.message.accepted = true;
      });
    }
  }
};
</script>

<style scoped>
.message-item {
  border-top: lightgray 2px solid;
  padding: 15px 0;
}
.vote-section {
  text-align: center;
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
