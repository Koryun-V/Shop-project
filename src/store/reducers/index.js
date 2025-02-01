import {combineReducers} from "redux";

import {home} from "./home";
import {registration} from "./registration";
import {login} from "./login";
import {products} from "./products"
import {category} from "./category";

export const rootReducer = combineReducers({
    login,
    registration,
    home,
    category,
    products,
})
