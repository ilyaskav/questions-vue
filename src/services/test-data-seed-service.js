import { localStorageService } from './local-storage-service';

export default {
  seed() {
    this.insertTags();
    this.insertUsers();
    this.insertQuestions();
    this.insertMessages();
    this.insertVotes();
  },
  insertTags() {
    const tags = [{
      id: 1,
      name: 'general'
    },
    {
      id: 2,
      name: 'build-system'
    }];

    localStorageService.set('tags', tags);
  },
  insertUsers() {
    const users = [
      {
        id: 1,
        name: 'Ilya',
        surname: 'Skavronsliy'
      },
      {
        id: 2,
        name: 'Joe',
        surname: 'Doe'
      },
      {
        id: 3,
        name: 'Jane',
        surname: 'Black'
      }
    ];

    localStorageService.set('users', users);
    sessionStorage.setItem('CURRENT_USER_ID', 1);
  },
  insertQuestions() {
    const questions = [
      {
        id: 1,
        question: 'Как мне увидеть оповещения о вопросе?',
        creator: 'Ilya Skavronskiy',
        creationDate: new Date(),
        votesCount: 1,
        answersCount: 2,
        tags: [{ id: 1, name: 'general' }],
        messageId: 1
      },
      {
        id: 2,
        question: 'Как часто вы выдаете билды в тестинг?',
        creator: 'Ilya Skavronskiy',
        creationDate: new Date(),
        votesCount: 2,
        answersCount: 0,
        tags: [{ id: 2, name: 'build-system' }],
        messageId: 2
      }
    ];

    localStorageService.set('questions', questions);
  },
  insertMessages() {
    const messages = [
      {
        id: 1,
        text: 'A?',
        questionId: 1,
        creationDate: new Date(),
        creatorId: 1
      },
      {
        id: 2,
        text: '???',
        questionId: 2,
        creationDate: new Date(),
        creatorId: 1
      }
    ];

    localStorageService.set('messages', messages);
  },
  insertVotes() {
    const votes = [
      {
        id: 1,
        questionId: 1,
        userId: 1,
        isUpvote: true
      },
      {
        id: 2,
        questionId: 2,
        userId: 2,
        isUpvote: true
      },
      {
        id: 3,
        questionId: 2,
        userId: 3,
        isUpvote: true
      }
    ];

    localStorageService.set('votes', votes);
  }
};
