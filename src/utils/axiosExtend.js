import Qs from 'qs';
import axios from 'axios';
/**
 * @description 客户端Request请求等待
 */
export const pendingRequest = new Map();

export function generateReqKey(config) {
    const { method, url, params, data } = config;
    return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}
/**
 * @description 添加客户端请求等待
 * @param config 配置参数
 */
export function addPendingRequest(config) {
    const requestKey = generateReqKey(config);
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel);
            }
        });
}
/**
 * @description 移除客户端等待
 * @param config any 配置参数
 */
export function removePendingRequest(config) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
        const cancel = pendingRequest.get(requestKey);
        cancel(requestKey);
        pendingRequest.delete(requestKey);
    }
}
