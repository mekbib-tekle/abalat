const rootURL = process.env.REACT_APP_API_URL;
export const get = async (url: string) => {
  const response = await fetch(rootURL + url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API request failed with status code ${response.status} - ${data.error}`);
  }

  return data;
};

export const post = async (url: string, body: any) => {
  const response = await fetch(rootURL + url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();

  return data;
};

export const handleLogout = async () => {
  try {
    // TODO change this endpoint to /logout, handle response
    await fetch(rootURL + '/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    localStorage.removeItem('authToken');
    window.location.href = '/';
  } catch (error) {
    console.error('Error fetching users:', error);
    // setError(error);
    localStorage.removeItem('authToken');
  }
}