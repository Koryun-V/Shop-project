import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const categoriesRequest = createAsyncThunk(
  "products/categoriesRequest",

  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getAllCategories(payload);
      return data;

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)


export const createCard = createAsyncThunk(
  "products/createCard",
  async (payload, thunkAPI) => {
    try {
     const {data} =  await api.createCard(payload);
      console.log(data,"aaaaaaaa")
     return data;

    } catch (err) {
      console.log(thunkAPI.rejectWithValue(err))
      return thunkAPI.rejectWithValue(err);
    }
  }
)