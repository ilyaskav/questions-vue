import { localStorageService } from './local-storage-service';

export const messageApiService = {
  getById(id) {
    const collection = this.getAll();

    return collection.find((item) => item.id === id) || null;
  },
  save(message) {
    if (message.id) {
      localStorageService.edit('messages', message);
    } else {
      const id = localStorageService.add('messages', message);
      message.id = id;
    }

    return message;
  },
  getAll() {
    return localStorageService.get('messages');
  }
};
