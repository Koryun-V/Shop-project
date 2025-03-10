import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {order} from "./order";
import {cardSlice} from "./cardSlice";

export const rootReducer = combineReducers({
    registration,
    login,
    order,
    card: cardSlice,
})
