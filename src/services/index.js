import {
    get,
    post,
    del,
    update,
    uploadFile,
    ipandport
} from '../utils/index'


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
//报修流程
export async function repairstep(params) {
    return post(`${ipandport}/equipmentRepair/queryByEquipmentId`, params);
}
//修改维修负责人
export async function modifyRepairUser(params) {
    return post(`${ipandport}/equipmentRepair/modifyRepairUser`, params);
}

//新增通知公告
export async function broadsave(params) {
    return post(`${ipandport}/sysAnnouncement/save`, params);
}
//通知公告列表
export async function broadqueryList(params) {
    return post(`${ipandport}/sysAnnouncement/queryList`, params);
}
//通知公告列表
export async function broadqueryById(params) {
    return post(`${ipandport}/sysAnnouncement/queryById`, params);
}

export async function getChildren(params) {
    return post(`${ipandport}/equipmentRepair/getChildren`, params);
}

export async function uploadImg(params) {
    return uploadFile(`${ipandport}/common/uploadImg`, params);
}

export async function uploadFiles(params) {
    return uploadFile(`${ipandport}/common/uploadFile`, params);
}
export async function repairApply(params) {
    return post(`${ipandport}/equipmentRepair/repairApply`, params);
}

export async function repairList(params) {
    return post(`${ipandport}/equipmentRepair/queryList`, params);
}

export async function repairMyList(params) {
    return post(`${ipandport}/equipmentRepair/queryMyList`, params);
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

export async function queryKnowledgeByFaultId(params) {
    return post(`${ipandport}/equipmentKnowledgeBase/queryKnowledgeByFaultId`, params);
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
//论坛帖子列表
export async function ChatqueryList(params) {
    return post(`${ipandport}/equipmentForum/queryList`, params);
}

//论坛
export async function ChatqueryListByForumId(params) {
    return post(`${ipandport}/equipmentForumComment/queryListByForumId`, params);
}


export async function spareasksave(params) {
    return post(`${ipandport}/sparePartsApply/save`, params);
}

export async function sparerevert(params) {
    return post(`${ipandport}/userSpareParts/queryList`, params);
}

export async function sparelog(params) {
    return post(`${ipandport}/sparePartsRecord/queryList`, params);
}

export async function sparelogdetail(params) {
    return post(`${ipandport}/sparePartsRecord/queryById`, params);
}

export async function spareowner(params) {
    return post(`${ipandport}/userSpareParts/queryAllList`, params);
}

export async function spareownerdetail(params) {
    return post(`${ipandport}/sparePartsConsume/queryPageByUserIdAndSpareId`, params);
}

export async function sparechangemission(params) {
    return post(`${ipandport}/equipmentSparePartsReplace/queryList`, params);
}

export async function sparechangemissiondetail(params) {
    return post(`${ipandport}/equipmentSparePartsReplace/queryById`, params);
}

export async function sparechangestart(params) {
    return post(`${ipandport}/equipmentSparePartsReplace/startReplace`, params);
}

export async function sparechangefinish(params) {
    return post(`${ipandport}/equipmentSparePartsReplace/finishReplace`, params);
}


export async function sparechangehistory(params) {
    return post(`${ipandport}/equipmentSparePartsReplaceHis/queryList`, params);
}

export async function sparechangehistorydetail(params) {
    return post(`${ipandport}/equipmentSparePartsReplaceHis/queryById`, params);
}

export async function spareusage(params) {
    return post(`${ipandport}/sparePartsConsume/queryList`, params);
}

export async function spareusagedetail(params) {
    return post(`${ipandport}/sparePartsConsume/queryById`, params);
}

export async function sparereview(params) {
    return post(`${ipandport}/sparePartsApply/queryList`, params);
}

export async function sparereviewdetail(params) {
    return post(`${ipandport}/sparePartsApply/queryById`, params);
}

export async function spareaudit(params) {
    return post(`${ipandport}/sparePartsApply/audit`, params);
}

export async function knowledgelist(params) {
    return post(`${ipandport}/equipmentKnowledgeBase/queryList`, params);
}

export async function knowledgedetail(params) {
    return post(`${ipandport}/equipmentKnowledgeBase/queryById`, params);
}

export async function knowledgehistory(params) {
    return post(`${ipandport}/equipmentKnowledgeBaseVersion/queryList`, params);
}

export async function knowledgehisdetail(params) {
    return post(`${ipandport}/equipmentKnowledgeBaseVersion/queryById`, params);
}

export async function noticetodo(params) {
    return post(`${ipandport}/assignmentUserExecute/queryMyTaskToDoList`, params);
}

export async function noticetododetail(params) {
    return post(`${ipandport}/assignmentUserExecute/queryDetail`, params);
}

export async function noticetodostart(params) {
    return post(`${ipandport}/assignmentUserExecute/start`, params);
}

export async function noticetodosubmit(params) {
    return post(`${ipandport}/assignmentUserExecute/submit`, params);
}

export async function noticetoconfirm(params) {
    return post(`${ipandport}/assignmentUserExecute/queryMyAuditTaskList`, params);
}

export async function noticefinish(params) {
    return post(`${ipandport}/assignmentUserExecute/queryMyFinishList`, params);
}

export async function publish(params) {
    return post(`${ipandport}/sysAssignment/save`, params);
}

export async function publishtodo(params) {
    return post(`${ipandport}/sysAssignment/queryNotFinishList`, params);
}

export async function publishtododetail(params) {
    return post(`${ipandport}/sysAssignment/queryDetail`, params);
}

export async function publishaudit(params) {
    return post(`${ipandport}/assignmentUserExecute/audit`, params);
}

export async function publishtoconfirm(params) {
    return post(`${ipandport}/assignmentUserExecute/queryMyAuditList`, params);
}

export async function publishfinish(params) {
    return post(`${ipandport}/sysAssignment/queryFinishList`, params);
}

export async function sparerecall(params) {
    return post(`${ipandport}/sparePartsApply/recall`, params);
}

export async function minenum(params) {
    return post(`${ipandport}/equipment/queryTaskNum`, params);
}

export async function overview(params) {
    return post(`${ipandport}/equipment/queryAllTask`, params);
}

export async function homenum(params) {
    return post(`${ipandport}/equipment/queryHome`, params);
}

export async function queryOEE(params) {
    return post(`${ipandport}/equipmentRepairHis/queryOEE`, params);
}

export async function queryJIA(params) {
    return post(`${ipandport}/equipmentRepairHis/queryJIA`, params);
}

export async function queryMTTR(params) {
    return post(`${ipandport}/equipmentRepairHis/queryMTTR`, params);
}

export async function queryMTBF(params) {
    return post(`${ipandport}/equipmentRepairHis/queryMTBF`, params);
}

export async function changePassword(params) {
    return post(`${ipandport}/sysAccount/changePassword`, params);
}

export async function getcode(params) {
    return post(`${ipandport}/sysAccount/sendVerificationCode`, params);
}

export async function verycode(params) {
    return post(`${ipandport}/sysAccount/repareVerificationCode`, params);
}

export async function reparePassword(params) {
    return post(`${ipandport}/sysAccount/reparePassword`, params);
}

export async function checkById(params) {
    return post(`${ipandport}/equipment/checkById`, params);
}

export async function checkRepairById(params) {
    return post(`${ipandport}/equipment/checkRepairById`, params);
}