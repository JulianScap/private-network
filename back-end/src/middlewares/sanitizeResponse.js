import Logger from '../common/Logger.js';

function sanitize(target, depth = 0) {
  if (depth > 20 || typeof target !== 'object') {
    return;
  }

  if (Array.isArray(target)) {
    target.forEach((item) => sanitize(item, depth + 1));
    return;
  }

  const keys = Object.keys(target);

  for (const key of keys.filter((x) => x !== '@metadata')) {
    sanitize(target[key], depth + 1);
  }

  delete target['@metadata'];
  delete target['__PROJECTED_NESTED_OBJECT_TYPES__'];
}

export const sanitizeResponse = async (context, next) => {
  await next();

  if (!context.state.sanitize && context.response.body) {
    Logger.info('Not Sanitizing');
    return;
  }

  Logger.info('Sanitizing');
  sanitize(context.response.body);
};
