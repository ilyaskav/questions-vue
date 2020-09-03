import { localStorageService } from './local-storage-service';
import { userService } from './user-service';

export const messageApiService = {
  getById(id) {
    const collection = this.getAll();
    const message = collection.find((item) => item.id === id) || null;

    if (message !== null) {
      message.creator = getUser(message.creatorId);
    }

    return Promise.resolve(message);
  },
  save(message) {
    if (message.id) {
      localStorageService.edit('messages', message);
    } else {
      message.creationDate = new Date();
      message.creatorId = userService.getCurrent().id;

      const id = localStorageService.add('messages', message);
      message.id = id;
    }

    return Promise.resolve(this.getById(message.id));
  },
  getAll() {
    return localStorageService.get('messages');
  },
  acceptAnswer(answerId) {
    const collection = this.getAll();

    return this.getById(answerId).then((message) => {
      const questionAlreadyHasAcceptedAnswer = collection.some(m => m.questionId === message.questionId && m.accepted);
      if (questionAlreadyHasAcceptedAnswer) return Promise.reject(new Error('Question already has accepted answer'));

      message.accepted = true;

      return this.save(message);
    });
  }
};

function getUser(id) {
  const users = localStorageService.get('users');
  return users.find(u => u.id === id) || null;
}
