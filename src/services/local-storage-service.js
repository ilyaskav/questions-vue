import { getNextId } from './helpers';

export const localStorageService = {
  get(key, defaultValue = null) {
    const rawValue = localStorage.getItem(key);

    if (rawValue === null) {
      return defaultValue;
    }

    const parsedValue = JSON.parse(rawValue, JSON.dateParser);

    return parsedValue || defaultValue;
  },
  set(key, value) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },
  add(key, value) {
    const collection = this.get(key);
    const nextId = getNextId(collection);

    value.id = nextId;

    collection.push(value);
    this.set(key, collection);

    return value.id;
  },
  edit(key, newValue) {
    if (!newValue.id) throw new Error('Item id is not set');

    const collection = this.get(key);
    const editedItemIndex = collection.findIndex(i => i.id === newValue.id);

    collection[editedItemIndex] = newValue;

    this.set(key, collection);
  },
  del(key) {
    localStorage.removeItem(key);
  }
};

if (window.JSON && !window.JSON.dateParser) {
  var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var reMsAjax = /^\/Date\((d|-|.*)\)[/|\\]$/;

  JSON.dateParser = function (key, value) {
    if (typeof value === 'string') {
      var a = reISO.exec(value);
      if (a) {
        return new Date(value);
      }
      a = reMsAjax.exec(value);
      if (a) {
        var b = a[1].split(/[-+,.]/);
        return new Date(b[0] ? +b[0] : 0 - +b[1]);
      }
    }
    return value;
  };
}
