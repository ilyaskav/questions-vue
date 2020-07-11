const MIN_ID = 1;

export const sortByIdDesc = (a, b) => {
  return (b.id - a.id);
};

export const getNextId = (collection) => {
  if (!Array.isArray(collection)) throw new Error('Please provide an array');
  if (collection.length === 0) throw new Error('Collection is empty');

  const sortedCollection = collection.sort(sortByIdDesc);

  return (sortedCollection && sortedCollection[0].id + 1) || MIN_ID;
};
