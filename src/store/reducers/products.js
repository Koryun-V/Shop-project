import {createReducer} from "@reduxjs/toolkit";
import {categoriesRequest} from "../actions/products";


const initialState = {
  status: "",
  categories: [],
}


export const productsReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(categoriesRequest.pending, (state) => {
      state.status = "pending"
    })
    .addCase(categoriesRequest.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.categories = payload
    })
    .addCase(categoriesRequest.rejected, (state) => {
      state.status = "error"
    })
});
