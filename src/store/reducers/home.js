import {createReducer} from "@reduxjs/toolkit";
import {getPopularProducts, getSharesProducts} from "../actions/home";

const initialState = {
    status: "",
    statusShares:"",
    products:[],
    productsShares:[]
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

        .addCase(getSharesProducts.pending, (state) => {
            state.statusShares = "pending"
        })
        .addCase(getSharesProducts.fulfilled, (state, {payload}) => {
            state.statusShares = "ok"
            state.productsShares = payload
        })
        .addCase(getSharesProducts.rejected, (state) => {
            state.statusShares = "error"
        })



});
