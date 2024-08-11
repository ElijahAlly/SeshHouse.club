import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'https://sesh-house-koa-server-production.up.railway.app/api', // prod is https://sesh-house-koa-server-production.up.railway.app/api and dev is http://localhost:3000/api
});

export default instance;