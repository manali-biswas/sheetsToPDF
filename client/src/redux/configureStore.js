import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Headerdata } from "./header";
import { Metadata } from "./metadata";
import { Sheets } from "./sheets";
import { User } from "./user";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            sheets: Sheets,
            metadata: Metadata,
            headerdata: Headerdata
        }),
        applyMiddleware(thunk)
    );

    return store;
};