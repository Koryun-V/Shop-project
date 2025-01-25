import {createReducer} from "@reduxjs/toolkit";
import {forgotPasswordUser, loginUser, setIsOpenLogin, setStatus,} from "../actions/login";

const initialState = {
    status: "",
    statusForgot:"",
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
        .addCase(forgotPasswordUser.pending, (state) => {
            state.statusForgot = "pending"
        })
        .addCase(forgotPasswordUser.fulfilled, (state, {payload}) => {
            state.statusForgot = "ok"
        })
        .addCase(forgotPasswordUser.rejected, (state) => {
            state.statusForgot = "error"
        })
        //-----------------------------------------------------------------------------------

        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setIsOpenLogin, (state, {payload}) => {
            state.isOpenLogin = payload
        })




});
