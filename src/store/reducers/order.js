import {createReducer} from "@reduxjs/toolkit";
import {getOrder} from "../actions/order";

const initialState = {
    status: "",
    order:[],

}
export const order = createReducer(initialState, (builder) => {
    builder
        .addCase(getOrder.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getOrder.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.order = payload
        })
        .addCase(getOrder.rejected, (state) => {
            state.status = "error"
        })


});
