import axios from 'axios'
const service = axios.create({
    // baseURL: process.env.VUE_APP_URL, // api的base_url
    timeout: 10000 // 请求超时时间
});
// console.log(process.env.API_ROOT)
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    });
service.interceptors.response.use( // 响应拦截利用axios拦截器实现拦截状态401代表重新登录
    response => {
        // console.log(response)
        return response.data;
    },
    error => {
        console.log(error)
        // if (error.response.data) {
        return Promise.reject(error)
        // }

    });
export default service