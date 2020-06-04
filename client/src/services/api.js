import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-b083205e-bd15-46df-885f-26760ef5475d.ws-eu01.gitpod.io'
});

export default api;