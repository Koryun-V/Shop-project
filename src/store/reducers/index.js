import {combineReducers} from "redux";

import {home} from "./home";
import {registration} from "./registration";
import {login} from "./login";
import {productsReducer} from "./products"
import {category} from "./category";


export const rootReducer = combineReducers({
    login,
    registration,
    home,
    productsReducer,
    category,
})
