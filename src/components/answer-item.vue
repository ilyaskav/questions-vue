<template>
  <div class="message-item">
    <div class="row">
      <div class="col-md-1 vote-section">
        <vote-counter
          :votes="message.votesCount"
          @vote-up="upvote(message.messageId)"
          @vote-down="downvote(message.messageId)"
        ></vote-counter>
        <b-button
          size="sm"
          variant="outline-success"
          class="rounded-circle px-1 py-0"
          @click="acceptAnswer()"
          v-bind:class="{ 'btn-success': message.accepted }"
        >
          <b-icon-check2></b-icon-check2>
        </b-button>
      </div>
      <div class="col-md-11">
        <div>
          {{message.creator.name }} {{ message.creator.surname}} &bull;
          <span>{{message.creationDate.toLocaleDateString('en-gb', dateFormat)}}</span>
        </div>
        <div class="message-description">
          <viewer :initialValue="message.text"></viewer>
        </div>
        <div v-if="message.creatorId === currentUserId">
          <b-button @click="$emit('on-edit', message.id)" variant="link">Edit</b-button>&bull;
          <b-button @click="$emit('on-remove', message.id)" variant="link">Delete</b-button>
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
import { BIconCheck2 } from 'bootstrap-vue';

import { voteApiService } from '@/services/vote-api-service';
import { messageApiService } from '@/services/message-api-service';
import { userService } from '@/services/user-service';

export default {
  props: {
    message: Object
  },
  components: {
    Viewer,
    VoteCounter,
    BIconCheck2
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
}
.vote-section {
  text-align: center;
}
</style>
