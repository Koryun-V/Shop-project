import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {order} from "./order";
import {card} from "./card";
import {products} from "./products"
import {category} from "./category";
import {oneProduct} from "./oneProduct";
import {home} from "./home";
import {userSlice} from "./users";
import notifications from "./notifications";
import authRedirect from "../slices/authRedirect";
import {storePage} from "./storePage";



export const rootReducer = combineReducers({
    login,
    home,
    registration,
    category,
    products,
    oneProduct,
    order,
    card,
    users: userSlice,
    notifications,
    authRedirect,
    storePage,
})
