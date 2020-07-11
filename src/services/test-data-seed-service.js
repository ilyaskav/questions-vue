import { localStorageService } from './local-storage-service';

export default {
  seed() {
    this.insertTags();
    this.insertQuestions();
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
  insertQuestions() {
    const questions = [
      {
        id: 1,
        question: 'Как мне увидеть оповещения о вопросе?',
        creator: 'Ilya Skavronskiy',
        creationDate: new Date(),
        votesCount: 1,
        answersCount: 2,
        tags: [{ id: 1, name: 'general' }]
      },
      {
        id: 2,
        question: 'Как часто вы выдаете билды в тестинг?',
        creator: 'Ilya Skavronskiy',
        creationDate: new Date(),
        votesCount: 2,
        answersCount: 0,
        tags: [{ id: 2, name: 'build-system' }]
      }
    ];

    localStorageService.set('questions', questions);
  }
};
