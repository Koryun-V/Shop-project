import {combineReducers} from "redux";

import {home} from "./home";
import {registration} from "./registration";
import {login} from "./login";

export const rootReducer = combineReducers({
    login,
    registration,
    home
})
