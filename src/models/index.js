import {
    test, login, logout,
    infodevice, infodevicecan, infodeviceche, infodevicedetail, deviceuser, deviceuserlist, getshoplist,
    infospare, sparerevert, infosparedetail, department, shopgrouplist, departmentmore, repairstep, modifyRepairUser, broadsave, uploadImg,
    userlist, userlistdetail, getuserspare, getChildren, repairApply, repairList, repairHisList, repairStart, repairCheck, repairFinish, getRepairDetail, spareaudit, sparerecall, publishaudit,
    upkeeplan, upkeeplandetail, upkeepmission, upkeepmissiondetail, upkeephistory, upkeephistorydetail,
    startAppMaintain, finishAppMaintain, closeAppMaintain, updateAppMaintainUser, queryAppByEqId, checkdetail, checkaction, checkhistory, checkhistorydetail, errortohis, sparechangemission, sparechangemissiondetail, sparechangestart, sparechangefinish, sparechangehistory, sparechangehistorydetail, checkerror, checkerrordetail, checkIgnore, checkRepair, checkRepairAfter, spareasksave, sparelog, sparelogdetail, spareowner, spareownerdetail, spareusage, spareusagedetail, sparereview, sparereviewdetail,
    knowledgelist, knowledgedetail, knowledgehistory, knowledgehisdetail, noticetodo, noticetododetail, noticetodostart, noticetodosubmit, minenum, overview, broadqueryList, broadqueryById,
    noticetoconfirm, noticefinish, publish, publishtodo, publishtododetail, publishtoconfirm, publishfinish,
    homenum, queryOEE, queryJIA, queryMTTR, queryMTBF, changePassword, getcode, verycode, reparePassword,
    checkRepairById, checkById, queryKnowledgeByFaultId, ChatqueryList, ChatqueryListByForumId,ChatdeleteById,
    queryListByParentId,replysave

} from '../services/index'
export default {
    namespace: 'index',
    state: {
        title: "default",
        userInfo: {},
        chartdata: {},
        userAccount: {},
        userTime: 1,
        token: 1,
        homenum: {},
        infodevice: {},
        sparechangemission: {},
        sparechangehistory: {},
        noticetodo: {},
        publishtodo: {},
        noticetoconfirm: {},
        publishtoconfirm: {},
        noticefinish: {},
        minenum: {},
        publishfinish: {},
        spareusage: {},
        sparereview: {},
        knowledgelist: {},
        knowledgehistory: {},
        knowledgedetail: {},
        knowledgehisdetail: {},
        infodevicecan: {},
        infodeviceche: {},
        infospare: {},
        sparerevert: {},
        sparelog: {},
        spareowner: {},
        spareownerdetail: {},
        sparereviewdetail: {},
        noticetododetail: {},
        publishtododetail: {},
        infodevicedetail: {},
        infodeviceauth: [],
        queryKnowledgeByFaultId: [],
        checkhistorydetail: {},
        errortohis: {},
        checkerrordetail: {},
        userlistdetail: {},
        infosparedetail: {},
        userlist: [],
        deviceuser: [],
        deviceuserlist: {},
        department: [],
        overview: {},
        shopgrouplist: [],
        departmentmore: [],
        repairstep: null,
        spareData: {},
        repairList: {},
        broadqueryList: {},
        ChatqueryList: {},
        ChatqueryListByForumId: {},
        broadqueryById: {},
        repairHisList: {},
        upkeeplan: {},
        upkeeplandetail: {},
        upkeepmission: {},
        upkeepmissiondetail: {},
        upkeephistory: {},
        checkhistory: {},
        checkerror: {},
        upkeephistorydetail: {},
        sparechangemissiondetail: {},
        sparechangehistorydetail: {},
        spareusagedetail: {},
        queryListByParentId:[],
        checkdetail: {},
        sparelogdetail: {},
        queryAppByEqId: [],
        repairApply: "",
        res: {},
        res2: {},
        formdata: [],
        submitdata: [],
        executeUserIdList: [],
        sendUserIdList: [],
        getshoplist: [],
        getChildren: [],
        getuserspare: [],
        uploadImg: [],
        modifyRepairUser: [],
        broadsave: [],
        done: "0",
        verycode: {}
    },
    effects: {
        *login({ payload }, { call, put }) {//data
            const responese = yield call(login, payload);
            let userInfo = responese.data.user ? responese.data.user : {};
            userInfo.username = payload.accountName;
            userInfo.password = payload.password;
            yield put({
                type: 'updateState',
                payload: { userInfo: userInfo }
            })
            yield put({
                type: 'updateState',
                payload: { userAccount: responese.data.appTree ? responese.data.appTree : {} }
            })
            yield put({
                type: 'updateState',
                payload: { userTime: responese.data.time ? responese.data.time : 1 }
            })
            yield put({
                type: 'updateState',
                payload: { token: responese.data.token ? responese.data.token : 1 }
            })
            return responese.code == "0000"
        },
        *logout({ payload }, { call, put }) {//data
            const responese = yield call(logout, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            yield put({
                type: 'updateState',
                payload: { token: 1 }
            })
            return responese.code == "0000"
        },
        *homenum({ payload }, { call, put }) {//data
            const responese = yield call(homenum, payload);
            yield put({
                type: 'updateState',
                payload: { homenum: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *queryOEE({ payload }, { call, put }) {//data
            const responese = yield call(queryOEE, payload);
            yield put({
                type: 'updateState',
                payload: { chartdata: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *queryJIA({ payload }, { call, put }) {//data
            const responese = yield call(queryJIA, payload);
            yield put({
                type: 'updateState',
                payload: { chartdata: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *queryMTTR({ payload }, { call, put }) {//data
            const responese = yield call(queryMTTR, payload);
            yield put({
                type: 'updateState',
                payload: { chartdata: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *queryMTBF({ payload }, { call, put }) {//data
            const responese = yield call(queryMTBF, payload);
            yield put({
                type: 'updateState',
                payload: { chartdata: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *infodevice({ payload }, { call, put }) {//data
            const responese = yield call(infodevice, payload);
            yield put({
                type: 'updateState',
                payload: { infodevice: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangemission({ payload }, { call, put }) {//data
            const responese = yield call(sparechangemission, payload);
            yield put({
                type: 'updateState',
                payload: { sparechangemission: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangehistory({ payload }, { call, put }) {//data
            const responese = yield call(sparechangehistory, payload);
            yield put({
                type: 'updateState',
                payload: { sparechangehistory: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *noticetodo({ payload }, { call, put }) {//data
            const responese = yield call(noticetodo, payload);
            yield put({
                type: 'updateState',
                payload: { noticetodo: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *publishtodo({ payload }, { call, put }) {//data
            const responese = yield call(publishtodo, payload);
            yield put({
                type: 'updateState',
                payload: { publishtodo: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *noticetoconfirm({ payload }, { call, put }) {//data
            const responese = yield call(noticetoconfirm, payload);
            yield put({
                type: 'updateState',
                payload: { noticetoconfirm: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *publishtoconfirm({ payload }, { call, put }) {//data
            const responese = yield call(publishtoconfirm, payload);
            yield put({
                type: 'updateState',
                payload: { publishtoconfirm: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *noticefinish({ payload }, { call, put }) {//data
            const responese = yield call(noticefinish, payload);
            yield put({
                type: 'updateState',
                payload: { noticefinish: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *minenum({ payload }, { call, put }) {//data
            const responese = yield call(minenum, payload);
            yield put({
                type: 'updateState',
                payload: { minenum: responese.data ? responese.data.dataList : {} }
            })
            return responese.code == "0000"
        },
        *overview({ payload }, { call, put }) {//data
            const responese = yield call(overview, payload);
            yield put({
                type: 'updateState',
                payload: { overview: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *publishfinish({ payload }, { call, put }) {//data
            const responese = yield call(publishfinish, payload);
            yield put({
                type: 'updateState',
                payload: { publishfinish: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *spareusage({ payload }, { call, put }) {//data
            const responese = yield call(spareusage, payload);
            yield put({
                type: 'updateState',
                payload: { spareusage: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparereview({ payload }, { call, put }) {//data
            const responese = yield call(sparereview, payload);
            yield put({
                type: 'updateState',
                payload: { sparereview: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *knowledgelist({ payload }, { call, put }) {//data
            const responese = yield call(knowledgelist, payload);
            yield put({
                type: 'updateState',
                payload: { knowledgelist: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *knowledgehistory({ payload }, { call, put }) {//data
            const responese = yield call(knowledgehistory, payload);
            yield put({
                type: 'updateState',
                payload: { knowledgehistory: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *infodevicecan({ payload }, { call, put }) {//data
            const responese = yield call(infodevicecan, payload);
            yield put({
                type: 'updateState',
                payload: { infodevicecan: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *infodeviceche({ payload }, { call, put }) {//data
            const responese = yield call(infodeviceche, payload);
            yield put({
                type: 'updateState',
                payload: { infodeviceche: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *infospare({ payload }, { call, put }) {//data
            const responese = yield call(infospare, payload);
            yield put({
                type: 'updateState',
                payload: { infospare: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparerevert({ payload }, { call, put }) {//data
            const responese = yield call(sparerevert, payload);
            yield put({
                type: 'updateState',
                payload: { sparerevert: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparelog({ payload }, { call, put }) {//data
            const responese = yield call(sparelog, payload);
            yield put({
                type: 'updateState',
                payload: { sparelog: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *spareowner({ payload }, { call, put }) {//data
            const responese = yield call(spareowner, payload);
            yield put({
                type: 'updateState',
                payload: { spareowner: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *spareownerdetail({ payload }, { call, put }) {//data
            const responese = yield call(spareownerdetail, payload);
            yield put({
                type: 'updateState',
                payload: { spareownerdetail: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparereviewdetail({ payload }, { call, put }) {//data
            const responese = yield call(sparereviewdetail, payload);
            yield put({
                type: 'updateState',
                payload: { sparereviewdetail: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },

        *deviceuser({ payload }, { call, put }) {//data
            const responese = yield call(deviceuser, payload);
            yield put({
                type: 'updateState',
                payload: { deviceuser: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *queryKnowledgeByFaultId({ payload }, { call, put }) {//data
            const responese = yield call(queryKnowledgeByFaultId, payload);
            yield put({
                type: 'updateState',
                payload: { queryKnowledgeByFaultId: responese.data ? responese.data.page : [] }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : [] }
            })
            return responese.code == "0000"
        },
        *infodevicedetail({ payload }, { call, put }) {//data
            const responese = yield call(infodevicedetail, payload);
            yield put({
                type: 'updateState',
                payload: { infodevicedetail: responese.data ? responese.data.data : {} }
            })
            yield put({
                type: 'updateState',
                payload: { infodeviceauth: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *noticetododetail({ payload }, { call, put }) {//data
            const responese = yield call(noticetododetail, payload);
            yield put({
                type: 'updateState',
                payload: { noticetododetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *publishtododetail({ payload }, { call, put }) {//data
            const responese = yield call(publishtododetail, payload);
            yield put({
                type: 'updateState',
                payload: { publishtododetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *checkhistorydetail({ payload }, { call, put }) {//data
            const responese = yield call(checkhistorydetail, payload);
            yield put({
                type: 'updateState',
                payload: { checkhistorydetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *errortohis({ payload }, { call, put }) {//data
            const responese = yield call(errortohis, payload);
            yield put({
                type: 'updateState',
                payload: { errortohis: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *checkerrordetail({ payload }, { call, put }) {//data
            const responese = yield call(checkerrordetail, payload);
            yield put({
                type: 'updateState',
                payload: { checkerrordetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },

        *userlist({ payload }, { call, put }) {//data
            const responese = yield call(userlist, payload);
            yield put({
                type: 'updateState',
                payload: { userlist: responese.data ? responese.data.dataList : [] }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : [] }
            })
            return responese.code == "0000"
        },

        *deviceuserlist({ payload }, { call, put }) {//data
            const responese = yield call(deviceuserlist, payload);
            yield put({
                type: 'updateState',
                payload: { deviceuserlist: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },

        *userlistdetail({ payload }, { call, put }) {//data
            const responese = yield call(userlistdetail, payload);
            yield put({
                type: 'updateState',
                payload: { userlistdetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *getuserspare({ payload }, { call, put }) {//data
            const responese = yield call(getuserspare, payload);
            yield put({
                type: 'updateState',
                payload: { getuserspare: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *infosparedetail({ payload }, { call, put }) {//data
            const responese = yield call(infosparedetail, payload);
            yield put({
                type: 'updateState',
                payload: { infosparedetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *department({ payload }, { call, put }) {//data
            const responese = yield call(department, payload);
            yield put({
                type: 'updateState',
                payload: { department: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *shopgrouplist({ payload }, { call, put }) {//data
            const responese = yield call(shopgrouplist, payload);
            yield put({
                type: 'updateState',
                payload: { shopgrouplist: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },

        *departmentmore({ payload }, { call, put }) {//data
            const responese = yield call(departmentmore, payload);
            yield put({
                type: 'updateState',
                payload: { departmentmore: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *getshoplist({ payload }, { call, put }) {//data

            const responese = yield call(getshoplist, payload);
            yield put({
                type: 'updateState',
                payload: { getshoplist: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *getChildren({ payload }, { call, put }) {//data
            const responese = yield call(getChildren, payload);
            yield put({
                type: 'updateState',
                payload: { getChildren: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *repairstep({ payload }, { call, put }) {//data
            const responese = yield call(repairstep, payload);
            yield put({
                type: 'updateState',
                payload: { res2: responese.data ? responese.data : {} }
            })
            yield put({
                type: 'updateState',
                payload: { repairstep: responese.data.repair ? responese.data.repair : null }//维修信息
            })
            yield put({
                type: 'updateState',
                payload: { spareData: responese.data.spareData ? responese.data.spareData : null }//维修信息
            })
            return responese.code == "0000"
        },
        *getRepairDetail({ payload }, { call, put }) {//data
            const responese = yield call(getRepairDetail, payload);
            yield put({
                type: 'updateState',
                payload: { res2: responese.data ? responese.data : {} }
            })
            yield put({
                type: 'updateState',
                payload: { repairstep: responese.data.detail ? responese.data.detail : null }//维修信息
            })
            yield put({
                type: 'updateState',
                payload: { spareData: responese.data.spareData ? responese.data.spareData : null }//维修信息
            })
            return responese.code == "0000"
        },

        *repairApply({ payload }, { call, put }) {//data
            const responese = yield call(repairApply, payload);
            yield put({
                type: 'updateState',
                payload: { repairApply: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *repairStart({ payload }, { call, put }) {//data
            const responese = yield call(repairStart, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *spareasksave({ payload }, { call, put }) {//data
            const responese = yield call(spareasksave, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *repairFinish({ payload }, { call, put }) {//data
            const responese = yield call(repairFinish, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *changePassword({ payload }, { call, put }) {//data
            const responese = yield call(changePassword, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *repairCheck({ payload }, { call, put }) {//data 
            const responese = yield call(repairCheck, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *ChatqueryList({ payload }, { call, put }) {//data
            const responese = yield call(ChatqueryList, payload);
            yield put({
                type: 'updateState',
                payload: { ChatqueryList: responese?.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese?.data ? responese?.data : {} }
            })
            return responese?.code == "0000"
        },
        *ChatqueryListByForumId({ payload }, { call, put }) {//data
            const responese = yield call(ChatqueryListByForumId, payload);
            yield put({
                type: 'updateState',
                payload: { ChatqueryListByForumId: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *queryListByParentId({ payload }, { call, put }) {//data
            const responese = yield call(queryListByParentId, payload);
            yield put({
                type: 'updateState',
                payload: { queryListByParentId: responese.data ? responese.data.dataList : {} }
            })
            return responese.code == "0000"
        },
        *broadqueryList({ payload }, { call, put }) {//data
            const responese = yield call(broadqueryList, payload);
            yield put({
                type: 'updateState',
                payload: { broadqueryList: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *broadqueryById({ payload }, { call, put }) {//data
            const responese = yield call(broadqueryById, payload);
            yield put({
                type: 'updateState',
                payload: { broadqueryById: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *repairList({ payload }, { call, put }) {//data
            const responese = yield call(repairList, payload);
            yield put({
                type: 'updateState',
                payload: { repairList: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *repairHisList({ payload }, { call, put }) {//data
            const responese = yield call(repairHisList, payload);
            yield put({
                type: 'updateState',
                payload: { repairHisList: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeeplan({ payload }, { call, put }) {//data
            const responese = yield call(upkeeplan, payload);
            yield put({
                type: 'updateState',
                payload: { upkeeplan: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeeplandetail({ payload }, { call, put }) {//data
            const responese = yield call(upkeeplandetail, payload);
            yield put({
                type: 'updateState',
                payload: { upkeeplandetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeepmissiondetail({ payload }, { call, put }) {//data
            const responese = yield call(upkeepmissiondetail, payload);
            yield put({
                type: 'updateState',
                payload: { upkeepmissiondetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeepmission({ payload }, { call, put }) {//data
            const responese = yield call(upkeepmission, payload);
            yield put({
                type: 'updateState',
                payload: { upkeepmission: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeephistorydetail({ payload }, { call, put }) {//data
            const responese = yield call(upkeephistorydetail, payload);
            yield put({
                type: 'updateState',
                payload: { upkeephistorydetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangemissiondetail({ payload }, { call, put }) {//data
            const responese = yield call(sparechangemissiondetail, payload);
            yield put({
                type: 'updateState',
                payload: { sparechangemissiondetail: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangehistorydetail({ payload }, { call, put }) {//data
            const responese = yield call(sparechangehistorydetail, payload);
            yield put({
                type: 'updateState',
                payload: { sparechangehistorydetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *spareusagedetail({ payload }, { call, put }) {//data
            const responese = yield call(spareusagedetail, payload);
            yield put({
                type: 'updateState',
                payload: { spareusagedetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *knowledgedetail({ payload }, { call, put }) {//data
            const responese = yield call(knowledgedetail, payload);
            yield put({
                type: 'updateState',
                payload: { knowledgedetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *knowledgehisdetail({ payload }, { call, put }) {//data
            const responese = yield call(knowledgehisdetail, payload);
            yield put({
                type: 'updateState',
                payload: { knowledgehisdetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *checkdetail({ payload }, { call, put }) {//data
            const responese = yield call(checkdetail, payload);
            yield put({
                type: 'updateState',
                payload: { checkdetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *sparelogdetail({ payload }, { call, put }) {//data
            const responese = yield call(sparelogdetail, payload);
            yield put({
                type: 'updateState',
                payload: { sparelogdetail: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *checkaction({ payload }, { call, put }) {//data
            const responese = yield call(checkaction, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *upkeephistory({ payload }, { call, put }) {//data
            const responese = yield call(upkeephistory, payload);
            yield put({
                type: 'updateState',
                payload: { upkeephistory: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkhistory({ payload }, { call, put }) {//data
            const responese = yield call(checkhistory, payload);
            yield put({
                type: 'updateState',
                payload: { checkhistory: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkerror({ payload }, { call, put }) {//data
            const responese = yield call(checkerror, payload);
            yield put({
                type: 'updateState',
                payload: { checkerror: responese.data ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangestart({ payload }, { call, put }) {//data
            const responese = yield call(sparechangestart, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparechangefinish({ payload }, { call, put }) {//data
            const responese = yield call(sparechangefinish, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *startAppMaintain({ payload }, { call, put }) {//data
            const responese = yield call(startAppMaintain, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *finishAppMaintain({ payload }, { call, put }) {//data
            const responese = yield call(finishAppMaintain, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *noticetodostart({ payload }, { call, put }) {//data
            const responese = yield call(noticetodostart, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *noticetodosubmit({ payload }, { call, put }) {//data
            const responese = yield call(noticetodosubmit, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *getcode({ payload }, { call, put }) {//data
            const responese = yield call(getcode, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *reparePassword({ payload }, { call, put }) {//data
            const responese = yield call(reparePassword, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *verycode({ payload }, { call, put }) {//data
            const responese = yield call(verycode, payload);
            yield put({
                type: 'updateState',
                payload: { verycode: responese.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },

        *closeAppMaintain({ payload }, { call, put }) {//data
            const responese = yield call(closeAppMaintain, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *updateAppMaintainUser({ payload }, { call, put }) {//data
            const responese = yield call(updateAppMaintainUser, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkIgnore({ payload }, { call, put }) {//data
            const responese = yield call(checkIgnore, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkRepair({ payload }, { call, put }) {//data
            const responese = yield call(checkRepair, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkRepairAfter({ payload }, { call, put }) {//data
            const responese = yield call(checkRepairAfter, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *spareaudit({ payload }, { call, put }) {//data
            const responese = yield call(spareaudit, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *sparerecall({ payload }, { call, put }) {//data
            const responese = yield call(sparerecall, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *publishaudit({ payload }, { call, put }) {//data
            const responese = yield call(publishaudit, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *publish({ payload }, { call, put }) {//data
            const responese = yield call(publish, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkRepairById({ payload }, { call, put }) {//data
            const responese = yield call(checkRepairById, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *checkById({ payload }, { call, put }) {//data
            const responese = yield call(checkById, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *replysave({ payload }, { call, put }) {//data
            const responese = yield call(replysave, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },
        *ChatdeleteById({ payload }, { call, put }) {//data
            const responese = yield call(ChatdeleteById, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
            })
            return responese.code == "0000"
        },

        *queryAppByEqId({ payload }, { call, put }) {//data
            const responese = yield call(queryAppByEqId, payload);
            yield put({
                type: 'updateState',
                payload: { queryAppByEqId: responese.data ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *modifyRepairUser({ payload }, { call, put }) {//data
            const responese = yield call(modifyRepairUser, payload);
            yield put({
                type: 'updateState',
                payload: { modifyRepairUser: responese.data ? responese.data : {} }//维修信息
            })
            return responese.code == "0000"
        },
        *broadsave({ payload }, { call, put }) {//data
            const responese = yield call(broadsave, payload);
            yield put({
                type: 'updateState',
                payload: { broadsave: responese.data ? responese.data : {} }//维修信息
            })
            return responese.code == "0000"
        },

        *uploadImg({ payload }, { call, put }) {//data
            const responese = yield call(uploadImg, payload);
            yield put({
                type: 'updateState',
                payload: { uploadImg: responese.data ? responese.data : {} }//维修信息
            })
            return responese.code == "0000"
        },


        *done({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { done: payload }
            })
            return true
        },
        *formdata({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { formdata: payload }
            })
            return true
        },
        *submitdata({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { submitdata: payload }
            })
            return true
        },
        *executeUserIdList({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { executeUserIdList: payload }
            })
            return true
        },
        *sendUserIdList({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { sendUserIdList: payload }
            })
            return true
        },

        *test({ payload }, { call, put }) {//data
            const responese = yield call(test, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese }
            })
            return responese.code == "0000"
        },
        *settoken({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { token: payload }
            })
            return true
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}