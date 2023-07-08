import dotenv from 'dotenv';

const parsed = dotenv.config().parsed;

export default {
  all: parsed,
  domain: parsed.domain,
};
