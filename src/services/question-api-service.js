import { localStorageService } from './local-storage-service';
import { userService } from './user-service';
import { count } from './helpers';

export const questionApiService = {
  getById(id) {
    const collection = this.getAll();
    const question = collection.find((item) => item.id === id);
    if (!question) return null;

    const allMessages = localStorageService.get('messages', []);
    question.message = allMessages.find((m) => m.questionId === question.id && m.initial === true);
    question.answersCount = count(allMessages, (m) => m.questionId === question.id && !m.initial);

    const allVotes = localStorageService.get('votes');
    question.votesCount = count(allVotes, (v) => v.messageId === question.message.id && v.isUpvote === true);

    return question;
  },
  getQuestionWithAnswers(id) {
    const question = this.getById(id);
    if (question === null) {
      return Promise.reject(new Error('Question with that id was not found'));
    }

    const allMessages = localStorageService.get('messages');
    if (allMessages) {
      question.answers = allMessages.filter(m => m.questionId === question.id && !m.initial);
    }

    const allUsers = localStorageService.get('users');
    if (allUsers) {
      question.creator = allUsers.find(u => u.id === question.creatorId);
    }

    const allVotes = localStorageService.get('votes');
    question.answers.forEach((a) => {
      a.creator = allUsers.find(u => u.id === a.creatorId);
      a.votesCount = count(allVotes, (v) => v.messageId === a.id && v.isUpvote === true);
    });

    return Promise.resolve(question);
  },
  save(post) {
    post.tags = saveTags(post.tags);

    if (post.id) {
      localStorageService.edit('questions', post);
    } else {
      post.creatorId = userService.getCurrent().id;
      post.creationDate = new Date();
      post.id = localStorageService.add('questions', post);
    }

    post.message.questionId = post.id;
    saveMessage(post.message);
  },
  getAll() {
    return localStorageService.get('questions', []);
  },
  getQuesionsList() {
    const allQuestions = this.getAll();
    const allUsers = localStorageService.get('users');
    const allMessages = localStorageService.get('messages');
    const allVotes = localStorageService.get('votes');

    allQuestions.forEach((q) => {
      const initialMessage = allMessages.find(m => m.questionId === q.id && m.initial === true);

      q.creator = allUsers.find(u => u.id === q.creatorId);
      q.answersCount = count(allMessages, (m) => m.questionId === q.id && !m.initial);
      q.votesCount = count(allVotes, (v) => v.messageId === initialMessage.id && v.isUpvote === true);
    });

    return allQuestions;
  },
  delete(id) {
    const question = this.getById(id);

    if (question.creatorId !== userService.getCurrent().id) {
      return Promise.reject(new Error('Only author can delete a question'));
    }

    deleteVotesByMessageId(question.messageId);
    deleteMessagesByQuestionId(question.id);

    const questions = this.getAll();
    const questionsWithoutRemoved = questions.filter(q => q.id !== question.id);
    localStorageService.set('questions', questionsWithoutRemoved);

    return Promise.resolve();
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

function saveMessage(message) {
  if (message.id) {
    const messages = localStorageService.get('messages');
    const messageFromStorage = messages.find(m => m.id === message.id);
    if (!message) throw Error(`Message with id: ${message.id} was not found`);

    messageFromStorage.text = message.text;

    return localStorageService.edit('messages', messageFromStorage);
  } else {
    message.initial = true;
    message.creatorId = userService.getCurrent().id;
    message.creationDate = new Date();

    return localStorageService.add('messages', message);
  }
}

function deleteVotesByMessageId(messageId) {
  const votes = localStorageService.get('votes');
  const votesWithoutRemoved = votes.filter(v => v.messageId !== messageId);

  localStorageService.set('votes', votesWithoutRemoved);
}

function deleteMessagesByQuestionId(questionId) {
  const messages = localStorageService.get('messages');
  const messagesWithoutRemoved = messages.filter(m => m.questionId !== questionId);

  localStorageService.set('messages', messagesWithoutRemoved);
}
