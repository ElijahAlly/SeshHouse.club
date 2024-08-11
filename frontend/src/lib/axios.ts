import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sesh-house-koa-server-production.up.railway.app/api', // prod is https://sesh-house-koa-server-production.up.railway.app/api and dev is http://localhost:3000/api
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

export default instance;