// sheets reducer

import * as ActionTypes from './ActionTypes';

export const Sheets = (state = {
    sheets: [],
    err: null,
    loading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.LOADING_SHEETS:
            return { ...state, sheets: [], err: null, loading: true };
        case ActionTypes.ADD_SHEETS:
            return { ...state, sheets: action.payload, err: null, loading: false };
        case ActionTypes.ERR_SHEETS:
            return { ...state, sheets: [], err: null, loading: false }
        default:
            return state;
    }
};