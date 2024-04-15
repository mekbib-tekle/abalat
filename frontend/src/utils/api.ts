const BASE_URL = 'http://localhost:8000/';

export const get = async (url: string) => {
    const response = await fetch(BASE_URL + url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    const data = await response.json();

    return data;
};

export const handleLogout = async () => {
    try {
      // TODO change this endpoint to /logout, handle response
      await fetch(BASE_URL + 'auth/profile', {
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