import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const fetchUser = () => (dispatch) => {
    dispatch(userLoading());

    return axios.get('/hello')
        .then(res => {
            if (res.data === null) {
                dispatch(noUser());
            }
            else {
                dispatch(loginUser(res.data));
            }
        });
};

export const noUser = () => ({
    type: ActionTypes.NO_USER
});

export const loginUser = (text) => ({
    type: ActionTypes.LOGIN_USER,
    payload: text
});

export const userLoading = () => ({
    type: ActionTypes.LOADING_USER
});

// todo: pass specific user id
export const fetchSheets = () => (dispatch) => {
    dispatch(sheetsLoading());

    return axios.get('/api/sheets')
        .then(res => {
            if (res.data === null) {
                dispatch(errSheets());
            }
            else {
                dispatch(addSheets(res.data));
            }
        });
};

export const errSheets = () => ({
    type: ActionTypes.ERR_SHEETS
});

export const addSheets = (sheets) => ({
    type: ActionTypes.ADD_SHEETS,
    payload: sheets
});

export const sheetsLoading = () => ({
    type: ActionTypes.LOADING_SHEETS
});

export const fetchMetadata = (id) => (dispatch) => {
    dispatch(metadataLoading());

    return axios.get('/api/sheetsMetaData/'+id)
        .then(res => {
            console.log(res.data);
            if (res.data === null) {
                dispatch(errMetadata());
            }
            else {
                dispatch(addMetadata(res.data));
            }
        });
};

export const errMetadata = () => ({
    type: ActionTypes.ERR_METADATA
});

export const addMetadata = (metadata) => ({
    type: ActionTypes.ADD_METADATA,
    payload: metadata
});

export const metadataLoading = () => ({
    type: ActionTypes.LOADING_METADATA
});

export const fetchHeaderdata = (id, sheetName, row, cols) => (dispatch) => {
    dispatch(headerdataLoading());

    return axios.get('/api/headerData/' + id+'/'+sheetName+'/'+row+'/'+cols)
        .then(res => {
            console.log(res.data);
            if (res.data === null) {
                dispatch(errHeaderdata());
            }
            else {
                dispatch(addHeaderdata(res.data));
            }
        });
};

export const errHeaderdata = () => ({
    type: ActionTypes.ERR_HEADERDATA
});

export const addHeaderdata = (data) => ({
    type: ActionTypes.ADD_HEADERDATA,
    payload: data
});

export const headerdataLoading = () => ({
    type: ActionTypes.LOADING_HEADERDATA
});