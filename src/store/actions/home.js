import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getPopularProducts = createAsyncThunk(
    "products/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getPopularProducts(payload)
            console.log(data)
            return data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })
