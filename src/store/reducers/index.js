import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {userSlice} from "./users";

export const rootReducer = combineReducers({
    registration,
    login,
    users: userSlice
})
