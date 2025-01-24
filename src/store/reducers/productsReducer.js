import {createReducer} from "@reduxjs/toolkit";
import {getProducts} from "../actions/productsAction";
import _ from "lodash";

const initialState = {
    products: [],
    status: ""
}


export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getProducts.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getProducts.fulfilled, (state, {payload}) => {
            state.status = "fulfilled"
            state.products = payload
        })
        .addCase(getProducts.rejected, (state) => {
            state.status = "error"
        })
})
