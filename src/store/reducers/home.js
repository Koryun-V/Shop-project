import {createReducer} from "@reduxjs/toolkit";
import {
  getAllProducts,
  getStores,
  setSearchValue,
  setStoreId,
  setProduct,
  getAllNames,
  setNameData
} from "../actions/home";
import {setSelectId, setProductId} from "../actions/home";

import {setMaxPrice, setMinPrice, setPage} from "../actions/products";
import {getPopularProducts, getSharesProducts} from "../actions/home";

const initialState = {
  status: "",
  product: {},
  productsList: [],
  selectId: "",
  total: "",
  productId: "",
  minPrice: 0,
  maxPrice: 2000,
  page: "1",
  searchValue: "",
  storesList: [],
  storeId: "",
  statusShares: "",
  products: [],
  popularProducts: [],
  productsShares: [],
  statusPopular: "",
  productsNames: [],
  nameData: {},
}
export const home = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProducts.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getAllProducts.fulfilled, (state, {payload}) => {
      state.status = "ok"
      // state.productsList = state.selectId ? payload.productsList.map(({product}) => product) : payload.productsList
      state.productsList = payload.productsList
      state.total = payload.total
    })

    .addCase(getAllProducts.rejected, (state) => {
      state.status = "error"
    })
    .addCase(getAllNames.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getAllNames.fulfilled, (state, {payload}) => {
      state.status = "ok"

      state.productsNames = payload.productsList
      state.total = payload.total
    })

    .addCase(getAllNames.rejected, (state) => {
      state.status = "error"
    })


    .addCase(getPopularProducts.pending, (state) => {
      state.statusPopular = "pending"
    })
    .addCase(getPopularProducts.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.popularProducts = payload
    })
    .addCase(getPopularProducts.rejected, (state) => {
      state.statusPopular = "error"
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


    .addCase(setProduct, (state, {payload}) => {
      state.product = payload
    })

    .addCase(setNameData, (state, {payload}) => {

      state.nameData = payload
    })

});
