import { localStorageService } from './local-storage-service';
import { dbTables } from './constansts';

export default {
  seed() {
    this.insertTags();
    this.insertUsers();
    this.insertQuestions();
    this.insertMessages();
    this.insertVotes();
  },
  clean() {
    Object.values(dbTables).forEach((tableName) => {
      localStorageService.del(tableName);
    });
  },
  initialDataIsLoaded() {
    return Object.values(dbTables).every((tableName) => localStorageService.exists(tableName));
  },
  insertTags() {
    const tags = [{
      id: 1,
      name: 'general'
    },
    {
      id: 2,
      name: 'build-system'
    },
    {
      id: 3,
      name: 'javascript'
    }];

    localStorageService.set(dbTables.TAGS, tags);
  },
  insertUsers() {
    const users = [
      {
        id: 1,
        name: 'Ilya',
        surname: 'Skavronskiy'
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
      },
      {
        id: 4,
        name: 'James',
        surname: 'Smith'
      }
    ];

    localStorageService.set(dbTables.USERS, users);
    sessionStorage.setItem('CURRENT_USER_ID', 2);
  },
  insertQuestions() {
    const questions = [
      {
        id: 1,
        question: 'Как мне увидеть оповещения о вопросе?',
        creatorId: 1,
        creationDate: new Date(2020, 5, 2),
        tags: [{ id: 1, name: 'general' }]
      },
      {
        id: 2,
        question: 'Как часто вы выдаете билды в тестинг?',
        creatorId: 1,
        creationDate: new Date(2020, 8, 11),
        tags: [{ id: 2, name: 'build-system' }]
      },
      {
        id: 3,
        question: 'Почему стрелочные функции не работают в качестве методов?',
        creatorId: 2,
        creationDate: new Date(2020, 7, 25),
        tags: [{ id: 3, name: 'javascript' }]
      },
      {
        id: 4,
        question: 'Зачем заполнять описание work log-a в джире?',
        creatorId: 3,
        creationDate: new Date(2020, 6, 11),
        tags: [{ id: 1, name: 'general' }]
      }
    ];

    localStorageService.set(dbTables.QUESTIONS, questions);
  },
  insertMessages() {
    const messages = [
      {
        id: 1,
        text: '?',
        questionId: 1,
        creationDate: new Date(2020, 5, 2),
        creatorId: 3,
        initial: true,
        accepted: false
      },
      {
        id: 2,
        text: 'Итого ответ - оповещения о вопросе получают подписанные на спейс пользователи JIRA',
        questionId: 1,
        creationDate: new Date(2020, 5, 4),
        creatorId: 3,
        initial: false,
        accepted: true
      },
      {
        id: 3,
        text: 'Есть ли какие-то общие рекомендации на этот счет?',
        questionId: 2,
        creationDate: new Date(2020, 8, 11),
        creatorId: 1,
        initial: true,
        accepted: false
      },
      {
        id: 4,
        text: 'Вопрос к менеджерам - какой в этом смысл, их все равно никто не читает.',
        questionId: 4,
        creationDate: new Date(2020, 6, 11),
        creatorId: 3,
        initial: true,
        accepted: false
      },
      {
        id: 5,
        text: `Подскажите пожалуйста, не могу понять почему этот код не работает:

        'use strict';
        var obj = {
          i: 10,
          b: () => console.log(this.i, this)
        }
        obj.b(); // prints undefined, Window {...}
        `,
        questionId: 3,
        creationDate: new Date(2020, 7, 25),
        creatorId: 2,
        initial: true,
        accepted: false
      }
    ];

    localStorageService.set(dbTables.MESSAGES, messages);
  },
  insertVotes() {
    const votes = [
      {
        id: 1,
        messageId: 2,
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
        messageId: 1,
        userId: 4,
        isUpvote: true
      }
    ];

    localStorageService.set(dbTables.VOTES, votes);
  }
};
