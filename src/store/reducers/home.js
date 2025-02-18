import {createReducer} from "@reduxjs/toolkit";
import {getProducts} from "../actions/home";
import {setSelectId, setProductId} from "../actions/home";
import products from "../../components/common/Products";

const initialState = {
  status: "",
  products: [],
  selectId: "",
  total: "",
  productId: ""

}
export const home = createReducer(initialState, (builder) => {
  builder
    .addCase(getProducts.pending, (state) => {
      state.status = "pending"
    })
    .addCase(getProducts.fulfilled, (state, {payload}) => {
      state.status = "ok"
      state.products = state.selectId ? payload.products.map(({product}) => product) : payload.products
      state.total = payload.total
      console.log(payload.total,"aaaa")


    })
    .addCase(getProducts.rejected, (state) => {
      state.status = "error"
    })

    .addCase(setSelectId, (state, {payload}) => {
      state.selectId = payload
    })
    .addCase(setProductId, (state, {payload}) => {
      state.productId = payload
    })

});
