import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getAllProducts(payload)
          console.log(data, "productsData")
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const setSelectId = createAction(
    "products/setSelectId",
    (payload) => ({
        payload,
    })
)


export const setProductId = createAction(
  "products/setProductId",
  (payload) => ({
    payload,
  })

)
