import {createReducer} from "@reduxjs/toolkit";
import {loginUser, setIsOpenLogin, setStatus,} from "../actions/login";

const initialState = {
    status: "",
    token:"",
    isOpenLogin:false,
}
export const login = createReducer(initialState, (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.status = "pending"
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.token = payload
        })
        .addCase(loginUser.rejected, (state) => {
            state.status = "error"
        })
        //-----------------------------------------------------------------------------------

        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setIsOpenLogin, (state, {payload}) => {
            state.isOpenLogin = payload
        })



});
