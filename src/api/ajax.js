//axios二次封装
import axios from 'axios'
//引入进度条
import nProgress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'
const requests = axios.create({
    //基础路径
    baseURL: '/api',
    //请求超时的时间
    timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //config对象里面有一个很重要的属性,Header请求头
    if(store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done();
    return res.data;
},(error) => {
    return Promise.reject(new Error('fail'))
})

export default requests