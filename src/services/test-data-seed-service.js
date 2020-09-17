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
    sessionStorage.setItem('CURRENT_USER_ID', 2);
  },
  insertQuestions() {
    const questions = [
      {
        id: 1,
        question: 'Как мне увидеть оповещения о вопросе?',
        creatorId: 1,
        creationDate: new Date(),
        votesCount: 1,
        tags: [{ id: 1, name: 'general' }],
        messageId: 1
      },
      {
        id: 2,
        question: 'Как часто вы выдаете билды в тестинг?',
        creatorId: 1,
        creationDate: new Date(),
        votesCount: 2,
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
      },
      {
        id: 3,
        text: 'Clarification - I am a table',
        questionId: 1,
        creationDate: new Date(),
        creatorId: 1
      },
      {
        id: 4,
        text: 'So why cant you ?',
        questionId: 1,
        creationDate: new Date(),
        creatorId: 2
      }
    ];

    localStorageService.set('messages', messages);
  },
  insertVotes() {
    const votes = [
      {
        id: 1,
        messageId: 1,
        userId: 1,
        isUpvote: true
      },
      {
        id: 2,
        messageId: 2,
        userId: 2,
        isUpvote: true
      },
      {
        id: 3,
        messageId: 2,
        userId: 3,
        isUpvote: true
      }
    ];

    localStorageService.set('votes', votes);
  }
};
