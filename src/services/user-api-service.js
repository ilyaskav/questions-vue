import { localStorageService } from './local-storage-service';

export const userApiService = {
  getById(id) {
    const collection = this.getAll();
    return collection.find(u => u.id === id) || null;
  },
  getAll() {
    return localStorageService.get('users');
  }
};
