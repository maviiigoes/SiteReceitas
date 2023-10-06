import axios from 'axios'


const api = axios.create({
    baseURL: 'www.themealdb.com/api/json/v1/1/'
});

export default api;