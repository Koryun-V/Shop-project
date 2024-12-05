import {createReducer} from "@reduxjs/toolkit";
import {registrationUser} from "../actions/registration";

const initialState = {
    status: "",
    token:"",
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
});
