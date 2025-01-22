import {createReducer} from "@reduxjs/toolkit";
import {getProducts} from "../actions/home";

const initialState = {
    status: "",
    products:[],
}
export const home = createReducer(initialState, (builder) => {
    builder
        .addCase(getProducts.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getProducts.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.products = payload.products

        })
        .addCase(getProducts.rejected, (state) => {
            state.status = "error"
        })

});
