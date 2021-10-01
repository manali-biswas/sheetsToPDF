// headerdata reducer

import * as ActionTypes from './ActionTypes';

export const Headerdata = (state = {
    data:[],
    headerdata: [],
    err: null,
    loading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.LOADING_HEADERDATA:
            return { ...state, data: [], headerdata:[], err: null, loading: true };
        case ActionTypes.ADD_HEADERDATA:
            var arr = action.payload.slice(0);
            arr.splice(0, 1);
            return { ...state, data: arr, headerdata: action.payload[0], err: null, loading: false };
        case ActionTypes.ERR_HEADERDATA:
            return { ...state, data: [], headerdata: [], err: null, loading: false }
        default:
            return state;
    }
};