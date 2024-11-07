import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";

export const rootReducer = combineReducers({
    registration,
    login,
})
