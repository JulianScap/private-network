import { format, createLogger, transports } from 'winston';

import Config from './Config.js';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${Config.backEndUri} | ${level} | ${message}`;
});

const timestampFormat = 'YY/MM/DD HH:mm:ss';

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: timestampFormat,
        }),
        customFormat,
      ),
    }),
    // new transports.File({
    //   format: combine(
    //     timestamp({
    //       format: timestampFormat,
    //     }),
    //     customFormat,
    //   ),
    //   filename: 'logs/combined.log',
    // }),
  ],
});

const Logger = {
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
};

export default Logger;
