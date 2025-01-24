import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utills/Api"
const token = localStorage.getItem("token");



export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await api.getAllProducts(payload)
            return data.products
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)