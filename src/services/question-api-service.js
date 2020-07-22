import { localStorageService } from './local-storage-service';
import { count } from './helpers';

export const questionApiService = {
  getById(id) {
    const collection = this.getAll();
    const question = collection.find((item) => item.id === id);
    if (!question) return null;

    const allMessages = localStorageService.get('messages', []);
    question.message = allMessages.find((m) => m.id === question.messageId);
    question.answersCount = count(allMessages, (m) => m.questionId === id && !m.initial);

    return question;
  },
  getQuestionWithAnswers(id) {
    const question = this.getById(id);
    if (question === null) throw new Error('Question with that id was not found');

    const allAnswers = localStorageService.get('messages');
    if (allAnswers) {
      question.answers = allAnswers.filter(a => a.questionId === id);
    }

    return question;
  },
  save(post) {
    post.tags = saveTags(post.tags);

    if (post.id) {
      localStorageService.edit('questions', post);
    } else {
      localStorageService.add('questions', post);
    }
  },
  getAll() {
    return localStorageService.get('questions', []);
  }
};

function saveTags(tags) {
  if (!tags) return [];

  tags.forEach(tag => {
    if (!tag.id) {
      tag.id = localStorageService.add('tags', tag);
    }
  });

  return tags;
}
