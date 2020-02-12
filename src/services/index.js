import {
    get,
    post,
    del,
    update,
    uploadFile
} from '../utils/index'
let ipandport = 'http://2622536c3m.zicp.vip:16591'

export async function test(params) {
    return post(`${ipandport}/test/query`, params);
}


