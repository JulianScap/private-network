const internalFetch = async (route, body, authenticated, method) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
  }

  const response = await fetch(`${import.meta.env.VITE_BACK_END}/${route}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return await response.json();
};

export const post = (route, body, authenticated = true) => {
  return internalFetch(route, body, authenticated, 'POST');
};

export const put = (route, body, authenticated = true) => {
  return internalFetch(route, body, authenticated, 'PUT');
};

export const get = async (route, body = null, authenticated = true) => {
  return internalFetch(route, body, authenticated, 'GET');
};
