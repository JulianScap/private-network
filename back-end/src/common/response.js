const toResponse = (body, message, error = false) => {
  const type = typeof body;
  if (typeof body === 'string') {
    return {
      error,
      message: body,
    };
  } else if (type === 'undefined') {
    return {
      error,
      message: message || (error ? 'Something did not happen as expected' : '❤️'),
    };
  } else {
    return {
      error,
      message,
      body,
    };
  }
};

export const ok = (context, body, message) => {
  const response = toResponse(body, message);

  context.status = 200;
  context.body = response;
};

export const badRequest = (body, message) => {
  const response = toResponse(body, message, true);
  throw {
    handle: true,
    status: 400,
    response,
  };
};

export const forbidden = () => {
  const response = toResponse('Unauthorized', null, true);
  throw {
    handle: true,
    status: 401,
    response,
  };
};

export const conflict = (message) => {
  const response = toResponse(message || 'This action has been blocked', null, true);
  throw {
    handle: true,
    status: 409,
    response,
  };
};

export const internalServerError = (context) => {
  context.status = 500;
  context.body = toResponse('Something went south', null, true);
};
