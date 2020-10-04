const MIN_ID = 1;

export const sortByIdDesc = (a, b) => {
  return (b.id - a.id);
};

export const getNextId = (collection) => {
  if (!Array.isArray(collection)) throw new Error('Please provide an array');
  if (collection.length === 0) return MIN_ID;

  const sortedCollection = collection.sort(sortByIdDesc);

  return (sortedCollection && sortedCollection[0].id + 1) || MIN_ID;
};

export const count = (arr, predicate) => {
  let itemsCount = 0;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const itemFits = predicate(element);

    if (itemFits) itemsCount++;
  }

  return itemsCount;
};
