import axios from "axios";
import { Notify } from "vant";
import { addPendingRequest, removePendingRequest } from './axiosExtend';

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基本网址
    withCredentials: true, // 凭证 Cookie
    timeout: 6000 // 请求超时
});

// 异常拦截处理器
const errorHandler = (error) => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
        console.log('取消同时间内重复请求：' + error.message);
    } else {
        const { response, message } = error;
        if (response && !response.data) {
            const { status, data } = response;
            handleCode(status, data.msg || message);
            return Promise.reject(error);
        } else {
            let { message } = error;
            if (message === 'Network Error') {
                message = '网络错误，请检查网络！';
            }
            if (message.includes('timeout')) {
                message = '请求服务超时！';
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3);
                message = '服务接口' + code + '异常';
            }
            Notify({ type: "warning", message: message || `服务接口未知异常` });
            return Promise.reject(error);
        }
    }
};

const handleCode = (code, msg) => {
    switch (code) {
        case 400:
            Notify({ type: "warning", message: '请求类型错误，请检查请求参数！' });
            break;
        case 404:
            Notify({ type: "warning", message: '请求不存在，服务器无法操作！' });
            break;
        case 405:
            Notify({ type: "warning", message: '请求协议错误' });
            break;
        case 500:
            Notify({ type: "warning", message: '服务器发生错误！' });
            break;
        case 502:
            Notify({ type: "warning", message: '服务器网关错误！' });
            break;
        case 503:
            Notify({ type: "warning", message: '服务器暂时过载或维护！' });
            break;
        case 504:
            Notify({ type: "warning", message: '服务器网关超时！' });
            break;
        default:
            Notify({ type: "warning", message: msg || '未知异常，请稍后再试！' });
            break;
    }
};

request.interceptors.request.use(
    (config) => {
        /**
         * removePendingRequest 检查是否存在重复请求，若存在则取消已发的请求
         * addPendingRequest 把当前请求添加到pendingRequest对象中
         */
        removePendingRequest(config);
        addPendingRequest(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
request.interceptors.response.use((response) => {
    removePendingRequest(response.config); // 从pendingRequest对象中移除请求
    const { data, headers, statusText, status } = response;
    if (statusText == "OK" &&
        status == 200 &&
        headers &&
        headers["content-type"] == "image/png"
    ) {
        return (
            "data:image/png;base64," +
            btoa(
                new Uint8Array(data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            )
        );


    }
    if (!data.success && status == 200) {
        Notify({ type: "warning", message: "服务器应答出错！" });
        return Promise.reject(new Error(data.message || "Error"));
    }
    return response;
}, errorHandler);



export default request;
