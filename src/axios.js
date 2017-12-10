import axios from 'axios';

var app_axios = axios.create({
    baseURL: 'http://absolution.hl.edi.teebrb.net:4434'
});

export default app_axios;