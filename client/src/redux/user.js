// user reducer

import * as ActionTypes from './ActionTypes';

export const User = (state = {
    text: '',
    loggedIn: false,
    loading:true
}, action) => {
    switch (action.type) {
        case ActionTypes.LOADING_USER:
            return { ...state, text: '', loggedIn: false, loading: true };
        case ActionTypes.LOGIN_USER:
            return { ...state, text: action.payload, loggedIn: true, loading:false };
        case ActionTypes.NO_USER:
            return { ...state, text: '', loggedIn: false, loading:false }
        default:
            return state;
    }
};