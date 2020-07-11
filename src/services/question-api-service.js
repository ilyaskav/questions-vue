import { localStorageService } from './local-storage-service';

export const questionApiService = {
  getById(id) {

  },
  save(post) {
    post.tags = saveTags(post.tags);

    localStorageService.add('questions', post);
  },
  getAll() {
    return localStorageService.get('questions');
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
