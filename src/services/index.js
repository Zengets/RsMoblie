import {
    get,
    post,
    del,
    update,
    uploadFile
} from '../utils/index'
let ipandport = 'http://29i2k99452.zicp.vip' //xiangzige 'http://2622536c3m.zicp.vip:16591' //liziyuan  


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

export async function infodeviceche(params) {
    return post(`${ipandport}/equipmentPointCheckItemTask/queryAppList`, params);
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

export async function repairApply(params) {
    return post(`${ipandport}/equipmentRepair/repairApply`, params);
}

export async function repairList(params) {
    return post(`${ipandport}/equipmentRepair/queryList`, params);
}

export async function repairHisList(params) {
    return post(`${ipandport}/equipmentRepairHis/queryList`, params);
}

export async function getRepairDetail(params) {
    return post(`${ipandport}/equipmentRepair/getRepairDetail`, params);
}
export async function repairStart(params) {
    return post(`${ipandport}/equipmentRepair/repairStart`, params);
}

export async function repairFinish(params) {
    return post(`${ipandport}/equipmentRepair/repairFinish`, params);
}

export async function repairCheck(params) {
    return post(`${ipandport}/equipmentRepair/repairCheck`, params);
}

export async function upkeeplan(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/queryAppOfMonth`, params);
}

export async function upkeeplandetail(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/queryAppById`, params);
}

export async function upkeepmission(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/queryAppList`, params);
}

export async function upkeepmissiondetail(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/queryAppToExcuteById`, params);
}

export async function upkeephistory(params) {
    return post(`${ipandport}/equipmentMaintainBillExecute/queryAppList`, params);
}

export async function upkeephistorydetail(params) {
    return post(`${ipandport}/equipmentMaintainBillExecute/queryAppToExcuteById`, params);
}

//startAppMaintain,finishAppMaintain,closeAppMaintain,updateAppMaintainUser,queryAppByEqId
export async function startAppMaintain(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/startAppMaintain`, params);
}

export async function finishAppMaintain(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/finishAppMaintain`, params);
}

export async function closeAppMaintain(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/closeAppMaintain`, params);
}

export async function updateAppMaintainUser(params) {
    return post(`${ipandport}/equipmentMaintainBillToExecute/updateAppMaintainUser`, params);
}

export async function queryAppByEqId(params) {
    return post(`${ipandport}/userEquipment/queryAppByEqId`, params);
}

export async function checkdetail(params) {
    return post(`${ipandport}/equipmentPointCheckItemTask/queryAppByEquipId`, params);
}

export async function checkaction(params) {
    return post(`${ipandport}/equipmentPointCheckItemTask/checkApp`, params);
}

export async function checkhistory(params) {
    return post(`${ipandport}/equipmentPointCheckItemDayTask/queryAppList`, params);
}

export async function checkhistorydetail(params) {
    return post(`${ipandport}/equipmentPointCheckItemTask/queryAppHis`, params);
}

export async function checkerror(params) {
    return post(`${ipandport}/equipmentPointCheckException/queryAppList`, params);
}

export async function checkerrordetail(params) {
    return post(`${ipandport}/equipmentPointCheckException/queryAppById`, params);
}

export async function checkIgnore(params) {
    return post(`${ipandport}/equipmentPointCheckException/checkIgnore`, params);
}

export async function checkRepair(params) {
    return post(`${ipandport}/equipmentPointCheckException/checkRepair`, params);
}

export async function checkRepairAfter(params) {
    return post(`${ipandport}/equipmentPointCheckException/checkRepairAfter`, params);
}

export async function errortohis(params) {
    return post(`${ipandport}/equipmentPointCheckItemTask/queryAppExceptionToHis`, params);
}
