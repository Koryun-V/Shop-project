/*import {createReducer} from "@reduxjs/toolkit";
import {getCategory} from "../actions/category";

const initialState = {
  status: "",
  data: [],
}

export const category = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategory.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getCategory.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.data = payload.categories
    })
    .addCase(getCategory.rejected, (state) => {
      state.status = "error"
    })

});
*/

import {createReducer} from "@reduxjs/toolkit";
import {getCategory} from "../actions/category";

const initialState = {
  status: "",
  data: [],
}

export const category = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategory.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getCategory.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.data = payload.categories
    })
    .addCase(getCategory.rejected, (state) => {
      state.status = "error"
    })

});
