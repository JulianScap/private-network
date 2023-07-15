import { DocumentStore } from 'ravendb';
import { v4 } from 'uuid';

import { badRequest } from './response.js';
import Logger from './Logger.js';

const store = new DocumentStore('http://localhost:8080', 'privateNetwork');

store.conventions.documentIdGenerator = (_, entity) => {
  Logger.info(entity);

  if (!entity) {
    badRequest('Cannot save a null object');
  }

  if (typeof entity.id === 'string') {
    return entity.id;
  }

  const collection = entity['@metadata']?.['@collection'];
  const newId = v4();
  if (!collection) {
    return newId;
  }

  return `${collection}/${newId}`;
};

store.initialize();

const DB = {
  openSession: () => store.openSession(),
};

export default DB;
