import Logger from '../common/Logger.js';

export const logRequest = async (ctx, next) => {
  const { request } = ctx;
  const { method, url } = request;
  Logger.info(`${method} | ${url} - START`);
  const start = new Date();
  try {
    await next();
  } finally {
    const duration = new Date() - start;
    Logger.info(`${method} | ${url} - END - ${duration / 1000}s`);
  }
};
