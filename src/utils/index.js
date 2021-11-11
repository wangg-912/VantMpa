/**
 * @description 函数防抖: 解决refresh频繁刷新
 * use import {debounce} from '@/utils/format'
 * debounce(fun,delay)
 * @param { Function } func 
 * @param { String|Number } delay 
 * @returns 
 */
export function debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearInterval(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
/**
 * @description 格式化时间
 * use formatDate((new Date()),'yyyy-MM-dd hh:mm:ss') => 2020-11-18 19:44:48
 * @param { Date } time 
 * @param { String } fmt 
 * @returns 
 */
export function formatDate(time, fmt) {
    let date = new Date(time)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : prefixZero(str)
            )
        }
    }
    return fmt
}
function prefixZero(str) {
    return ('00' + str).substr(str.length)
}
/**
 * @description 根据url获取配置参数
 * @returns 
 */
export function getQueryUrl() {
    let currentPageUrl = location.href;
    if (!currentPageUrl.includes('?')) return {};
    let params = currentPageUrl.split("?")[1].split("&")
    let obj = {}
    params.map(v => obj[v.split("=")[0]] = v.split("=")[1]);
    return obj;
}

/**
 * @description 是否是空对象
 * @param { Any } obj 
 * @returns 
 */
export function isEmptyObject(obj) {
    let tmp = Object.keys(obj);
    return tmp.length == 0;
}
/* ======================================Extend=========================================== */
