import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust the baseURL according to your Flask backend
});

export default instance;
