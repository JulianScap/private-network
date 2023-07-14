import { DocumentStore } from 'ravendb';

const store = new DocumentStore('http://localhost:8080', 'privateNetwork');
store.initialize();

const DB = {
  openSession: () => store.openSession(),
};

export default DB;
