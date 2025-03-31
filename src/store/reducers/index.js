import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {order} from "./order";
import {cardSlice} from "./cardSlice";
import {products} from "./products"
import {category} from "./category";
import {oneProduct} from "./oneProduct";
import {home} from "./home";
import {userSlice} from "./users";
import notifications from "./notifications";



export const rootReducer = combineReducers({
    login,
    home,
    registration,
    category,
    products,
    oneProduct,
    order,
    card: cardSlice,
    users: userSlice,
    notifications
})
