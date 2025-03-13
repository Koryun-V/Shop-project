import {createReducer} from "@reduxjs/toolkit";
import {getProducts, getStores, setSearchValue, setStoreId} from "../actions/home";
import {setSelectId, setProductId} from "../actions/home";

import {setMaxPrice, setMinPrice, setPage} from "../actions/products";

const initialState = {
  status: "",
  productsList: [],
  selectId: "",
  total: "",
  productId: "",
  minPrice: 0,
  maxPrice: 2000,
  page: "1",
  searchValue: "",
  storesList: [],
  storeId: ""
}
export const home = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getProducts.fulfilled, (state, {payload}) => {
      state.status = "ok"
      // state.productsList = state.selectId ? payload.productsList.map(({product}) => product) : payload.productsList
      state.productsList = payload.productsList
      state.total = payload.total
    })

    .addCase(getProducts.rejected, (state) => {
      state.status = "error"
    })

    .addCase(getStores.pending, (state) => {
      state.status = "ok"
    })

    .addCase(getStores.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.storesList = payload.stores
    })

    .addCase(getStores.rejected, (state) => {
      state.status = "error"
    })

    .addCase(setSelectId, (state, {payload}) => {
      state.selectId = payload
    })
    .addCase(setProductId, (state, {payload}) => {
      state.productId = payload
    })


    .addCase(setPage, (state, {payload}) => {
      state.page = payload
    })

    .addCase(setMinPrice, (state, {payload}) => {

      state.minPrice = payload
    })

    .addCase(setMaxPrice, (state, {payload}) => {
      state.maxPrice = payload
    })

    .addCase(setSearchValue, (state, {payload}) => {
      state.searchValue = payload
    })
    .addCase(setStoreId, (state, {payload}) => {
      state.storeId = payload
    })

});
