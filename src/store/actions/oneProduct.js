import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getOneProduct = createAsyncThunk(
  "oneProduct/getOneProduct",


  async (payload, thunkAPI) => {
    try {

      const {data} = await api.getOneProduct(payload);
      return data


    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const getPopularProduct = createAsyncThunk(
  "oneProduct/getPopularProduct",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getPopularProducts(payload);
      return data
    }
    catch(error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
