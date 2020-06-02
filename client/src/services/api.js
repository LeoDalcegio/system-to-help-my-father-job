import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-bc01d320-f757-41bd-a6f8-f84907e35ff5.ws-us02.gitpod.io/api'
});

export default api;