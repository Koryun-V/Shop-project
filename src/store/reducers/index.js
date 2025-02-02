import {combineReducers} from "redux";

import {home} from "./home";
import {registration} from "./registration";
import {login} from "./login";
import {products} from "./products"
import {category} from "./category";
import {oneProduct} from "./oneProduct";

export const rootReducer = combineReducers({
    login,
    registration,
    home,
    category,
    products,
    oneProduct,
})
