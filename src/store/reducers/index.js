import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {productReducer} from "./productsReducer";

export const rootReducer = combineReducers({
    registration,
    login,
    productReducer,
})
