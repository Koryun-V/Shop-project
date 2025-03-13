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


export const createReview = createAsyncThunk(
  "oneProduct/createReview",

  async (payload, thunkAPI) => {
    try {
      const {data} = await api.createReview(payload);
      console.log(data, "createReviewData")
      return data
    }catch(error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


export const getReview = createAsyncThunk(
  "oneProduct/getReview",
  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getReview(payload);
      console.log(data, "getReviewData")
      return data
    }catch(error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
