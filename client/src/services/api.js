import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-ac2b6eba-81d4-40a1-a662-e4ad48c8928c.ws-eu01.gitpod.io/'
});

export default api;