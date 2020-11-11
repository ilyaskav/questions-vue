import { localStorageService } from './local-storage-service';

export const userService = {
  getCurrent() {
    const currentUserId = +sessionStorage.getItem('CURRENT_USER_ID');
    if (!currentUserId) throw new Error('Current user is not defined');

    const allUsers = localStorageService.get('users');

    return allUsers.find(u => u.id === currentUserId);
  }
};
