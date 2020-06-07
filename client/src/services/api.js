import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-eb87ef03-fabc-42eb-9543-21d44d03d810.ws-us02.gitpod.io/'
});

export default api;