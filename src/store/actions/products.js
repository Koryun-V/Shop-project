import {createAsyncThunk, createAction} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utills/Api";



export const setSelectId = createAction(
  "products/setSelectId",
  (payload) => ({
    payload,
  })
)






export const categoriesRequest =  createAsyncThunk(
  "products/categoriesRequest",

  async (payload, thunkAPI) => {
    try {
      const {data} = await api.getAllCategories(payload);
      return data;

    }catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }

)