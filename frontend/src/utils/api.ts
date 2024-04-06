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

