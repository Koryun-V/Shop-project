import {createReducer} from "@reduxjs/toolkit";
import {getOneProduct} from "../actions/oneProduct";



const initialState = {
  status: "",
  oneProduct: {}
}


export const oneProduct = createReducer(initialState, (builder) => {
  builder
    .addCase(getOneProduct.pending, state => {
      state.status = "pending"
    })

    .addCase(getOneProduct.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.oneProduct = payload
    })

    .addCase(getOneProduct.rejected, state => {
      state.status = "error"
    })

})