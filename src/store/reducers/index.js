import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {home} from "./home";

export const rootReducer = combineReducers({
    registration,
    login,
    home
})
