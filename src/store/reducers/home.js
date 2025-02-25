import {createReducer} from "@reduxjs/toolkit";
import {getPopularProducts} from "../actions/home";

const initialState = {
    status: "",
    products:[],
}
export const home = createReducer(initialState, (builder) => {
    builder
        .addCase(getPopularProducts.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getPopularProducts.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.products = payload
        })
        .addCase(getPopularProducts.rejected, (state) => {
            state.status = "error"
        })

});
