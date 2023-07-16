import { DocumentStore } from 'ravendb';
import { v4 } from 'uuid';

import { badRequest } from './response.js';
import Logger from './Logger.js';
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
  const newId = v4();
  if (!collection) {
    Logger.warn(`No collection specified for ${JSON.stringify(entity)}`);
    return newId;
  }

  return `${collection}/${newId}`;
};

store.initialize();

const DB = {
  openSession: () => store.openSession(),
};

export default DB;
