import process from 'node:process';

const {
  BACK_END_URI,
  FRONT_END_URI,
  DATABASE_NAME,
  DATABASE_URI,
  BE_PORT,
  BE_HOST,
  PRIVATE_KEY_PATH,
  PUBLIC_KEY_PATH,
} = process.env;

const Config = {
  backEndUri: BACK_END_URI,
  frontEndUri: FRONT_END_URI,
  databaseName: DATABASE_NAME,
  databaseUri: DATABASE_URI,
  host: BE_HOST,
  port: BE_PORT,
  privateKeyPath: PRIVATE_KEY_PATH,
  publicKeyPath: PUBLIC_KEY_PATH,
};

export default Config;
