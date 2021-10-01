// metadata reducer

import * as ActionTypes from './ActionTypes';

export const Metadata = (state = {
    sheets: [],
    err: null,
    loading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.LOADING_METADATA:
            return { ...state, sheets: [], err: null, loading: true };
        case ActionTypes.ADD_METADATA:
            return { ...state, sheets: action.payload, err: null, loading: false };
        case ActionTypes.ERR_METADATA:
            return { ...state, sheets: [], err: null, loading: false }
        default:
            return state;
    }
};