import {
    test, login, logout,
    infodevice, infodevicedetail, deviceuser, deviceuserlist,
    infospare, infosparedetail,

    userlist, userlistdetail
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
        userlist: {},
        deviceuser: {},
        deviceuserlist: {},
        res: {},
    },
    effects: {
        *login({ payload }, { call, put }) {//data
            const responese = yield call(login, payload);
            yield put({
                type: 'updateState',
                payload: { userInfo: responese.data.user ? responese.data.user : {} }
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
            return responese.code == "0000"
        },
        *infospare({ payload }, { call, put }) {//data
            const responese = yield call(infospare, payload);
            yield put({
                type: 'updateState',
                payload: { infospare: responese.data.page ? responese.data.page : {} }
            })
            return responese.code == "0000"
        },

        *deviceuser({ payload }, { call, put }) {//data
            const responese = yield call(deviceuser, payload);
            console.log(responese)
            yield put({
                type: 'updateState',
                payload: { deviceuser: responese.data.dataList ? responese.data.dataList : {} }
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
                payload: { userlist: responese.data.dataList ? responese.data.dataList : {} }
            })
            return responese.code == "0000"
        },

        *deviceuserlist({ payload }, { call, put }) {//data
            const responese = yield call(deviceuserlist, payload);
            yield put({
                type: 'updateState',
                payload: { deviceuserlist: responese.data.dataList ? responese.data.dataList : {} }
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

        *infosparedetail({ payload }, { call, put }) {//data
            const responese = yield call(infosparedetail, payload);
            yield put({
                type: 'updateState',
                payload: { infosparedetail: responese.data.data ? responese.data.data : {} }
            })
            return responese.code == "0000"
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