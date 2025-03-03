import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {order} from "./order";

export const rootReducer = combineReducers({
    registration,
    login,
    order,
})
