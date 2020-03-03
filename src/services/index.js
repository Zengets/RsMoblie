import {
    get,
    post,
    del,
    update,
    uploadFile
} from '../utils/index'
let ipandport = 'http://29i2k99452.zicp.vip' //xiangzige  'http://2622536c3m.zicp.vip:16591' //liziyuan 


export async function test(params) {
    return post(`${ipandport}/test/query`, params);
}

export async function login(params) {
    return post(`${ipandport}/sysAccount/applogin`, params);
}

export async function logout(params) {
    return post(`${ipandport}/sysAccount/applogout`, params);
}

//Info-device
export async function infodevice(params) {
    return post(`${ipandport}/equipment/queryList`, params);
}

export async function infodevicecan(params) {
    return post(`${ipandport}/equipment/queryAppApplyRepairList`, params);
}

export async function infodevicedetail(params) {
    return post(`${ipandport}/equipment/queryById`, params);
}

export async function deviceuser(params) {
    return post(`${ipandport}/userEquipment/queryAppByEquipId`, params);
}

export async function deviceuserlist(params) {
    return post(`${ipandport}/userEquipment/queryAppList`, params);
}

export async function userlist(params) {
    return post(`${ipandport}/sysUser/queryList`, params);
}

export async function userlistdetail(params) {
    return post(`${ipandport}/sysUser/queryByUserId`, params);
}

export async function infospare(params) {
    return post(`${ipandport}/spareParts/queryList`, params);
}

export async function infosparedetail(params) {
    return post(`${ipandport}/spareParts/queryById`, params);
}

export async function department(params) {
    return post(`${ipandport}/sysDepartment/queryFirstTree`, params);
}

export async function departmentmore(params) {
    return post(`${ipandport}/sysDepartment/queryChildrenById`, params);
}

export async function shopgrouplist(params) {
    return post(`${ipandport}/sysShop/queryAppList`, params);
}

export async function getshoplist(params) {
    return post(`${ipandport}/sysGroup/queryByShopId`, params);
}

export async function getuserspare(params) {
    return post(`${ipandport}/spareParts/queryListByWarnNoticeUserId`, params);
}

export async function repairstep(params) {
    return post(`${ipandport}/equipmentRepair/queryByEquipmentId`, params);
}

export async function getChildren(params) {
    return post(`${ipandport}/equipmentRepair/getChildren`, params);
}

export async function uploadImg(params) {
    return uploadFile(`${ipandport}/common/uploadImg`, params);
}






































