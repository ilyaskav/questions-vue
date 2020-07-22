import { localStorageService } from './local-storage-service';
import { userService } from './user-service';

export const voteApiService = {
  getById(id) {

  },
  getByQuestionId(questionId, userId = null) {
    const collection = this.getAll();
    const vote = collection.find(v => v.questionId === questionId
      && (v.userId === userId || userService.getCurrent()));

    return vote || null;
  },
  upvote(questionId) {
    return new Promise((resolve, reject) => {
      const voteChanged = vote(questionId, true);
      resolve(voteChanged);
    });
  },
  downvote(questionId) {
    return new Promise((resolve, reject) => {
      const voteChanged = vote(questionId, false);
      resolve(voteChanged);
    });
  },
  getAll() {
    return localStorageService.get('votes');
  }
};

function vote(questionId, isUpvote) {
  const currentUser = userService.getCurrent();
  let vote = voteApiService.getByQuestionId(questionId, currentUser.id);

  if (vote) {
    if (vote.isUpvote === isUpvote) return false;

    vote.isUpvote = isUpvote;
    localStorageService.edit('votes', vote);
  } else {
    vote = {
      questionId: questionId,
      userId: currentUser.id,
      isUpvote: isUpvote
    };
    localStorageService.add('votes', vote);
  }

  return true;
}
