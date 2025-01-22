import {createReducer} from "@reduxjs/toolkit";
import {categoriesRequest} from "../actions/products";
import {
  setSelectId
} from "../actions/products";

const initialState = {
  status: "",
  categories: [],
  selectId: "",

}


export const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectId, (state, {payload}) => {
      state.selectId = payload.id
    })
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