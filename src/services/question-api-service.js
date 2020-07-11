import { localStorageService } from './local-storage-service';

export const questionApiService = {
  getById(id) {

  },
  save(post) {

  },
  getAll() {
    return localStorageService.get('questions');
  }
};
