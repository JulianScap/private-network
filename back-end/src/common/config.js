import dotenv from 'dotenv';

const parsed = dotenv.config().parsed;

const Config = {
  all: parsed,
  domain: parsed.DOMAIN,
  frontEnd: parsed.FRONT_END,
};

export default Config;
