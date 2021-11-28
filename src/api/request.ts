import axios from 'axios'
import { get_token } from '../utils/auth'
import { remove_token } from "../utils/auth";

const instance = axios.create({
    baseURL: '',
    timeout: 6000
})

// 请求拦截器
instance.interceptors.request.use(config => {
    if (get_token()) {
        config.headers['token'] = get_token()
    }
    config.headers['Content-Type'] = 'application/json'
    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    if (401 == error.response.status) {
        remove_token();
        window.location = '/login';
    } else {
        return Promise.reject(error)
    }
})

export default instance