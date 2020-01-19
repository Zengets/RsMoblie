import {
    get,
    post,
    del,
    update,
    uploadFile
} from '../utils/index'
let ipandport = 'http://172.21.3.124:8080'

export async function login(params) {
    return post(`${ipandport}/sysUser/sendVerificationCode`, params);
}


