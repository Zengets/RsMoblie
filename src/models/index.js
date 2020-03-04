import {
    test, login, logout,
    infodevice, infodevicecan, infodevicedetail, deviceuser, deviceuserlist, getshoplist,
    infospare, infosparedetail, department, shopgrouplist, departmentmore, repairstep, uploadImg,
    userlist, userlistdetail, getuserspare, getChildren, repairApply, repairList, repairStart,repairCheck,repairFinish
} from '../services/index'
export default {
    namespace: 'index',
    state: {
        count: 1,
        title: "default",
        userInfo: {},
        userAccount: {},
        userTime: 1,
        token: 1,
        infodevice: {},
        infodevicecan: {},
        infospare: {},
        infodevicedetail: {},
        userlistdetail: {},
        infosparedetail: {},
        userlist: [],
        deviceuser: [],
        deviceuserlist: {},
        department: [],
        shopgrouplist: [],
        departmentmore: [],
        repairstep: null,
        repairList: {},
        res: {},
        res2: {},
        formdata: [],
        submitdata: [],
        getshoplist: [],
        getChildren: [],
        getuserspare: [],
        uploadImg: [],
        done: "0",
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
        *infodevice({ payload }, { call, put }) {//data
            const responese = yield call(infodevice, payload);
            yield put({
                type: 'updateState',
                payload: { infodevice: responese.data.page ? responese.data.page : {} }
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
                payload: { infodevicecan: responese.data.page ? responese.data.page : {} }
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
                payload: { infospare: responese.data.page ? responese.data.page : {} }
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
                payload: { deviceuser: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },

        *infodevicedetail({ payload }, { call, put }) {//data
            const responese = yield call(infodevicedetail, payload);
            yield put({
                type: 'updateState',
                payload: { infodevicedetail: responese.data.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },

        *userlist({ payload }, { call, put }) {//data
            const responese = yield call(userlist, payload);
            yield put({
                type: 'updateState',
                payload: { userlist: responese.data.dataList ? responese.data.dataList : [] }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : [] }
            })
            return responese.code == "0000"
        },

        *deviceuserlist({ payload }, { call, put }) {//data
            console.log(payload)
            const responese = yield call(deviceuserlist, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { deviceuserlist: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },

        *userlistdetail({ payload }, { call, put }) {//data
            const responese = yield call(userlistdetail, payload);
            yield put({
                type: 'updateState',
                payload: { userlistdetail: responese.data.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *getuserspare({ payload }, { call, put }) {//data
            console.log(payload)
            const responese = yield call(getuserspare, payload);
            yield put({
                type: 'updateState',
                payload: { getuserspare: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *infosparedetail({ payload }, { call, put }) {//data
            const responese = yield call(infosparedetail, payload);
            yield put({
                type: 'updateState',
                payload: { infosparedetail: responese.data.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
        },
        *department({ payload }, { call, put }) {//data
            const responese = yield call(department, payload);
            yield put({
                type: 'updateState',
                payload: { department: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *shopgrouplist({ payload }, { call, put }) {//data
            const responese = yield call(shopgrouplist, payload);
            yield put({
                type: 'updateState',
                payload: { shopgrouplist: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },

        *departmentmore({ payload }, { call, put }) {//data
            const responese = yield call(departmentmore, payload);
            yield put({
                type: 'updateState',
                payload: { departmentmore: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *getshoplist({ payload }, { call, put }) {//data
            console.log(payload)

            const responese = yield call(getshoplist, payload);
            yield put({
                type: 'updateState',
                payload: { getshoplist: responese.data.dataList ? responese.data.dataList : [] }
            })
            return responese.code == "0000"
        },
        *getChildren({ payload }, { call, put }) {//data
            const responese = yield call(getChildren, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { getChildren: responese.data.dataList ? responese.data.dataList : [] }
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

            return responese.code == "0000"
        },
        *repairApply({ payload }, { call, put }) {//data
            const responese = yield call(repairApply, payload);
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
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
        *repairFinish({ payload }, { call, put }) {//data
            const responese = yield call(repairFinish, payload);
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

        *repairList({ payload }, { call, put }) {//data
            const responese = yield call(repairList, payload);
            yield put({
                type: 'updateState',
                payload: { repairList: responese.data.page ? responese.data.page : {} }
            })
            yield put({
                type: 'updateState',
                payload: { res: responese.data ? responese.data : {} }
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