// prod is https://sesh-house-koa-server-production.up.railway.app/api and dev is http://localhost:3000/api

const BASE_URL = 'https://sesh-house-koa-server-production.up.railway.app/api';

const instance = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', params: string, body: object | null = null): Promise<any> => {
    const headers: HeadersInit = {};

    // Set Content-Type header if body is provided
    headers['Content-Type'] = 'application/json';

    const response = await fetch(BASE_URL + (params ? params : ''), {
        method,
        body: body ? JSON.stringify(body) : null,
        credentials: 'omit',
        headers
    });

    if (!response.ok) {
        const errorText = await response.text(); // or response.json() if response is JSON
        throw new Error(`HTTP error! Status: ${response.status}. ${errorText}`);
    }

    return response.json();
}

export default instance;