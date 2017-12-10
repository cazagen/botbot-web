import axios from 'axios';

var app_axios = axios.create({
    baseURL: 'https://imaginary.botbot.on.teebrb.net'
})

export default app_axios;