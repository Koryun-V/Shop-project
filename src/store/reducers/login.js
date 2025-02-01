import {createReducer} from "@reduxjs/toolkit";
import {forgotPasswordUser, getUser, loginUser, setIsOpenLogin, setStatus,} from "../actions/login";

const initialState = {
    status: "",
    statusUser:"",
    statusForgot:"",
    token:"",
    isOpenLogin:false,
    user:{}
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
        .addCase(getUser.pending, (state) => {
            state.statusUser = "pending"
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.statusUser = "ok"
            state.user = payload.user
        })
        .addCase(getUser.rejected, (state) => {
            state.statusUser = "error"
        })
        .addCase(setStatus, (state, {payload}) => {
            state.status = payload
        })
        .addCase(setIsOpenLogin, (state, {payload}) => {
            state.isOpenLogin = payload
        })




});
