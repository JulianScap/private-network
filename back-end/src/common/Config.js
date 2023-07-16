import Logger from './Logger.js';

const { BACK_END_URI, FRONT_END_URI, DATABASE_NAME, DATABASE_URI, BE_PORT } = process.env;

const Config = {
  backEndUri: BACK_END_URI,
  frontEndUri: FRONT_END_URI,
  databaseName: DATABASE_NAME,
  databaseUri: DATABASE_URI,
  port: BE_PORT,
};

Logger.info(`Configuration ${JSON.stringify(Config, null, 2)}`);

export default Config;