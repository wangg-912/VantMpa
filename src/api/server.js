import request from "@/utils/requests";

/**
 * @description GET方法
 * @param null
 */
export const getNoParam = () => {
    return request({
        url: "/platform/permission/menu/tree",
        method: "get"
    });
};
/**
 * @description GET方法
 * @param {Object} param
 */
export const getAutoParam = (params) => {
    return request({
        url: "/test/123",
        method: "get",
        params
    });
}

/**
 * @description GET方法
 * @param {Object} param
 */
export const getInfo = param => {
    return request({
        url: "/bpmx/bpmImage",
        method: "get",
        params: param,
        responseType: "arraybuffer",
        transformRequest: [
            data => {
                let ret = "";
                for (let it in data) {
                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
                }
                return ret;
            }
        ]
    });
};
/**
 * @description POST 方法
 * @param null
 */
export const postNoParam = () => {
    return request({
        url: "/xx/yy",
        method: "post"
    });
};
/**
 * @description POST 方法
 * @param {Object} data
 */
export const postParam = data => {
    return request({
        url: "/xx/yy",
        method: "post",
        data
    });
};

/**
 * @deprecated POST 方法表单方式提交
 * @param {Object} data
 */
export const postForm = data => {
    return request({
        url: "/xx/yy",
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
                }
                return ret;
            }
        ]

    });
};

/**
 * @description GET方式导出接收参数（POST同理）
 * @param {String|Number} id
 */
export const exportExcel = id => {
    return request({
        url: "/xx/yy/" + id,
        method: "get",
        responseType: "blob"
    });
};
/**
 * @description PUT方法
 * @param {Object} data
 */
export const putParam = data => {
    return request({
        url: "/xx/yy",
        data,
        method: "put"
    });
};
/**
 * @description DELETE方法
 * @param {String|Number} id
 */
export const deleteParam = id => {
    return request({
        url: "/xx/yy/" + id,
        method: "delete"
    });
};
