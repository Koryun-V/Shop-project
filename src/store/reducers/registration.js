import {createReducer} from "@reduxjs/toolkit";
import {activateUser, registrationUser, resendActivateUser, setStatus, setStatusKey} from "../actions/registration";

const initialState = {
    status: "",
    token:"",
    statusKey:"",
    statusResendKey:"",
}

export const registration = createReducer(initialState, (builder) => {
    builder
        .addCase(registrationUser.pending, (state) => {
            state.status = "pending"
        })
        .addCase(registrationUser.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.token = payload.token
        })
        .addCase(registrationUser.rejected, (state) => {
            state.status = "error"
        })

        .addCase(activateUser.pending, (state) => {
            state.statusKey = "pending"
        })
        .addCase(activateUser.fulfilled, (state, {payload}) => {
            state.statusKey = "ok"
        })
        .addCase(activateUser.rejected, (state) => {
            state.statusKey = "error"
        })

        .addCase(resendActivateUser.pending, (state) => {
            state.statusResendKey = "pending"
        })
        .addCase(resendActivateUser.fulfilled, (state, {payload}) => {
            state.statusResendKey = "ok"
        })
        .addCase(resendActivateUser.rejected, (state) => {
            state.statusResendKey = "error"
        })



        .addCase(setStatus, (state,{payload}) => {
            state.status = payload
        })

        .addCase(setStatusKey, (state,{payload}) => {
            state.statusKey = payload
        })

});
