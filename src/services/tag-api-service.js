import { localStorageService } from './local-storage-service';

export const tagApiService = {
  getById(id) {

  },
  getAll() {
    return localStorageService.get('tags');
  }
};
