import {
    test, login, logout,
    infodevice, infodevicedetail, deviceuser, deviceuserlist, getshoplist,
    infospare, infosparedetail, department, shopgrouplist, departmentmore,
    userlist, userlistdetail, getuserspare
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
        res: {},
        formdata: [],
        getshoplist: [],
        getuserspare: [],
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