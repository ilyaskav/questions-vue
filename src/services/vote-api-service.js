import { localStorageService } from './local-storage-service';
import { userService } from './user-service';

export const voteApiService = {
  getByMessageId(messageId, userId = null) {
    if (!messageId) throw new Error('messageId is missing');

    const collection = this.getAll();
    const vote = collection.find(v => v.questionId === messageId
      && (v.userId === userId || userService.getCurrent().id));

    return vote || null;
  },
  upvote(messageId) {
    return new Promise((resolve, reject) => {
      const voteChanged = vote(messageId, true);
      resolve(voteChanged);
    });
  },
  downvote(messageId) {
    return new Promise((resolve, reject) => {
      const voteChanged = vote(messageId, false);
      resolve(voteChanged);
    });
  },
  getAll() {
    return localStorageService.get('votes');
  }
};

function vote(messageId, isUpvote) {
  const currentUser = userService.getCurrent();
  let vote = voteApiService.getByMessageId(messageId, currentUser.id);

  if (vote) {
    if (vote.isUpvote === isUpvote) return false;

    vote.isUpvote = isUpvote;
    localStorageService.edit('votes', vote);
  } else {
    vote = {
      questionId: messageId,
      userId: currentUser.id,
      isUpvote: isUpvote
    };
    localStorageService.add('votes', vote);
  }

  return true;
}
