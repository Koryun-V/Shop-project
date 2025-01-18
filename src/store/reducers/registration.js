import {createReducer} from "@reduxjs/toolkit";
import {activateUser, registrationUser, setStatusKey} from "../actions/registration";

const initialState = {
    status: "",
    token:"",
    statusKey:"",
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

        .addCase(setStatusKey, (state,{payload}) => {
            state.statusKey = payload
        })

});
