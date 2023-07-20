import { DocumentStore } from 'ravendb';
import { randomUUID } from 'node:crypto';

import { badRequest } from './response.js';
import Config from './Config.js';

const store = new DocumentStore(Config.databaseUri, Config.databaseName);

store.conventions.documentIdGenerator = (_, entity) => {
  if (!entity) {
    badRequest('Cannot save a null object');
  }

  if (typeof entity.id === 'string') {
    return entity.id;
  }

  const collection = entity['@metadata']?.['@collection'];
  if (!collection) {
    throw `No collection specified for ${JSON.stringify(entity)}`;
  }

  return `${collection}_${randomUUID()}`;
};

store.initialize();

const DB = {
  openSession: () => store.openSession(),
};

export default DB;
