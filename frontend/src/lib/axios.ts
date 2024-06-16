import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5550/api', // Adjust the baseURL according to your Flask backend
});

export default instance;
