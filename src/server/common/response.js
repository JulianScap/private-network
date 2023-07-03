const toResponse = (body, message, error) => {
  const type = typeof body;
  if (typeof body === 'string') {
    return {
      error,
      message: body,
    };
  } else if (type === 'undefined') {
    return {
      error,
      message: message || 'Something did not happen as expected',
    };
  } else {
    return {
      error,
      message,
      body,
    };
  }
};

export const badRequest = (context, body, message) => {
  const response = toResponse(body, message, true);

  context.status = 400;
  context.body = response;
};

export const Ok = (context, body, message) => {
  const response = toResponse(body, message, false);

  context.status = 200;
  context.body = response;
};
