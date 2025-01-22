import {createReducer} from "@reduxjs/toolkit";
import {getProducts} from "../actions/home";
import {setSelectId} from "../actions/home";
import products from "../../components/common/Products";

const initialState = {
    status: "",
    products: [],
    selectId: "",

}
export const home = createReducer(initialState, (builder) => {
    builder
        .addCase(getProducts.pending, (state) => {
            state.status = "pending"
        })
        .addCase(getProducts.fulfilled, (state, {payload}) => {
            state.status = "ok"
            state.products = state.selectId ? payload.products.map(({product}) => product) : payload.products
            console.log(state.products)

        })
        .addCase(getProducts.rejected, (state) => {
            state.status = "error"
        })

        .addCase(setSelectId, (state, {payload}) => {
            state.selectId = payload
        })

});
