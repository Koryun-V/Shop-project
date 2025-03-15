import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utills/Api";


export const getPopularProducts = createAsyncThunk(
    "products/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getPopularProducts(payload)
            console.log(data,"data")
            return data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const getSharesProducts = createAsyncThunk(
    "products/getSharesProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getSharesProducts(payload)
            console.log(data,"data")
            // return data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })


