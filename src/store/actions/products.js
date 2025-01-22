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
