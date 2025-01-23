import {combineReducers} from "redux";
import {login} from "./login";
import {registration} from "./registration";
import {category} from "./category";

export const rootReducer = combineReducers({
  registration,
  category,
  login,
})
