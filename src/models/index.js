import { login } from '../services/index'

export default {
    namespace: 'index',
    state: { 
        count: 1,
        res:{},
    
    },
    effects: {
        *login({ payload }, { call, put }) {//data
            const responese = yield call( login, payload );
            yield put({
                type: 'updateState',
                payload: { res: responese }
            })
            console.log(responese)
            return responese.code == "0000"
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}