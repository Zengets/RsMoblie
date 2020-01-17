

export default {
    namespace: 'index',
    state: { count: 1 },
    effects: {
        *test({ payload }, { call, put }) {//data
            //const responese = yield call(loanReturn, payload);
            yield put({
                type: 'updateState',
                payload: { count: 10 }
            })
            return true //responese.code == "0000"
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}