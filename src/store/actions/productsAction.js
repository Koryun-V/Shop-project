import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");


export const getProducts = createAsyncThunk(

    "products/getProducts",
    async (payload, thunkAPI) => {
        try {
            const {data} = await axios.get("https://world-of-construction.onrender.com/admin/products", {
                headers: {
                    Authorization: token,
                },
            })

            return data.products
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)