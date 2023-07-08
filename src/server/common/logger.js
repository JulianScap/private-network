import { format, createLogger, transports } from 'winston';

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), customFormat),
  transports: [new transports.Console(), new transports.File({ filename: 'logs/combined.log' })],
});

export default {
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
};
