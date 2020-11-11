import { localStorageService } from './local-storage-service';

export const tagApiService = {
  getAll() {
    return localStorageService.get('tags');
  }
};
