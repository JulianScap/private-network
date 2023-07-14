export const post = async (route, body, authenticated = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
  }

  return fetch(`${import.meta.env.VITE_BACKEND}/${route}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((r) => r.json());
};

export const get = async (route, authenticated = true) => {
  const headers = {};

  if (authenticated) {
    headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
  }

  return fetch(`${import.meta.env.VITE_BACKEND}/${route}`, { headers }).then((r) => r.json());
};
