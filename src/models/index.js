import { test } from '../services/index'

export default {
    namespace: 'index',
    state: { 
        count: 1,
        title:"default",
        res:{},
        
    },
    effects: {
        *login({ payload }, { call, put }) {//data
            

            return true
        },
        *test({ payload }, { call, put }) {//data
            const responese = yield call( test, payload );
            yield put({
                type: 'updateState',
                payload: { res: responese }
            })
            console.log(JSON.stringify(responese))
            return responese.code == "0000"
        },
        *title({ payload }, { call, put }) {//data
            yield put({
                type: 'updateState',
                payload: { title: payload }
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